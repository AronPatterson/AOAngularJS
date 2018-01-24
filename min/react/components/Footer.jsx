import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import Navigation from './templates/Navigation.jsx';


class Footer extends React.Component {   
	render() {
		return (
			<div>
				<footer id="siteFooter">
					<div role="navigation grid-container">
						<div className="footNav noPrint grid-x" role="navigation">
							<ul className="small-16 cell menu">
								<Navigation />
							</ul>
							<section id="socialMedia" className="small-16 cell text-center noPrint">
								<ul>
									<li className="liLogo"><a href="http://linkedin.com/in/aronpatterson" target="_blank"><span className="fa fa-linkedin fa-2x"></span></a></li>
									<li className="gitLogo"><a href="https://github.com/AronPatterson" target="_blank"><span className="fa fa-git-square fa-2x"></span></a></li>
									<li className="conLogo"><Router><div><Link to="/contact"><span className="fa fa-envelope fa-2x"></span></Link></div></Router></li>
								</ul>
							</section>
							<section className="small-16 cell text-center">
								<p>Copyright {"&copy;2018"} Aron Patterson<br />
								AroOnline Web Design {"&"} Development</p>
							</section>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;