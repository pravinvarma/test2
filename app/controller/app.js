(function (angular) {
    'use strict';
    angular
        .module('flightSearchModule')
        .controller('flightSearchController', flightSearchController);
    
    flightSearchController.$inject = ['$http', 'constants', 'dataService', 'utilityServices', 'popupService', 'sourceDestCheckPopupConstant', '$scope'];

    function flightSearchController($http, constants, dataService, utilityServices, popupService, sourceDestCheckPopupConstant, $scope) {
        var vm = this;
        var airport = [];
        var returnDate;
        getAirportList();
        vm.returnDate = "";
        vm.flightData = false;
        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
       
        vm.openOneWayDatepicker = function () {
            vm.oneWayDatepicker.opened = true;
        };
        vm.openReturnWayDatepicker = function () {
            vm.returnWayDatepicker.opened = true;
        };
        vm.oneWayDatepicker = {
            opened: false
        };
        vm.returnWayDatepicker = {
            opened: false
        };
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.clear = function () {
            vm.dt = null;
        };
        vm.searchReturnFLights = function () {
            vm.isSearchDisplayed = false;
        }
    
        vm.swapSourceDest = function () {
            var swapVariable;
            swapVariable = angular.copy(vm.searchoneway);
            vm.searchoneway.origin = swapVariable.destination;
            vm.searchoneway.destination = swapVariable.origin;
        }

        vm.onSelected = function () {
            if (vm.searchoneway.origin && vm.searchoneway.destination) {
                if (vm.searchoneway.origin.iata === vm.searchoneway.destination.iata) {
                    vm.isSourceDestinationSame = true;
                    openPopup('Error', 'Source and destination cant be same');
                    return;
                } else {
                    vm.isSourceDestinationSame = false;
                }
            }
        }
        
        vm.flightOneWaySearch = function (data) {
            vm.breadcrumb = angular.copy(data);
            apiServiceCall(data);
        }

        
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        
        function apiServiceCall(data) {
            var flightResults;
            var parameters = {};
            var url = constants.flightFareURL;
            var flightData = data;
            
            if (data.origin.iata === data.destination.iata) {
                openPopup(sourceDestCheckPopupConstant.title, sourceDestCheckPopupConstant.message);
                return;
            }
            returnDate = data.return ? data.return.date : false;
            
            parameters = {
                source: data.origin.iata,
                destination: data.destination.iata,
                onewayDate: data.oneway.date,
                returnwayDate: returnDate
            }

            dataService.getFareList(parameters, url).then(function (response) {
                var minMaxObj;
                vm.isSearchDisplayed = true;
                var responseObject = response.data;
                vm.onwardFlightData = responseObject.body.onwardflights.flights;
                if (data.return) {
                    vm.onwardFlightData = responseObject.body.onwardflights.flights;
                    vm.returnFlightData = responseObject.body.returnflights.flights;
                }

                minMaxObj = utilityServices.calculateMinMaxPrice(vm.onwardFlightData);

                vm.minVal = minMaxObj.minVal;
                vm.maxVal = minMaxObj.maxVal;

            }, function (error) {
                vm.errorMsg = error.data.error.message;
            });
        }

        function getAirportList() {
            dataService.getAirports().then(function (airports) {
                for (var i in airports) {
                    airport.push(airports[i]);
                }
            });

            vm.airport = airport;
        }

        function openPopup(title, bodyMsg) {
            popupService.openPopup(title, bodyMsg);
        };



    }
})(angular);