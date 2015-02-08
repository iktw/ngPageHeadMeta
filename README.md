# ngPageHeadMeta
Angular Directive which puts the transcluded ```<meta>``` and ```<title>``` tags to document head.

Attributes

Install:
-
* bower install ng-page-head-meta
* add 'ngPageHeadMeta' to your angular module, e.g. ```angular.module('myApp', ['ngPageHeadMeta']);```


Usage example:
-
```
<page-meta-data status-code="200">
	<title>{{ meta_title }}</title>
	<meta name="description" content="{{ meta_description }}"/>
	<meta name="keywords" content="{{ meta_keywords }}"/>
</page-meta-data>
```
**status-code="200"** will add ```<meta name="prerender-status-code" content="200">``` which means that you must use prerender if you want that to actually do something for you. As a default statusCode is set to 200.

```<page-meta-data>``` takes all kinds of ```<meta>``` elements, it does not only have to be description or keywords. But keep in mind that all the transcluded data inside of the directive get removed from ```<head>``` if the next page has implemeted the directive. 
