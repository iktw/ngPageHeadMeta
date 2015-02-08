# ngPageHeadMeta
Angular Directive which puts the transcluded <meta> and <title> tags to document head.

Attributes

Usage example:
-
<page-meta-data status-code="200">
	<title>{{ 'meta_title_core' | translate }}</title>
	<meta name="description" content="{{ 'meta_description_core' | translate }}"/>
	<meta name="keywords" content="{{ 'meta_keywords_core' | translate }}"/>
</page-meta-data>

*status-code="200"* will add ```<meta name="prerender-status-code" content="200">``` which means that you must use prerender if you want that to actually do something for you. As a default statusCode is set to 200, so you do not need to add, example of usage is if your page servers 404.

<page-meta-data> takes all kinds of <meta> tags it does not have to be description or keywords but keep in mind that all the transcluded data inside of the directive get removed from <head> if the next page has implemeted the directive. 