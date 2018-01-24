<?php
/**
 * @package AroOnline
 */

get_header();
?>
<div id="mainContent" role="main">
	<div id="contentBox" class="row">
		<?php the_post(); ?>
		<article id="post-<?php the_ID(); ?>" class="small-16 column">
			<h2><?php the_title(); ?></h2>
			<?php the_content(); ?>
			<p>It may seem simple, but really, the greatest setups should be! <a data-open="portfolio1">View this page's source code and take a gander! Heck, take two!</a></p>
				<?php
				$i = 0;
				if( have_rows('portfolio_setup') ):
					while( have_rows('portfolio_setup') ): the_row();
					$i++;
				?>
				<div class="row align-center">
					<div class="small-16 medium-14 large-11 callout secondary text-center">
						<h3 class="text-center"><?=get_sub_field('site_name'); ?></h3>
						<div class="row">
							<div class="small-16 medium-8 columns">
								<a data-open="bpModalDesktop_<?=get_sub_field('site_tag'); ?>">
									<img src="<?=SHORTPATH;?>/img/portfolio/desktop/site_<?=get_sub_field('site_tag'); ?>.png" alt="<?=get_sub_field('site_name'); ?> Desktop View" />
								</a><br />
								<a data-open="bpModalDesktop_<?=get_sub_field('site_tag'); ?>">
									<span><i class="fa fa-desktop" aria-hidden="true"></i> Desktop screenshot</span>
								</a>
								<?php if( get_sub_field('site_url') ): ?>
									<a href="<?=get_sub_field('site_url'); ?>" target="_blank">
										<span><i class="fa fa-external-link" aria-hidden="true"></i> View live site</span>
									</a>
								<?php endif; ?>
							</div>
							<div class="small-16 medium-8 columns">
								<a data-open="bpModalMobile_<?=get_sub_field('site_tag'); ?>"><img src="<?=SHORTPATH;?>/img/portfolio/mobile/site_<?=get_sub_field('site_tag'); ?>.png" alt="<?=get_sub_field('site_name'); ?> Mobile View" /></a><br />
								<a data-open="bpModalMobile_<?=get_sub_field('site_tag'); ?>">
									<span><i class="fa fa-mobile" aria-hidden="true"></i> Mobile screenshot</span>
								</a>
							</div>
						</div>
					</div>

					<!-- DESKTOP MODAL -->
					<div class="large reveal" id="bpModalDesktop_<?=get_sub_field('site_tag'); ?>" data-reveal>
						<section class="text-center">
							<h3 class="lightText">Desktop View</h3>
							<a class="button secondary" data-open="bpModalMobile_<?=get_sub_field('site_tag'); ?>">Switch to Mobile Site</a>
							<a class="button secondary" href="<?=SHORTPATH;?>/img/portfolio/mobile/full_size/site_<?=get_sub_field('site_tag'); ?>.jpg" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i> Full Screenshot</a><br />
							<img src="<?=SHORTPATH;?>/img/portfolio/desktop/full_size/site_<?=get_sub_field('site_tag'); ?>.jpg" alt="<?=get_sub_field('site_name'); ?> Desktop Full View" />
						</section>
						<button class="close-button" data-close aria-label="Close modal" type="button">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<!-- MOBILE MODAL -->
					<div class="tiny reveal" id="bpModalMobile_<?=get_sub_field('site_tag'); ?>" data-reveal>
						<section class="text-center">
							<h3 class="lightText">Mobile View</h3>
							<a class="button secondary" data-open="bpModalDesktop_<?=get_sub_field('site_tag'); ?>">Switch to Full Site</a>
							<a class="button secondary" href="<?=SHORTPATH;?>/img/portfolio/mobile/full_size/site_<?=get_sub_field('site_tag'); ?>.jpg" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i> Full Screenshot</a><br />
							<img src="<?=SHORTPATH;?>/img/portfolio/mobile/full_size/site_<?=get_sub_field('site_tag'); ?>.jpg" alt="<?=get_sub_field('site_name'); ?> Mobile Full View" />
						</section>
						<button class="close-button" data-close aria-label="Close modal" type="button">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
				</div>
				<?php endwhile; 
				endif; ?>


				<!-- HOW IT'S MADE MODAL 1 -->
				<div class="large reveal" id="portfolio1" data-reveal>
					<section class="text-center">
						<h3 class="lightText">Source Code</h3>
						<a class="button secondary" data-open="portfolio2">Switch to Step 2: ACF Setup</a>
						<a class="button secondary" href="<?=SHORTPATH;?>/img/portfolio/portfolio_how-its-made.png" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i> Full Screenshot</a><br />
						<div class="row align-center">
							<div class="small-16 medium-12 large-10 columns">
								<p class="lightText">My page-portfolio.php template! By using Advanced Custom Fields, I'm only making ONE single callout box per website, and ACF will loop through all of the data (that I'll be inputting in Step 3) to spit it onto the front end. But first, we need to create the custom fields...</p>
							</div>
						</div>
						<img src="<?=SHORTPATH;?>/img/portfolio/portfolio_how-its-made.png" alt="Source Code Screenshot" />
					</section>
					<button class="close-button" data-close aria-label="Close modal" type="button">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<!-- HOW IT'S MADE MODAL 1 -->
				<div class="large reveal" id="portfolio2" data-reveal>
					<section class="text-center">
						<h3 class="lightText">ACF Setup</h3>
						<a class="button secondary" data-open="portfolio3">Switch to Step 3: WP Backend</a>
						<a class="button secondary" href="<?=SHORTPATH;?>/img/portfolio/portfolio_how-its-made1.png" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i> Full Screenshot</a><br />
						<div class="row align-center">
							<div class="small-16 medium-12 large-10 columns">
								<p class="lightText">I've done some very crazy things with ACF in the past, but this is a very simple setup here - I only need three fields per data entry, and to narrow it down to the Portfolio template.</p>
							</div>
						</div>
						<img src="<?=SHORTPATH;?>/img/portfolio/portfolio_how-its-made1.png" alt="ACF Setup Screenshot" />
					</section>
					<button class="close-button" data-close aria-label="Close modal" type="button">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<!-- HOW IT'S MADE MODAL 1 -->
				<div class="large reveal" id="portfolio3" data-reveal>
					<section class="text-center">
						<h3 class="lightText">WP Backend</h3>
						<a class="button secondary" data-open="portfolio1">Go back to Step 1: Source Code</a>
						<a class="button secondary" href="<?=SHORTPATH;?>/img/portfolio/portfolio_how-its-made2.png" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i> Full Screenshot</a><br />
						<div class="row align-center">
							<div class="small-16 medium-12 large-10 columns">
								<p class="lightText">And once that's created, I throw my newely-created fields into WordPress, making future portfolio entries a cakewalk! Besides naming my image files properly (using Site Tag), all I need to do for additional entries is to key in three tiny data pieces.</p>
							</div>
						</div>
						<img src="<?=SHORTPATH;?>/img/portfolio/portfolio_how-its-made2.png" alt="WP Backend Screenshot" />
					</section>
					<button class="close-button" data-close aria-label="Close modal" type="button">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
		</article><!-- #post-<?php the_ID(); ?> -->
	</div>
</div>
<?php
//get_sidebar();
get_footer();
?>
