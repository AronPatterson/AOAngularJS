// FACTORIES & DIRECTIVES
(function(){
	'use strict';
	angular.module( 'ao.etc', [
		'ngResource',
		'ngSanitize',
		'ao.controllers',
		'ao.etc',
		'ao.services'
	])
	.factory( 'aoInfo', aoInfo )
	.factory( 'aoPages', ['$resource', aoPages] )
	.directive( 'dirModals', ['$rootScope', 'aoModals', dirModals] );
	function aoInfo() { // container not used for anything yet, to be removed
		var aoGeneral = {};
		return aoGeneral;
	}
	function aoPages($resource) { // grabs the JSON page by ID
		return $resource(aoWP.api_url + 'pages/:ID', {
			ID: '@id'
		});
	}
	function dirModals($rootScope, aoModals) {
		// Return the directive configuration.
		return( link );
		// I bind the JavaScript events to the scope.
		function link( scope, element, attributes ) {
			// I define which modal window is being rendered. By convention,
			// the subview will be the same as the type emitted by the modals
			// service object.
			scope.subview = null;
			// If the user clicks directly on the backdrop (ie, the modals
			// container), consider that an escape out of the modal, and reject
			// it implicitly.
			element.on(
				"click",
				function handleClickEvent( event ) {
					if ( element[ 0 ] !== event.target ) {
						return;
					}
					scope.$apply( aoModals.reject );
				}
			);
			// Listen for "open" events emitted by the modals service object.
			$rootScope.$on(
				"aoModals.open",
				function handleModalOpenEvent( event, modalType ) {
					scope.subview = modalType;
				}
			);
			// Listen for "close" events emitted by the modals service object.
			$rootScope.$on(
				"aoModals.close",
				function handleModalCloseEvent( event ) {
					scope.subview = null;
				}
			);
		}
	}
})();

// SERVICES
(function(){
	'use strict';
	angular.module( 'ao.services', [
		'ngResource',
		'ngSanitize',
		'ao.controllers',
		'ao.etc',
		'ao.routes'
	])
	.service( 'aoGenFunctions', aoGenFunctions )
	.service( 'aoModals', ['$rootScope', '$q', aoModals] );
	function aoGenFunctions() {
		this.scrollToTop = function() {
			//start at top of page
			window.scrollTo(0, 0);
			return this;
		}
		this.backToTop = function() { // loads our Back to Top button
			$( function(a) {
				// this sets up our "Back to Top" button, which will follow you only once you reach a certain point (beyond the normal page's screen height)
				var t = 300, // px height on page where it starts to show up
					n = 1200, // px height where it'll fade out
					d = 600, // default movement point
					i = a( '.backToTopBtn' ); // attaches it to the correct class
				a( window ).scroll( function() { // if you scroll, it checks to see your document height
					a( this ).scrollTop() > t ? i.addClass( 'bttVisible' ) : i.removeClass( 'bttVisible bttFadeOut' ), a( this ).scrollTop() > n && i.addClass( 'bttFadeOut' )
				}), i.on( 'click', function( t ) { // when you click it, it animates the scroll up instead of the jarring instantaneous acnhor effect
					t.preventDefault(), a( 'body,html' ).animate({ scrollTop: 0 }, d)
				});
			});
			return this;
		}
	}
	function aoModals( $rootScope, $q ) {
		var modal = {
			deferred: null,
			params: null
		};
		// load api
		return({
			open: open,
			params: params,
			proceedTo: proceedTo,
			reject: reject,
			resolve: resolve
		});

		function open( type, params, pipeResponse ) {
			var previousDeferred = modal.deferred;
			// Setup the new modal instance properties.
			modal.deferred = $q.defer();
			modal.params = params;
			// We're going to pipe the new window response into the previous
			// window's deferred value.
			if ( previousDeferred && pipeResponse ) {
				modal.deferred.promise
					.then( previousDeferred.resolve, previousDeferred.reject );
			// We're not going to pipe, so immediately reject the current window.
			} else if ( previousDeferred ) {
				previousDeferred.reject();
			}
		}
		$rootScope.$emit( "aoModals.open", type );
		return( modal.deferred.promise );
	}

	// PUBLIC METHODS
	function params() {
		return( modal.params || {} );
	}
	function proceedTo( type, params ) {
		return( open( type, params, true ) );
	}
	function reject( reason ) {
		if ( ! modal.deferred ) {
			return;
		}
		modal.deferred.reject( reason );
		modal.deferred = modal.params = null;
		// Tell the modal directive to close the active modal window.
		$rootScope.$emit( "aoModals.close" );
	}
	// I resolve the current modal with the given response.
	function resolve( response ) {
		if ( ! modal.deferred ) {
			return;
		}
		modal.deferred.resolve( response );
		modal.deferred = modal.params = null;
		// Tell the modal directive to close the active modal window.
		$rootScope.$emit( "aoModals.close" );
	}
})();