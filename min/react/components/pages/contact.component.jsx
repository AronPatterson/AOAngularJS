import React from 'react';
import Assets from '../Assets.jsx';
import DataStore from '../../flux/stores/DataStore.jsx';

class Contact extends React.Component {
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
		let allData = DataStore.getAll(); // grab data from store
		console.log(allData);
		let page = DataStore.getPageBySlug('contact');
		return <div>
			<h1>{page.title.rendered}</h1>
			<div dangerouslySetInnerHTML={{ __html: (page.content.rendered) }} />
		</div>;
    }
}

export default Contact;