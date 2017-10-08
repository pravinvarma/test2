(function (angular) {
    'use strict';

    angular
        .module('flightSearchModule')
        .directive('flBreadcrumb', flBreadcrumb);

    function flBreadcrumb() {

        var directive = {
            templateUrl: 'breadcrumb/fl.breadcrumb.template.html', 
            scope: {
                breadcrumb: '=',
                onwardFlightData: '=',
                searchoneway: '='
            },
            controller: 'flBreadcrumbController',
            controllerAs: 'vm',
            bindToController: true

        }

        return directive;

    }


})(angular);