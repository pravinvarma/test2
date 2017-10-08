(function (angular) {
    'use strict';
    angular
        .module('flightSearchModule', ['ngSanitize', 'ui.bootstrap','ngMaterial', 'ngAnimate', 'templates'])
        .config(['$httpProvider', function ($httpProvider) {
            
        $httpProvider.interceptors.push('LoadingInterceptor');
}]);

})(angular);