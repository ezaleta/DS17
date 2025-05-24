const { writeFile, existsSync, mkdirSync } = require('fs');
// Configure Angular `environment.ts` file path
const _dir = './src/environments';
const path = `${_dir}/environment.prod.ts`;
// Load node modules
const CColors = require('colors');
require('dotenv').config();
// `environment.ts` file structure
const envConfigFileData = `export const environment = {
  url: 'https://dlt-qa-expdig-api01.azurewebsites.net',
  apiUrl: 'https://dltapi3.azurewebsites.net',
  quoteUrl: 'https://dlt-nsa-api01.azurewebsites.net',
  apiPagos: 'https://dlt-qa-motorpagos.azurewebsites.net/api/Pago?code=eSgwDJu5QmXF4ese0D00lZ01PCt0C1rj3aGwb2kVMGxHAzFuFc_log==',
  apiPagosOrig: 'https://dlt-qa-api-motorpagos.azurewebsites.net/api/v1/',
  apiCovidio: 'https://dlt-qa-covidiomanagerbe.azurewebsites.net/api/',
  apiCrabi: "https://journey.qa.crabi.net:443/v1/partners/",
  apiCotizador: "https://dlt-qa-api-des-cotizador.azurewebsites.net/",
  apiDes: "https://dlt-qa-des-cotiza.azurewebsites.net/api/",
  apiEmail: "https://prod-00.southcentralus.logic.azure.com:443/workflows/f03e7b6abe8f46afb8d2d4a64bc96914/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=w4Ceq09R7z6xlfoQVz1e3dP8wej2j6NqsA5XfRxmamE",
  apiZendesk: "https://daltonseguros.zendesk.com/api/v2",
  apiKeyCrabi: "OkGTJH.DBZUB8mcqJ72ReBaFDe4kPFPu",
  apiSeekOps: "https://www.sicopweb.com/urlservice/api/form-url",
  zendeskUser: "psoto@dalton.com.mx",
  zendeskPass: "409Pss82.",
  appName: '${process.env.APP_NAME}',
  awsPubKey: '${process.env.AWSKEY}',
  nodeEnv: '${process.env.NODE_ENV}',
  apiKeyDsn: "bf475288f495436088c35655f1d79449",
  apiDsn: "https://dlt-qa-apimanagement.azure-api.net",
  mSALClientId:"6646156d-f43e-45ce-ae45-de6b8edaa153",
  mSALRedirectUri:"https://dltweb03.azurewebsites.net/",
  mSALAuthority: "https://login.microsoftonline.com/organizations/",
  mSALPostLogoutRedirectUri: "https://dltweb03.azurewebsites.net/",
  apiMegafono: "https://dlt-apimegafono.azurewebsites.net/api/",
  apiMegafonoUserId: 13,
  keyCovidio: "DALTON-COVIDIO",
  production: true,
  apiSMS: "https://prod-06.southcentralus.logic.azure.com:443/workflows/825eb398f2fa43faa4f3c295c255a45d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LL9WfN32ntPVvjTYx4eEkM3SacjWAf-0T2GGArs8qVQ",
  apiHookVenta: "https://hooks.zapier.com/hooks/catch/14029050/2ga39jt/",
  apiHookCompra: "https://hooks.zapier.com/hooks/catch/14029050/2gaajk0/",
  apiHookHotSale: "https://hooks.zapier.com/hooks/catch/14029050/2n2rtgn/",
  apiHookReferido: "https://hooks.zapier.com/hooks/catch/14029050/2n2rtgn/",
  apiSpyne360: "https://api.spyne.ai/360/v1/response",
  apiKeySpyne: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRlcnByaXNlSWQiOiJiNDc0NWVjNzkiLCJ0ZWFtSWQiOiJmYmEyZTZhYjg4IiwidXNlcklkIjoiNmFlNmYyZDUiLCJzZWNyZXRLZXkiOiI2MzJlNzAyOGJmNDY0MWM4YmRlNWVhZGI1NzFjMjZmYSIsImlhdCI6MTczODI2MjAyNCwiZXhwIjoxODMyODcwMDI0fQ.pGOH2lCUV2QjqFTYuOJD8gFj76_PcnTOR2bdA73fTi4",
  currentUrl: "https://www.daltonseminuevos.com.mx"
};
`;
console.log(
  CColors.magenta(
    'The file `environment.prod.ts` will be written with the following content: \n'
  )
);
console.log(CColors.grey(envConfigFileData));

if (!existsSync(_dir)) {
  mkdirSync(_dir, 0o744);
}
writeFile(path, envConfigFileData, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      CColors.magenta(
        `Angular environment.prod.ts file generated correctly at ${path} \n`
      )
    );
  }
});
