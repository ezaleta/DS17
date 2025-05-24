/* Remove element by Id */
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};

/* Remove element by class */
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

/* Check for browser Internet explorer */
function dipPhoton360IncompitableBrowser() {
    return /msie\s|trident\//i.test(window.navigator.userAgent);
}

/* Displays error message for incompitable browser */
function dipPhoton360Error() {
    const dipPhoton360ErrorDiv = document.createElement('div');
    dipPhoton360ErrorDiv.style =
        'position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);text-align:center;color:lightsalmon;';
    dipPhoton360ErrorDiv.innerHTML =
        'This image viewer is not compatible with this brower.';
    return dipPhoton360ErrorDiv;
}

/* Global variables */
let dipPhoton360Dealer = 0;
let dipPhoton360Vin = '';
let dipPhoton360ViewerType = 'gallery';
let dipPhoton360Container = '';
let dipPhoton360Player = '';
// const dipPhoton360Url = "http://localhost:4000/";
// const dipPhoton360Url = "https://dev.autoport.dealerimagepro.com/";
const dipPhoton360Url = 'https://photon360.dealerimagepro.com/';

/* Styles */
const dipPhoton360GalleryZoomOpen =
    'position:fixed;top:0;left:0;margin:0px;padding:0px;width:100vw;height:100vh;z-index:9999;';
const dipPhoton360GalleryZoomClose =
    'position:relative;width:100%;height:inherit;';
const dipPhoton360SliderZoomOpen =
    'position:fixed;top:0;left:0;margin:0px;padding:0px;width:100vw;height:100vh;z-index:9999;';
const dipPhoton360SliderZoomClose =
    'position:relative;width:100%;height:inherit;';
const dipPhoton360SliderDesktopView = 'width:100%;height:calc(100vw/1.5/2.5);';
const dipPhoton360SliderMobileView = 'width:100%;height:calc(100vw/1.5)';

/* Add eventer method to listen message from iFrame */
var dipPhoton360EventMethod = window.addEventListener
    ? 'addEventListener'
    : 'attachEvent';
var dipPhoton360MessageEvent =
    dipPhoton360EventMethod == 'attachEvent' ? 'onmessage' : 'message';
var dipPhoton360MessageListener = window[dipPhoton360EventMethod];
dipPhoton360MessageListener(
    dipPhoton360MessageEvent,
    dipPhoton360MessageHandler,
    false
);

/* Set styles for display in full-screen */
function dipPhoton360MessageHandler(e) {
    switch (e.data) {
        case 'dipPhoton360GalleryZoomOpen':
            dipPhoton360Player.style = dipPhoton360GalleryZoomOpen;
            break;
        case 'dipPhoton360GalleryZoomClose':
            dipPhoton360Player.style = dipPhoton360GalleryZoomClose;
            break;
        case 'dipPhoton360SliderZoomOpen':
            dipPhoton360Player.style =
                dipPhoton360SliderZoomOpen +
                'max-height:' +
                window.top.innerHeight +
                'px;';
            break;
        case 'dipPhoton360SliderZoomClose':
            dipPhoton360Player.style = dipPhoton360SliderZoomClose;
            break;
        case 'resize':
            dipPhoton360Height();
            break;
        case 'share-facebook':
            dipPhoton360ShareVehicle('https://facebook.com/sharer.php?u=');
            break;
        case 'share-twitter':
            dipPhoton360ShareVehicle('https://twitter.com/intent/tweet?url=');
            break;
        case 'share-email':
            dipPhoton360ShareVehicle('share-email');
            break;
        case 'share-link':
            dipPhoton360ShareVehicle('share-link');
            break;
        case 'share':
            dipPhoton360ShareVehicle();
            break;
        default:
            break;
    }
}

function dipPhoton360ShareVehicle(shareUrl = '') {
    const title = window.top.document.title || '';
    if ('share' in navigator) {
        navigator
            .share({
                title,
                text: `Check out this vehicle! ${title}`,
                url: `${window.top.location.href}`
            })
            .then(res => {
                alert('Thanks for sharing!');
            })
            .catch(error => console.log(error));
    } else {
        switch (shareUrl) {
            case '':
                alert('Vehicle not found.');
                break;
            case 'share-email':
                const mailLink = document.createElement('a');
                const href = `mailto:?subject=${title}&body=Check out this vehicle! ${title}<br />window.top.location.href`;
                mailLink.setAttribute('href', href);
                document.body.appendChild(mailLink);
                mailLink.click();
                document.body.removeChild(mailLink);
                break;
            case 'share-link':
                const textInput = document.createElement('input');
                textInput.setAttribute('value', window.top.location.href);
                document.body.appendChild(textInput);
                textInput.select();
                document.execCommand('copy');
                document.body.removeChild(textInput);
                alert('Link copied to clipboard.');
                break;
            default:
                window.open(shareUrl + window.top.location.href);
                break;
        }
    }
}

function dipPhoton360Height() {
    if (dipPhoton360ViewerType === 'gallery') {
        const divWidth = dipPhoton360Container.offsetWidth;
        const divHeight =
            divWidth / 1.5 + divWidth / 1.5 / 6 + divWidth / 1.5 / 12 + 20;
        dipPhoton360Container.style.height = divHeight + 'px';
        dipPhoton360Player.style.height = divHeight + 'px';
    }
    if (dipPhoton360ViewerType === 'slider') {
        dipPhoton360Container.style =
            window.top.innerWidth > 1024
                ? dipPhoton360SliderDesktopView
                : dipPhoton360SliderMobileView;
        dipPhoton360Player.style =
            window.top.innerWidth > 1024
                ? dipPhoton360SliderDesktopView
                : dipPhoton360SliderMobileView;
    }
}

/* Get initial values from script */
function dipPhoton360Init() {
    const script = document.getElementById('dipPhoton360Script');
    dipPhoton360Dealer = parseInt(script.getAttribute('data-dealer'));
    dipPhoton360Vin = script.getAttribute('data-vin').trim().toUpperCase();
    const type = script.hasAttribute('data-type')
        ? script.getAttribute('data-type')
        : 'gallery';
    dipPhoton360ViewerType = type !== 'slider' ? 'gallery' : 'slider';
}

/* Check for total photos available */
function dipPhoton360PhotosCount(callback) {
    if (dipPhoton360Vin !== '') {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    callback(xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open(
            'GET',
            dipPhoton360Url +
            'has_photosV2?dealer=' +
            dipPhoton360Dealer +
            '&vin=' +
            dipPhoton360Vin,
            true
        );
        xmlhttp.send();
    }
}

function daltonphoto360() {
    dipPhoton360Init();
    dipPhoton360PhotosCount(count => {
        if (count > 0) {
            window.addEventListener('orientationchange', dipPhoton360Height);

            let parentElement = '';
            if (dipPhoton360ViewerType === 'gallery') {
                parentElement = document.querySelector('app-car-carrousell');
            }
            if (dipPhoton360ViewerType === 'slider') {
                parentElement = '';
            }

            if (parentElement) {
                parentElement.innerHTML = '';
                dipPhoton360Container = document.createElement('div');
                dipPhoton360Container.id = 'photonContainerDiv';
                dipPhoton360Container.style =
                    'position:relative;margin-top:10px;margin-right:2px;';
                parentElement.appendChild(dipPhoton360Container);

                dipPhoton360Player = document.createElement('iframe');
                dipPhoton360Player.id = 'dipPhoton360Player';
                dipPhoton360Player.setAttribute('allowfullscreen', 'true');
                dipPhoton360Player.src =
                    dipPhoton360Url +
                    dipPhoton360ViewerType +
                    'V2?dealer=' +
                    dipPhoton360Dealer +
                    '&vin=' +
                    dipPhoton360Vin;

                dipPhoton360Player.frameBorder = '0';
                dipPhoton360Player.scrolling = 'no';
                dipPhoton360Player.style = 'width:100%;';

                if (!dipPhoton360IncompitableBrowser()) {
                    dipPhoton360Container.appendChild(dipPhoton360Player);
                } else {
                    dipPhoton360Container.appendChild(dipPhoton360Error());
                }
                dipPhoton360Height();
            }
        }
    });
}