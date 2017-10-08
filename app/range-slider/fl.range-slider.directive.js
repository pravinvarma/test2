(function (angular) {
    'use strict';

    angular
        .module('flightSearchModule')
        .directive('rangeSlider', rangeSlider);

    function rangeSlider() {

        var directive = {
            templateUrl: 'range-slider/fl.range-slider.template.html', 
            scope: {
                min:'=',
                max:'=',
                value: '='
            },
            controller: 'flRangeSliderController',
            controllerAs: 'vm',
            bindToController: true

        }

        return directive;

    }


})(angular);