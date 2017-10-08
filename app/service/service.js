(function (angular) {
    angular
        .module('flightSearchModule')
        .factory('dataService', dataService);
    
    dataService.$inject = ['$http', 'constants'];
    
    function dataService($http, constants) {
    
        return {
            getAirports: getAirports,
            getFareList: getFareList
        };
        
        function getAirports(){
            return $http.get(constants.airportURL, constants.config)
            .then(getAirportsComplete)
        }
        
        function getFareList(parameters, url){
              return  $http.get(constants.flightListURL,{ params: parameters})
            .then(getFareListComplete)
        }
        
         function getFareListComplete(response){
            return response
        }
        
        function getAirportsComplete(response){
            return response.data
        }
    }

})(angular);