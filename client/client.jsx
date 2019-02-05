import React from 'react'
import { render } from 'react-dom'
import configureStore from './redux/store'
import  { Provider } from 'react-redux'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import App from './components/App'
import About from './components/About'

import './style.scss'

// main store definition here
// --------------------------
let initialState = {

	// todos: [{
	// 	id: 0,
	// 	completed: false,
	// 	text: 'Initial todo for demo purposes'
	// }],
	// img_url: '',
	todos: [],
	mainItem: {

		id: 0,
		completed: false,
		text: 'root',
		description: ''
	},
	user: {

		username: 'dario',
		id: 13
	}
}



let store = configureStore( initialState );

render( 

	<Provider store = { store }>	
		<Router  basename="/">
			<div className="container">
				<Route path="/app/:noteid" component={App} />
				<Route exact path="/app" component={App} />
				<Route path="/about" component={About} />
			</div> 
		</Router>
	</Provider>
	,
    document.getElementById('app')
)
module.hot.accept();	

/* <Route path="/about" component={About} /> */