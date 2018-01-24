import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import DataStore from '../../flux/stores/DataStore.jsx';

class Navigation extends Component {
	render(){
		let allPages = DataStore.getAllPages();
		//allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]); // Sort pages by order
		let pageOrder = ["home", "portfolio", "about", "contact"]; // determine the order of pages
		allPages.sort((a,b) =>  pageOrder.indexOf(a.slug) > pageOrder.indexOf(b.slug));
		return allPages.map((page) => {
				if(page.slug != 'page-not-found'){
					return <li key={"list" + page.id}>
						<Link key={page.id} to={`/${page.slug}`}>
							{page.title.rendered}
						</Link>
					</li>;
				}
			});
	}
}

export default Navigation;