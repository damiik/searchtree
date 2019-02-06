
let mainItemReducer = function (mainItem = {}, action) {

	switch(action.type) {

		case 'CHANGE_MAIN_ITEM':
			return {
				text: action.item.text, 
				completed: action.item.completed, 
				id: action.item.id, 
				connected_notes: action.item.connected_notes,
				description: action.item.description,
				search_text: mainItem.text,                       // put to search text old mainItem text
				//img_url: mainItem.img_url
			};

		case 'UPDATE_MAIN_ITEM':

		    console.log('mainItemReducer.js - case  UPDATE_MAIN_ITEM')
			return {

				text: action.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				connected_notes: mainItem.connected_notes,
				description: mainItem.description,
				search_text: mainItem.search_text,                       // put to search text old mainItem text
				//img_url: mainItem.img_url
			};
		//return { ...mainItem, text: action.text };  // todo: not work - ES7 (experimental)

		case 'ADD_CONNECTED_ITEM':  // connected array veryfied already, add current item id to mainItem connected items array

			return {
			
				text: mainItem.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				description: mainItem.description, 
				connected_notes: [...mainItem.connected_notes, action.id],
				search_text: mainItem.search_text,                       // put to search text old mainItem text
				//img_url: mainItem.img_url
			};

			//return {...mainItem, connected_notes: [...mainItem.connected_notes, action.id]};  // todo: not work - ES7 (experimental)


		case 'DEL_CONNECTED_ITEM': // connected array veryfied already, remove current item id from mainItem connected items array

			return {
			
				text: mainItem.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				description: mainItem.description, 
				connected_notes: mainItem.connected_notes.filter(( item_id ) => {return item_id !== action.id}),
				search_text: mainItem.search_text,                       // put to search text old mainItem text
				//img_url: mainItem.img_url
			};

			
		case 'CHANGE_SEARCH_TEXT': // connected array veryfied already, remove current item id from mainItem connected items array

			return {
			
				text: mainItem.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				description: mainItem.description, 
				connected_notes: mainItem.connected_notes,
				search_text: action.search_text,                       // put to search text old mainItem text
				//img_url: mainItem.img_url
			};


		case 'SHOW_DESCRIPTION': 

			return {
			
				text: mainItem.text, 
				completed: mainItem.completed, 
				id: mainItem.id, 
				description: action.desc, 
				connected_notes: mainItem.connected_notes,
				search_text: mainItem.search_text,                       // put to search text old mainItem text
				//img_url: mainItem.img_url
			};


		default:
			return mainItem;


	}
}

export default mainItemReducer;