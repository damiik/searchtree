
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
			}, ...todos];


		case 'TOGGLE_TODO':

			return todos.map((todo) => {

				return todo.id === action.id ? {...todo, completed: action.on} : todo;
			});


		case 'UPDATE_DESCRIPTION':

			return todos.map((todo) => {

				return todo.id === action.id ? {...todo, description: action.desc} : todo;
			});


		case 'DELETE_TODO': return todos.filter((todo) => {return todo.id !== action.id});

		// default: return state;
		default: return todos;
	}
}


export default todoReducer;