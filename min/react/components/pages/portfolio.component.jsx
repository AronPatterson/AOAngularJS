import React, {Component} from 'react';
import Assets from '../Assets.jsx';
import DataStore from '../../flux/stores/DataStore.jsx';
import PortfolioList from '../templates/PortfolioList.jsx';

class Portfolio extends Component {
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
		let page = DataStore.getPageBySlug('portfolio');
        return <div>
        	<h1>{page.title.rendered}</h1>
			<div className="grid-x">
				<section className="small-16 cell">
					<div dangerouslySetInnerHTML={{ __html: (page.content.rendered) }} />
				</section>
			</div>
			<div className="grid-x align-center portfolioSite">
				<PortfolioList />
			</div>
		</div>;
    }
}

export default Portfolio;