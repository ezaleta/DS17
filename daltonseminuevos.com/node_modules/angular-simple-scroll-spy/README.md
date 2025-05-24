# Angular 2+ Simple Scroll Spy Directive

This is craeted by ng-packagr on Angular6.

## Installation

```
npm install angular-simple-scroll-spy --save
```

## Usage

### In Module:

#### App Module

```typescript
import {SimpleScrollSpyModule} from "angular-simple-scroll-spy";

@NgModule({
	imports: [SimpleScrollSpyModule]
})
```

or

#### Shared Module

```typescript
import {SimpleScrollSpyModule} from "angular-simple-scroll-spy";

@NgModule({
	imports: [SimpleScrollSpyModule],
	exports: [SimpleScrollSpyModule]

})
```

### In Component:

#### Menu Template

```html
<ul>
  <li scrollSpyMenu="menu1" [currentContent]="currentMenuId">Menu 1</li>
  <li scrollSpyMenu="menu2" [currentContent]="currentMenuId">Menu 2</li>
  <li scrollSpyMenu="menu3" [currentContent]="currentMenuId">Menu 3</li>
</ul>
```

#### Content Template

```html
<div scrollSpyContent="DIV" [(currentContent)]="currentMenuId">
  <div id="menu1">content1</div>
  <div id="menu2">content2</div>
  <div id="menu3">content3</div>
</div>
```

#### Component Class

```typescript
currentMenuId = "menu1";
```

### Properties:

|scrollSpyMenu||
-|-
|**scrollSpyMenu**|Target content element id.|
|**ssmActiveClassName**|Class attribute value when active. default:'active'|
|**ssmCurrentContent**|Send current selected element id.|
|**ssmScrollBehavior**|Element.scrollIntoView options. default:'smooth'|
|**ssmScrollBlock**|Element.ScrollIntoView options. default:'start'|
|**ssmScrollInline**|Element.ScrollIntoView options. default:'nearest'|

|scrollSpyContent||
-|-
|**scrollSpyContent**|Target element tag name.|
|**sscCurrentContent**|Send current selected element id.|
|**sscCurrentContentChange**|Output bind of 'sscCurrentContent'.|
|**sscDirection**|Scroll direction, 'row'|'column'. default:'row'|

### Demo

```
npm run start
```

or

[demo on sandbox](https://codesandbox.io/s/710p7wwkvq)

