// ROUTES
(function(){
	'use strict';
	// ROUTES
	angular.module('ao.routes', [
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ao.controllers',
		'ao.etc',
		'ao.services'
	])
	.config(aoConfig)
	.run(aoRun)
	.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
    aoConfig.$inject = ['$routeProvider', '$locationProvider', '$httpProvider']; // inject the providers so we can have a clean little .config
	function aoConfig($routeProvider, $locationProvider, $httpProvider) {
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$locationProvider.html5Mode(false).hashPrefix('!');
		$routeProvider.when('/', {
			templateUrl: aoWP.partials + 'templates/content/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'vm'
		})
		.when('/about', {
			templateUrl: aoWP.partials + 'templates/content/about.html',
			controller: 'AboutCtrl',
			controllerAs: 'vm'
		})
		.when('/developer-portfolio', {
			templateUrl: aoWP.partials + 'templates/content/portfolio.html',
			controller: 'PortfolioCtrl',
			controllerAs: 'portfolioVm',
			bindings: {
				portfolio: '<' // one-way binding
			}
		})
		.when('/contact', {
			templateUrl: aoWP.partials + 'templates/content/contact.html',
			controller: 'ContactCtrl',
			controllerAs: 'contactVm'
		})
		.otherwise({
			templateUrl: aoWP.partials + 'templates/content/404.html',
			controller: 'MainCtrl',
			controllerAs: 'mvm'
		});
	}
	function aoRun() {
		FastClick.attach(document.body);
	}
})();