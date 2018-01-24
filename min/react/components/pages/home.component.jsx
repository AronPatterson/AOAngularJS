import React from 'react';
import Assets from '../Assets.jsx';
import DataStore from '../../flux/stores/DataStore.jsx';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingProcessed: false // start it off as failed before it loads
		}
	}
	componentDidMount() {
		Assets.backToTop();
		Assets.scrollToTop();
		this.setState({
			loadingProcessed: true
		});
	}
	render(){
		if (!this.state.loadingProcessed) return <div className="text-center">
			<img src={Assets.myPath + "img/svg-loader.svg"} />
		</div>;
		let page = DataStore.getPageBySlug('home');
		return <div>
				<div className="grid-x">
					<div className="small-16 medium-10 large-10 cell 
						small-order-2 medium-order-1 homeMain">
						<h2 className="small-text-center">Welcome, friend!</h2>
						<div dangerouslySetInnerHTML={{ __html: (page.content.rendered) }} />
					</div>
					<aside className="small-16 medium-6 large-6 cell 
						small-order-1 medium-order-2 text-center homeSide">
						<img src={aoWP.partials + "img/content_responsive.png"} />
						<h2>I'm <span>responsive</span>!</h2>
						<h3>I'm <span>organized</span>!</h3>
						<br />
						<h2><span>SEO</span> pro.</h2>
						<h3><span>CMS</span> expert.</h3>
						<h4 className="show-for-xxlarge">Great taste in t-shirts --{">"}</h4>
					</aside>
				</div>
				<div id="aronHomeBig" className="show-for-xxlarge noPrint">
					<img src={Assets.myPath + "img/home_aron-horrible-pose.png"} 
						alt="Web Developer Aron Patterson Posing Awkwardly" />
				</div>
		</div>;
	}
}

export default Home;

