/**
 * Created by pooja on 29/2/16.
 */

'use strict';

angular.module('buzzAppApp')
  .factory('buzzService', function ($resource) {

    /**
     * Factory for all type of requests to Buzz
     */

    return $resource('/api/buzz/:buzzId', {},
      {
        getBuzz: {
          method: 'GET',
          isArray: true
        },
        update: {
          method: 'PUT'
        }
      });

  });



