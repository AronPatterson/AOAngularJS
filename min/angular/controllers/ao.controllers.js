// CONTROLLERS
(function(){
	'use strict';
	angular.module('ao.controllers', [
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ngAnimate',
		'ngTouch',
		'ao.routes',
		'ao.etc',
		'ao.services'
	])
	.controller('MainCtrl', ['$http', '$location', 'aoGenFunctions', 'aoInfo', MainCtrl])
	.controller('HomeCtrl', ['$location', 'aoPages', 'aoGenFunctions', HomeCtrl])
	.controller('AboutCtrl', ['$location', 'aoPages', 'aoGenFunctions', AboutCtrl])
	.controller('PortfolioCtrl', ['$http', '$location', 'aoModals', 'aoPages', 'aoGenFunctions', PortfolioCtrl])
	.controller('ContactCtrl', ['$location', 'aoPages', 'aoGenFunctions', ContactCtrl])
	.controller('ModalCtrl', ['aoModals', ModalCtrl])
	.controller('ConfirmModalCtrl', ['aoModals', ConfirmModalCtrl])
	.controller('PromptModalCtrl', ['aoModals', PromptModalCtrl]);
	function stringFunction(obj) { // global object for debuggin'
		return JSON.stringify(obj, null, 4);
	}
	// our Main Controller holds the General Settings of ALL controllers
	function MainCtrl($http, $location, aoGenFunctions, aoInfo) {
		$(function(){
			aoGenFunctions.backToTop();
		});
		var mvm = this; // main view model
		mvm.shortPath = aoWP.partials; // our functions.php creates these variables, and we translate it into a shortPath
		var aoURL = aoWP.site_url; // site base directory

		// gets the website, and it shows a loading modal before the site is loaded to reduce how much FOUC is seen
		$http({
			method: 'GET',
			url: aoURL
		})
		.then(successCallback, errorCallback);
		function successCallback(response){ // success? remove the modal
			$('.modalContainer').removeClass('modalLoader');
			console.log('page load works: ' + aoURL);
		}
		function errorCallback(error){
			$('.modalContainer').removeClass('modalLoader'); // error? remove the modal, but say why in the console
			console.log('error: ' + stringFunction(error));
		};
		return mvm;
	}
	function HomeCtrl($location, aoPages, aoGenFunctions) {
		$(function(){
			aoGenFunctions.scrollToTop();
			$('.homeNavLink').addClass('activeLink');
			$('.aboutNavLink, .portNavLink, .contactNavLink').removeClass('activeLink');
		});
		var vm = this; // view model
		vm.showLoader = true; // show the loader before the content loads
		aoPages.get( { ID: 13 }, function(res) { // grabs the page by ID using the aoPages in the ao.etc file
			vm.showLoader = false; // hide it once it loads
			vm.page = res; // pull in the JSON data
			console.log('JSON pull works: ' + stringFunction(vm.page));
		}, function(res) {
			$location.path('/404'); // if the Get fails, go to the 404
			console.log("error: " + stringFunction(res));
		});
		return vm;
	}
	function AboutCtrl($location, aoPages, aoGenFunctions) {
		$(function(){
			aoGenFunctions.scrollToTop();
			$('.aboutNavLink').addClass('activeLink');
			$('.homeNavLink, .portNavLink, .contactNavLink').removeClass('activeLink');
		});
		var vm = this; // view model
		vm.showLoader = true;
		aoPages.get( { ID: 15 }, function(res) {
			vm.showLoader = false;
			vm.page = res;
			console.log('a pull works: ' + stringFunction(vm.page));
		}, function(res) {
			$location.path('/404');
			console.log("error: " + stringFunction(res));
		});
		return vm;
	}
	function PortfolioCtrl($http, $location, aoModals, aoPages, aoGenFunctions) {
		$(function(){
			aoGenFunctions.scrollToTop();
			$('.portNavLink').addClass('activeLink');
			$('.homeNavLink, .aboutNavLink, .contactNavLink').removeClass('activeLink');
		});
		var portfolioVm = this; // view model
		portfolioVm.showLoader = true;
		aoPages.get( { ID: 17 }, function(res) {
			portfolioVm.showLoader = false;
			portfolioVm.page = res;
			portfolioVm.listing = portfolioVm.page.acf; // pull in the JSON from Advanced Custom Fields
			console.log(portfolioVm.showLoader);
			console.log('data pull works: ' + stringFunction(portfolioVm.listing));

			// MODAL

			// END MODAL

		}, function(res) {
			$location.path('/404');
			console.log("error: " + stringFunction(res));
		});

		// MODAL

		console.log('modal Service on1 ');
		// I open an Alert-type modal.
		portfolioVm.alertSomething = function() {
			// The .open() method returns a promise that will be either
			// resolved or rejected when the modal window is closed.
			var promise = aoModals.open(
				"alert",
				{
					message: "I think you are kind of beautiful!"
				}
			);
			promise.then(
				function handleResolve( response ) {
					console.log( "Alert resolved." );
				},
				function handleReject( error ) {
					console.warn( "Alert rejected!" );
				}
			);
		};
		// I open a Confirm-type modal.
		portfolioVm.confirmSomething = function() {
			// The .open() method returns a promise that will be either
			// resolved or rejected when the modal window is closed.
			var promise = aoModals.open(
				"confirm",
				{
					message: "Are you sure you want to taste that?!"
				}
			);
			promise.then(
				function handleResolve( response ) {
					console.log( "Confirm resolved." );
				},
				function handleReject( error ) {
					console.warn( "Confirm rejected!" );
				}
			);
		};
		// I open a Prompt-type modal.
		portfolioVm.promptSomething = function() {
			// The .open() method returns a promise that will be either
			// resolved or rejected when the modal window is closed.
			var promise = aoModals.open(
				"prompt",
				{
					message: "Who rocks the party the rocks the body?",
					placeholder: "MC Lyte."
				}
			);
			promise.then(
				function handleResolve( response ) {
					console.log( "Prompt resolved with [ %s ].", response );
				},
				function handleReject( error ) {
					console.warn( "Prompt rejected!" );
				}
			);
		};
		console.log('modal Service on1 ');

		// END MODAL
		return portfolioVm;
	}
	function ContactCtrl($location, aoPages, aoGenFunctions) {
		$(function(){
			aoGenFunctions.scrollToTop();
			$('.contactNavLink').addClass('activeLink');
			$('.homeNavLink, .aboutNavLink, .portNavLink').removeClass('activeLink');
		});
		var contactVm = this; // view model
		contactVm.showLoader = true;
		aoPages.get( { ID: 19 }, function(res) {
			contactVm.showLoader = false;
			contactVm.page = res;
			console.log('a pull works: ' + stringFunction(contactVm.page));
		}, function(res) {
			$location.path('/404');
			console.log('error: ' + stringFunction(res));
		});
		return contactVm;
	}
	function ModalCtrl(aoModals) {
		var modalVm = this; // view model
		// Setup default values using modal params.
		modalVm.message = ( aoModals.params().message || 'Whoa!' );
		// ---
		// PUBLIC METHODS.
		// ---
		// Wire the modal buttons into modal resolution actions.
		modalVm.close = aoModals.resolve;
		// I jump from the current alert-modal to the confirm-modal.
		modalVm.jumpToConfirm = function() {
			// We could have used the .open() method to jump from one modal
			// to the next; however, that would have implicitly 'rejected' the
			// current modal. By using .proceedTo(), we open the next window, but
			// defer the resolution of the current modal until the subsequent
			// modal is resolved or rejected.
			aoModals.proceedTo(
				'confirm',
				{
					message: 'I just came from Alert - doesn\'t that blow your mind?',
					confirmButton: 'Eh, maybe a little',
					denyButton: 'Oh please'
				}
			)
			.then(
				function handleResolve() {
					console.log( 'Piped confirm resolved.' );
				},
				function handleReject() {
					console.warn( 'Piped confirm rejected.' );
				}
			);
		};
	}
	function ConfirmModalCtrl(aoModals) {
		var modalVm = this; // view model
		var params = aoModals.params();
		// Setup defaults using the modal params.
		modalVm.message = ( params.message || 'Are you sure?' );
		modalVm.confirmButton = ( params.confirmButton || 'Yes!' );
		modalVm.denyButton = ( params.denyButton || 'Oh, hell no!' );
		// ---
		// PUBLIC METHODS.
		// ---
		// Wire the modal buttons into modal resolution actions.
		modalVm.confirm = aoModals.resolve;
		modalVm.deny = aoModals.reject;
	}
	function PromptModalCtrl(aoModals) {
		var modalVm = this; // view model
		// Setup defaults using the modal params.
		modalVm.message = ( aoModals.params().message || 'Give me.' );
		// Setup the form inputs (using modal params).
		modalVm.form = {
			input: ( aoModals.params().placeholder || '' )
		};
		modalVm.errorMessage = null;
		// ---
		// PUBLIC METHODS.
		// ---
		// Wire the modal buttons into modal resolution actions.
		modalVm.cancel = aoModals.reject;
		// I process the form submission.
		modalVm.submit = function() {
			// If no input was provided, show the user an error message.
			if ( ! modalVm.form.input ) {
				return( modalVm.errorMessage = 'Please provide something!' );
			}
			aoModals.resolve( modalVm.form.input );
		};
	}
})();