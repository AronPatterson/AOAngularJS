import React from 'react';
import Assets from '../Assets.jsx';

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

class Error404 extends React.Component {
	render(){
		let allData = DataStore.getAll();
		console.log(allData);
		let page = DataStore.getPageBySlug('page-not-found');
		return <h1>Page Not Found</h1>
		{{NoMatch}};
	}
}

export default Error404;