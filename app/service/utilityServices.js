(function (angular) {
    angular
        .module('flightSearchModule')
        .factory('utilityServices', utilityServices);
   
    utilityServices.$inject = [];

    function utilityServices($http, constants) {
        return {
            calculateMinMaxPrice: calculateMinMaxPrice
        };

        function calculateMaxPrice(data) {
            var temp = [];
            for (i = 0; i < data.length; i++) {
                temp.push(data[i].price[0].price);
            }
            return temp
        }

        function calculateMinMaxPrice(data) {
            var maxVal, minVal;
            maxVal = Math.max.apply(null, calculateMaxPrice(data));
            minVal = Math.min.apply(null, calculateMaxPrice(data));
            return {
                maxVal: maxVal,
                minVal: minVal
            }
        }
    }
})(angular);