<?php
/**
 * @package AroOnline
**/
?>
<!doctype html>
<html id="top" class="no-js" <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title><?php wp_title( '-', true, 'right' ); ?></title>
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<base href="<?php $url_info = parse_url( home_url() ); echo trailingslashit( $url_info['path'] ); ?>">
	<?php wp_head(); ?>
	<script>
		WebFontConfig = {
			google: {
				families: ['Open Sans:normal,bold', 'Indie Flower:normal,bold']
			},
			timeout: 2000 // set the timeout to two seconds
		};
	</script>
	<link href="<?=SHORTPATH;?>/assets/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
</head>
<body <?php body_class(); ?>>
<!--[if lt IE 9]>
	<a href="http://browsehappy.com/"><div id="ltie9">
	Woah buddy! Your browser is a bit out of date, there! It looks like you're using an old version of Internet Explorer. For the best experience on this site, please update your browser!
	</div></a>
<![endif]-->
<div id="modalObject" class="modalContainer modalLoader" aria-hidden="true">
	<div class="modalText">Loading AroOnline...</div>
</div>
<div id="aoApp">