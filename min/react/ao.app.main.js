'use strict';

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import DataActions from './flux/actions/DataActions.jsx';
// Import custom components
import App from './components/App.jsx';

class AOApp {
	run() {
		DataActions.getPages((response)=>{
			render(
				<div>
					<Router>
						<App />
					</Router>
				</div>, document.getElementById('aoApp')
			);
		});
	}
}

new AOApp().run();