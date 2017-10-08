(function (angular) {
    angular
        .module('flightSearchModule')
        .constant('constants', {
            flightListURL: 'http://localhost:3000/flightFareList',
            airportURL: 'http://localhost:3000/airports',
            config: {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }).
    constant('sourceDestCheckPopupConstant', {
        title: 'Error',
        message: 'Source and destination cant be same'
    })
})(angular);