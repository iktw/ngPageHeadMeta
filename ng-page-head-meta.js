angular.module('ngPageHeadMeta', [])
    .directive('pageMetaData', function () {
        var setPageHeadVariables = function () {
            this.documentHead = document.getElementsByTagName('head')[0];
            this.existingTitleElement = document.getElementsByTagName('title')[0];
            this.existingMetaElements = document.getElementsByTagName('meta');
        };

        var addDirectiveClassToElement = function (el) {
            el.className += ' ng-directive-pagehead';
        };

        var removeElementFromHeader = function (el) {
            documentHead.removeChild(el);
        };

        var removePreviousPageHeadData = function () {
            var previousDirectiveElements = document.getElementsByClassName('ng-directive-pagehead');
            angular.forEach(previousDirectiveElements, function (el, key) {
                removeElementFromHeader(el);
            });
        };

        var getExistingMetaElement = function (name) {
            for (var i = 0; i < existingMetaElements.length; i++) {
                var el = existingMetaElements[i];
                if (el.name) {
                    if (el.name.toLowerCase() === name.toLowerCase()) {
                        return el;
                    }
                }
            }
            ;
        };

        var handleStatusCode = function (statusCode) {
            statusCode = statusCode ? statusCode : 200;

            var existingMetaElement = getExistingMetaElement('prerender-status-code');
            if (existingMetaElement) {
                removeElementFromHeader(existingMetaElement);
            }

            var metaElement = document.createElement('meta');
            metaElement.name = 'prerender-status-code';
            metaElement.content = statusCode;
            addDirectiveClassToElement(metaElement);
            documentHead.appendChild(metaElement);
        };

        var handleTitleElement = function (el) {
            if (existingTitleElement) {
                removeElementFromHeader(existingTitleElement)
            }

            documentHead.appendChild(el);
        };

        var handleMetaElement = function (el) {
            var existingMetaElement = getExistingMetaElement(el.name);

            if (existingMetaElement) {
                removeElementFromHeader(existingMetaElement)
            }

            documentHead.appendChild(el);
        };

        var handleTranscludedHTML = function (transclude) {
            transclude(function (innerHTML) {
                angular.forEach(innerHTML, function (innerElement, key) {
                    if (innerElement.tagName) {
                        addDirectiveClassToElement(innerElement);

                        var tagName = innerElement.tagName.toLowerCase();

                        if (tagName === 'title') {
                            handleTitleElement(innerElement);
                        } else if (tagName === 'meta') {
                            handleMetaElement(innerElement);
                        }
                    }
                });
            });
        };

        var linker = function (scope, element, attrs, ctrl, transclude) {
            setPageHeadVariables();
            removePreviousPageHeadData();
            handleStatusCode(scope.statusCode);
            handleTranscludedHTML(transclude);
        };

        return {
            restrict: 'E',
            scope: {
                statusCode: '@'
            },
            transclude: true,
            link: linker
        }
    });
