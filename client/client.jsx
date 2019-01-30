import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import configureStore from './redux/store'
import  { Provider } from 'react-redux'

import './style.scss'

// main store definition here
// --------------------------
let initialState = {

	// todos: [{
	// 	id: 0,
	// 	completed: false,
	// 	text: 'Initial todo for demo purposes'
	// }],
	img_url: '',
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
   	 <App/>
   </Provider>,
   document.getElementById('app')
)
module.hot.accept();