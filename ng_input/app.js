angular.module('dragModule', [])
    .controller('dragController', function ($scope) {
        $scope.w = 0;
    })
    .directive('myDraggable', function ($document) {
        return {
            scope: false,
            restrict: 'EA',
            link: function (scope, element, attr) {
                var startX = 0,
                    startY = 0,
                    x = 0,
                    y = 0;
                element.on('mousedown', function (event) {
                    event.preventDefault();
                    startX = event.screenX - x;
                    startY = event.screenY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    element.css({
                        cursor: 'pointer'
                    });
                    y = -5;
                    x = event.screenX - startX <= 0 ? 0 : (event.screenX - startX >= 500 ? 500 : event.screenX - startX);
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                    scope.$apply(function () {
                        scope.w = x;
                    })

                }

                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }
            }
        }

    })