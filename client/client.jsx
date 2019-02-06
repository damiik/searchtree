import React from 'react'
import { render } from 'react-dom'
import  { Provider } from 'react-redux'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import  { applyMiddleware, compose, createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import { browserHistory } from 'react-router';
// import { routerMiddleware } from 'react-router-redux';

import todoReducer from './redux/todoReducer'
import userReducer from './redux/userReducer'
import mainItemReducer from './redux/mainItemReducer'
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

// combine reducers to create mainReducer
const mainReducer = combineReducers({todos: todoReducer, user: userReducer, mainItem: mainItemReducer})
const middleware = applyMiddleware(thunk, createLogger({collapsed:true}))//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render( 

	<Provider store = { compose( middleware )( createStore )(mainReducer, initialState) }>
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
