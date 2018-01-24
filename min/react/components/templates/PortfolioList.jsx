import React, {Component} from 'react';
import Assets from '../Assets.jsx';
import Modals from './Modals.jsx';
import DataStore from '../../flux/stores/DataStore.jsx';

class PortfolioList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingProcessed: false, // start it off as failed before it loads
			isModalOpen: false
		}
	}
	render(){
		let page = DataStore.getPageBySlug('portfolio');
		let acf = page.acf.portfolio_setup; // map out Advanced Custom Fields in WP
		return acf.map((site) => {
			let {site_name, site_tag, site_url, has_mobile} = site; // for cleanliness
			return <div key={site_tag} className={"small-16 medium-14 large-11 cell callout secondary text-center " + site_tag + "Site"}>
				<h3 className="text-center">{site_name}</h3>
				<div className="grid-x align-center">
					<div className="small-16 medium-8 cell">
						<a onClick={() => this.openModal(site_tag)} aria-haspopup="true">
							<img src={Assets.myPath + "img/portfolio/desktop/site_" + site_tag + ".png"}
								alt={site_name + " Desktop View"} />
							<span><i className="fa fa-desktop" aria-hidden="true"></i> View desktop</span>
						</a>
					</div>

					{ has_mobile ? // if it has mobile
						<div className="small-16 medium-8 cell">
							<a aria-haspopup="true"><img src={Assets.myPath + "img/portfolio/mobile/site_" + site_tag + ".png"} alt={site_name + " Mobile View"} /><br />
								<span><i className="fa fa-mobile" aria-hidden="true"></i> View mobile</span>
							</a>
						</div>
					: // or...
						<div></div>
					}
				</div>
				<Modals isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
					<h4>{site_name} Desktop View</h4>
					<p>hello</p>
					<p><button onClick={() => this.closeModal()}>Close</button></p>
				</Modals>
			</div>;
		});
	}
	openModal() {
		this.setState({isModalOpen: true})
	}
	closeModal() {
		this.setState({isModalOpen: false})
	}
}

export default PortfolioList;

/*<div className="revealOverlay" aria-hidden="" role="dialog">
	<section class="text-center">
		<h3 class="lightText">Desktop View</h3>
		<a class="button secondary" aria-haspopup="true"
			tabindex="0">Switch to Mobile Site</a>
		<a class="button secondary" href={Assets.path + 
			"/img/portfolio/mobile/full_size/site_" +
			portfolio.site_tag + ".jpg"}
			target="_blank"><i class="fa fa-external-link" 
			aria-hidden="true"></i> Full Screenshot</a><br />
		<img src={Assets.path + 
			"/img/portfolio/desktop/full_size/site_" + 
			portfolio.site_tag + ".jpg"}
			alt={portfolio.site_name + " Desktop Full View"}>
	</section>
</div>*/