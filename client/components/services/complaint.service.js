/**
 * Created by pooja on 10/3/16.
 */

'use strict';

angular.module('buzzAppApp')

  .factory('complaintService', function ($resource) {

    /**
     * Factory for all type of requests to Complaint
     */

    return $resource('/api/complaint/:complaintId',
      {},

      {
        /**
         * Save Complaint (Image included)
         */

        saveComplaintData: {
          method: 'POST',
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        },

        /**
         * Get request
         */

        getComplaintData: {
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



