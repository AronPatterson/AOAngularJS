import React, { Component } from 'react';
import Assets from './Assets.jsx';

const dataUrlForPage = id => aoWP.api_url + `pages/${id}`; // grab our page ID using the set partial from our functions.php file

class WPData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			requestFailure: true // start it off as failed before it loads
		}
	}
	componentDidMount() {
		fetch(dataUrlForPage(this.props.id))
			.then(response => {
				if (!response.ok) {
					throw Error("Network request failed"); // since we're using fetch, throw the error ourselves if it gets no response.ok
				}
				return response; // return the response so it knows
			})
			.then(d => d.json()) // parse using JSON method on response
			.then(d => {
				this.setState({ // update state of component to have WP API's data
					wpPageData: d
				});
			}, () => { // arrow function sets state to show proper render error data
				this.setState({
					requestFailure: false
				});
			})
	}
	render() {
		if ( !this.state.wpPageData ) return <div className="text-center"><img src={ Assets.path  + "img/svg-loader.svg" } /></div>;
		if ( !this.state.requestFailure ) return <h1>Requested Page Not Found</h1>;
		return <div>{ this.state.wpPageData.id }</div>;
	}

}

export default WPData;