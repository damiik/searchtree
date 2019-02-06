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

export default userReducer;
