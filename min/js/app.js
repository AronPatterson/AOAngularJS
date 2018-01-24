import $ from 'jquery';
import whatInput from 'what-input';

// Developer Tools/Scripts
// Note: make sure to place the Dev Tools script after jQuery, but before Foundation
// This is so the code modifications load before Foundation converts them

function navScripts() {
	// Normal Navigation Integration
	$( '#mainNav > li:has(ul)' ).addClass( 'has-submenu' ); // if the main nav 1st level items has li with children, add "has-submenu"
	$( '#mainNav li:has(ul)' ).addClass( 'submenu menu' ).attr( 'data-submenu' ); // add a "dropdown" class to the child ul
	$( '#mainNav li' ).each(function() { // add an active class if on the current page
	  var href = $( this ).find( 'a' ).attr( 'href' );
	  if ( href === window.location.pathname ) {
		$( this ).find( 'a' ).addClass( 'active' );
		$( this ).parents( '.menu-item-has-children' ).children( 'a' ).addClass( 'active' );
	  }
	});
}

function footerScripts() {
	// Footer Navigation Integration
	//$( '.footNav ul li a' ).addClass( 'align-center' ); // makes sure these are center

	// this fixes the Angular "always open mobile" issue so that when you click a link, it closes the Foundation mobile nav
	$( '#mainNav li a' ).click( function() {
		$( '#mainNav' ).css( 'display','none' );
	});
	console.log('Foundation Core Version: ' + Foundation.version);
}

navScripts();
footerScripts();

// Import Foundation options
window.$ = $;

//import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';
$( document ).foundation();