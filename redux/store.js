import  { applyMiddleware, compose, createStore, combineReducers} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


// define reducers
//-------------------------------------------------------------------------------------
function getId( todos ) {

	return todos.reduce((maxId, todo) => {
		return Math.max(todo.id, maxId)
	}, -1) + 1
}

// remove global reducer and replace it by partial reducers
// let reducer = function (state, action) 
// todos need default values
let todoReducer = function (todos = [], action) {

	switch(action.type) {
		
		case 'ADD_TODO':
			//return Object.assign({}, state, {todos: [{text: action.text, completed: false, id: getId( state )}, ...state.todos]})
			return [{

				text: action.text, 
				id: action.id === -1 ? getId( todos ) : action.id, 
				connected_notes: action.connected_notes,
				completed: action.completed, 
				description: action.description
			}, ...todos]

		case 'TOGGLE_TODO':
			// return Object.assign({}, state, { // make new object here
			// 	todos: state.todos.map((todo) => {return todo.id === action.id ? Object.assign({}, todo, {completed: !todo.completed}) : todo})
			// })
			return todos.map((todo) => {

				return todo.id === action.id ? 
					Object.assign({}, todo, {completed: action.on}) 
					: todo
			})		

		case 'UPDATE_DESCRIPTION':

			return todos.map((todo) => {

				return todo.id === action.id ? 
					Object.assign({}, todo, {description: action.desc}) 
					: todo
			})



		case 'DELETE_TODO':
			// return todos: state.todos.filter((todo) => {return todo.id !== action.id})
			// })
			return todos.filter((todo) => {return todo.id !== action.id})

		// default: return state;
		default: return todos;

	}
}


let mainItemReducer = function (mainItem = {}, action) {

	switch(action.type) {

		case 'CHANGE_MAIN_ITEM':
			return {
				text: action.item.text, 
				completed: action.item.completed, 
				id: action.item.id, 
				connected_notes: action.item.connected_notes,
				description: action.item.description,
				search_text: mainItem.text                       // put to search text old mainItem text
			};

		case 'UPDATE_MAIN_ITEM':
			return {

				text: action.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				connected_notes: mainItem.connected_notes,
				description: mainItem.description,
				search_text: mainItem.search_text
			};
		//return { ...mainItem, text: action.text };  // todo: not work - ES7 (experimental)

		case 'ADD_CONNECTED_ITEM':  // connected array veryfied already, add current item id to mainItem connected items array

			return {
			
				text: mainItem.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				description: mainItem.description, 
				connected_notes: [...mainItem.connected_notes, action.id],
				search_text: mainItem.search_text
			};

			//return {...mainItem, connected_notes: [...mainItem.connected_notes, action.id]};  // todo: not work - ES7 (experimental)


		case 'DEL_CONNECTED_ITEM': // connected array veryfied already, remove current item id from mainItem connected items array


			return {
			
				text: mainItem.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				description: mainItem.description, 
				connected_notes: mainItem.connected_notes.filter(( item_id ) => {return item_id !== action.id}),
				search_text: mainItem.search_text
			};

		case 'CHANGE_SEARCH_TEXT': // connected array veryfied already, remove current item id from mainItem connected items array

			return {
			
				text: mainItem.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				description: mainItem.description, 
				connected_notes: mainItem.connected_notes,
				search_text: action.search_text
			};


		case 'SHOW_DESCRIPTION': 

			return {
			
				text: mainItem.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				description: action.desc, 
				connected_notes: mainItem.connected_notes,
				search_text: mainItem.search_text
			};


		default:
			return mainItem;


	}
}

let userReducer = function (user = {}, action) {

	switch(action.type) {

		case 'CREATE_USER_ID':
			// return Object.assign({}, state, {
			// 	user: {
			// 		username: state.user.username,
			// 		id: action.id
			// 	}
			// })
			return {username: user.username, id: action.id }

		default:
			return user;

	}
}

// combine reducers to create mainReducer
//-------------------------------------------------------------------------------------
const mainReducer = combineReducers({todos: todoReducer, user: userReducer, mainItem: mainItemReducer})


// create store
//-------------------------------------------------------------------------------------
// *thunk* middleware watch every action if it's object or function, if it's a function
// then thunk pass dispatch to that function (then dispatch could be started on server response etc.)
let composedCreateStore = compose( applyMiddleware(thunk, logger()) );  // thunk for async dispatch
let  finalCreateStore = composedCreateStore( createStore )


// main function to create store used in client.js
// store is than propagated to components (App and childs) by Provider component
let configureStore = function (initialState = { todos: [], user: {}, mainItem: {}}) {

	return finalCreateStore(mainReducer, initialState)
}

export default configureStore