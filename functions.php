<?php
/**
*** @package AroOnline
**/

// define SHORTPATH as an directory URL shortcut for use in our templates
define( 'SHORTPATH', get_template_directory_uri());

function register_ao_menus() {
	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => 'Top Navigation',
		'footer' => 'Footer Navigation'
	) );
}

// sets up our scripts/Angular theme, all within a single class
class ao_ng_theme {
	function enqueue_scripts() {
		// STYLESHEETS
		wp_enqueue_style( 'main-styles', SHORTPATH . '/assets/css/app.css', false, false );
		wp_enqueue_style( 'font-awesome', '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css', false, null, false );

		// JQUERY
		wp_deregister_script( 'jquery' ); // removes all jQuery versions added by plugins, to prevent doubling
		wp_register_script('jquery', '//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js', false, null, true ); // re-registers jQuery, using https:// as necessary, and loads it: no dependencies, null version, and in footer
		wp_enqueue_script( 'jquery' ); // reinitiates script

		wp_enqueue_script( 'modernizr', '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js', false, null, true ); // re-registers jQuery, using https:// as necessary, and loads it: no dependencies, null version, and in footer

		wp_enqueue_script( 'fastclick', '//cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.min.js', false, null, true );

		wp_enqueue_script( 'font-loader', '//cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js', false, null, true ); // Google Web Font Loader

		wp_enqueue_script( 'app', SHORTPATH . '/assets/js/app.min.js', array('jquery'), false, true ); // queues our godfather script, which requires jQuery to be loaded first

		// ANGULAR
		wp_enqueue_script( 'angular-core', '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.7/angular.min.js', null, false );
		wp_enqueue_script( 'angular-theme', SHORTPATH . '/assets/angular/ao.app.min.js', array('angular-core', 'modernizr', 'fastclick'), null, true );


		// the following pulls WordPress REST API data into the Angular file
		wp_localize_script(
			'ao_ng_theme',
			'aoWP',
			array(
				'site_url' => get_site_url(),
				'api_url' => rest_get_url_prefix() . '/wp/v2/',
				'template_directory' => get_template_directory_uri() . '/',
				'partials' => trailingslashit( get_template_directory_uri() ) . 'assets/',
				'nonce' => wp_create_nonce( 'wp_rest' )
			)
		);
	}
}


/**
 * Create a nicely formatted and more specific title element text for output
 * in head of document, based on current view.
 *
 * @param string $title Default title text for current view.
 * @param string $sep Optional separator.
 * @return string The filtered title.
 */
function ao_wp_title( $title, $sep ) {
	global $paged, $page;

	if ( is_feed() ) {
		return $title;
	}

	// Add the site name.
	$title .= get_bloginfo( 'name', 'display' );

	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title = "$title $sep $site_description";
	}

	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 ) {
		$title = "$title $sep " . sprintf( __( 'Page %s', 'AroOnline' ), max( $paged, $page ) );
	}

	return $title;
}

$aoTheme = new ao_ng_theme();
add_action( 'wp_enqueue_scripts', array( $aoTheme, 'enqueue_scripts' ) );
add_action( 'init', 'register_ao_menus' );
add_filter( 'wp_title', 'ao_wp_title', 10, 2 );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); // deactivates pointless emoji script
remove_action( 'wp_print_styles', 'print_emoji_styles' ); // deactivates pointless emoji styles


function my_add_link_target( $html ) {
	$html = preg_replace( '/(<a.*")>/', '$1 target="_self">', $html );
	return $html;
}
add_filter( 'image_send_to_editor', 'my_add_link_target', 10 );

// add_filter('show_admin_bar', '__return_false');

add_action( 'after_setup_theme', 'ao_nav_setup' );

if ( ! function_exists( 'ao_nav_setup' ) ){
	function ao_nav_setup() {  
		register_nav_menu( 'primary', __( 'Main Menu', 'text-domain' ) );
		add_theme_support( 'post-thumbnails' );

	}
}

?>