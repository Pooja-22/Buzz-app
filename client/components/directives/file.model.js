/**
 * Created by pooja on 8/3/16.
 */

'use strict';

angular.module('buzzAppApp')

/**
 * file-model directive
 */

  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
            scope.getFile();
          });
        });
      }
    };
  }]);
