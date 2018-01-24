import React from 'react';
import Navigation from './templates/Navigation.jsx';

function stringFunction(obj) { // global object for debuggin'
	return JSON.stringify(obj, null, 4);
}
class Header extends React.Component {

	render() {
		return (
			<div>
				<header id="navContainer" className="grid-container">
					<div className="grid-x">
						<section className="small-8 small-offset-4 large-4 large-offset-0 cell text-center logoArea">
							<a href="/" rel="home"><h1><img src={aoWP.partials + "/img/bnr_aron-mn.svg"} alt="AroOnline - Aron Patterson's Web Developer Portfolio, Minnesota" /></h1></a>
						</section>
						<a className="sr-only" href="#mainContent" tabIndex="-1">Skip to main content</a>
						<nav className="small-16 large-12 cell align-self-bottom">
							<div className="title-bar" data-responsive-toggle="mainNav" data-hide-for="large">
								<div className="titleBarToggle" data-toggle="">
									<button className="menu-icon" type="button"></button>
									<div className="title-bar-title">Navigation</div>
								</div>
							</div>
							<ul id="mainNav" className="menu large-horizontal medium-vertical small-text-center align-right" data-responsive-menu="accordion large-dropdown medium-accordion">
								<Navigation />
							</ul>
						</nav>
					</div>
				</header>
			</div>
		);
	}
}

export default Header;