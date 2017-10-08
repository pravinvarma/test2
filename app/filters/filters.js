(function (angular) {
    'use strict';

    angular
        .module('flightSearchModule')
        .filter('myFilter', function () {
            return function (input, attr) {
                var out = [];
                angular.forEach(input, function (data) {
                    if (data.price[0].price <= parseInt(attr)) {
                        out.push(data);
                    }
                });
                return out;
            }
        });

})(angular);