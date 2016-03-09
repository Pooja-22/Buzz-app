/**
 * Created by pooja on 29/2/16.
 */

'use strict';

angular.module('buzzAppApp')

  .factory('buzzService', function ($resource) {

    /**
     * Factory for all type of requests to Buzz
     */

    return $resource('/api/buzz/:buzzId/:commentId',
      {},

      {
        /**
         * Save Buzz (Image included)
         */

        saveBuzzData: {
          method: 'POST',
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        },

        /**
         * Get request
         */

        getBuzzData: {
          method: 'GET',
          isArray: true
        },

        /**
         * Update request
         */

        update: {
          method: 'PUT'
        }
      });

  });



