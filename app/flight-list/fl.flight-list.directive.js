(function (angular) {
    'use strict';

    angular
        .module('flightSearchModule')
        .directive('flFlightList', flFlightList);

    function flFlightList() {

        var directive = {
            templateUrl: 'flight-list/fl.flight-list.template.html', 
            scope: {
                onwardFlightData: '=',
                returnFlightData: '=',
                searchoneway: '=',
                breadcrumb: '=',
                value: '='
            },
            controller: 'flFlightListController',
            controllerAs: 'vm',
            bindToController: true

        }

        return directive;

    }


})(angular);