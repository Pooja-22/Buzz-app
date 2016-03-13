/**
 * Created by pooja on 13/3/16.
 */

'use strict';

angular.module('buzzAppApp')

/**
 * filter complaints
 */

  .filter('filterComplaints', function () {
    return function (complaints, status, department) {
      console.log(complaints,'opopoppoppop')
      var filtered = [];
      if (status === 'All') {
        if (department === 'All') {
          complaints.forEach(function (obj) {
            filtered.push(obj);
          })
        }
        else {
          complaints.forEach(function (obj) {
            if (obj.department === department)
              filtered.push(obj);
          })
        }
      }
      else {
        complaints.forEach(function (obj) {
          if (obj.status === status&& obj.department === department) {
              filtered.push(obj);
            }
            else if (department === 'All') {
              if (obj.status === status) {
                filtered.push(obj);
              }
            }
        });
      }
      return filtered;
    };
  })
;

