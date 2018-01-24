import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import DataStore from '../flux/stores/DataStore.jsx'
import Navigation from './templates/Navigation.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './pages/home.component.jsx';
import About from './pages/about.component.jsx';
import Portfolio from './pages/portfolio.component.jsx';
import Contact from './pages/contact.component.jsx';
import Error404 from './pages/404.component.jsx';

class App extends React.Component {
	componentDidMount() {
		var loadingPageClass = document.getElementById("modalObject").classList; // provide the default intro loading screen

		setTimeout(() => {
			if (loadingPageClass.contains("modalLoader")) {
				loadingPageClass.remove("modalLoader");
			}
		}, 1500); // simulates an async action, removes class that shows the modalObject
	}
	render() {
		return <div>
			<Header />
				<main id="mainContent" role="main">
					<div id="contentBox" className="grid-container">
						<Switch>
							<Route path="/" component={Home} exact />
							<Route path="/about" component={About} exact />
							<Route path="/portfolio" component={Portfolio} exact />
							<Route path="/contact" component={Contact} exact />
							<Route render={() => { return <Redirect to="/" component={Home} /> }} />
						</Switch>
					</div>
				</main>
			<Footer />
		</div>;
	}
}

export default App;