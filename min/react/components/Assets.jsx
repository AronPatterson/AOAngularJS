class Assets {
	constructor() {
		this.myPath = aoWP.partials;
		this.scrollToTop = () => window.scrollTo(0, 0);
		this.backToTop = () => // loads our Back to Top button
			$( function(a) {
				// follow you once you reach a certain point
				var t = 300, // px height on page where it starts to show up
					n = 1200, // px height where it'll fade out
					d = 600, // default movement point
					i = a( '.backToTopBtn' ); // attaches it to the correct class
				a( window ).scroll( () =>  a( this ).scrollTop() > t ?
					i.addClass( 'bttVisible' ) : 
					i.removeClass( 'bttVisible bttFadeOut' ), a( this ).scrollTop() > n
					&& i.addClass( 'bttFadeOut' )
				), i.on( 'click', function( t ) {
					t.preventDefault(), a( 'body,html' ).animate({ scrollTop: 0 }, d)
				});
			});
	}
}

export default (new Assets);