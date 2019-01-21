// Actions creators functions - used in App.js, actions functions are binded to App class
// Actions creators functions have to be used in components by props from App class:
// only binded versions of this functions can dispatch actions!

let actions = {

  // addTodo: ( text, id = -1 ) => {
  //   return {
  //     type: 'ADD_TODO',
  //     text: text,
  //     id: id
  //   }
  // },


  addTodo: ( text, id = -1 ) => {

    return ( dispatch ) => {

      $.ajax({
          url: '/notes',
          type: 'POST',
          data: {

            text: 'auto',
            note: text,
            connected_notes: [],
            description: ''
          },

        success: function(data, textStatus, jqXHR) {

          console.log(JSON.stringify(data, null, 2));

          dispatch({
            type: 'ADD_TODO',
            text: data.note,
            id: data._id,
            connected_notes: [],
            description: ''
          })
        }
      });
    }
  },

  deleteTodo: ( id ) => {

    return ( dispatch ) => {

      $.ajax({
        url: '/notes',// & id,
        type: 'DELETE',
        data: {

          '_id' : id
        },

        success: function(data, textStatus, jqXHR) {

          dispatch({

           type: 'DELETE_TODO',
             id: id
          })
        }
      });
    }

  	// return {
  	// 	type: 'DELETE_TODO',
  	//   	id: id
  	// };
  },

  // add uploading connected items loadDbData(search_text)
  changeMainItem_xxxx: ( item ) => {  // <- do zastąpienia przez loadDbData(item, search_text)

    return (dispatch, getState) => { 

      const {todos, mainItem} = getState();

      loadDbData(mainItem.search_text); // <- tu powinno być dodane id nowego mainItem jako parametr

      dispatch({

        type: 'CHANGE_MAIN_ITEM',
        item: item
      });

      todos.map(( todo ) => { // looking into all viewed todos and switching on or off

        if(item.connected_notes.some(( curr_id ) => {return curr_id === todo.id}) ) {   // if todo.id is in connected notes array of new main item

          dispatch({

            type: 'TOGGLE_TODO',
            id: todo.id,
            on: true
          });
        }
        else {

          dispatch({

            type: 'TOGGLE_TODO',
            id: todo.id,
            on: false
          });
        }
      })
    }
  },

  saveMainItemNote: (id, text) => {


    return ( dispatch ) => {

      $.ajax({
        url: '/notes',// & id,
        type: 'PUT',
        data: {

          '_id' : id,
          'updateObject': {note: text}
          //'text': text
        },

        success: function(data, textStatus, jqXHR) {

          dispatch({

            type: 'UPDATE_MAIN_ITEM',
            text: data.note
          })
        }
      });
    }
  },  

  saveDescription: (id, desc) => {

    return ( dispatch ) => {

      $.ajax({
        url: '/notes',// & id,
        type: 'PUT',
        data: {

          '_id' : id,
          'updateObject': {description: desc}
          //'text': text
        },

        success: function(data, textStatus, jqXHR) {

          dispatch({

            type: 'UPDATE_DESCRIPTION',  // save descriptin to view item state
            id: id,
            desc: data.description
          })
        }
      });
    }
  },

  addMainItemConnection: ( id ) => {

    return (dispatch, getState) => {   

      // function is returned here instead of object, *thunk* middleware pass control 
      // to this function when action arise but action will not be dispatched immediately
      // but e.g. on server API response
      const { mainItem } = getState(); // <- <- <- get mainItem from state

      // don't add if exist (todo:remove if exist)
      if(mainItem && mainItem.connected_notes.length > 0 && mainItem.connected_notes.some(( curr_id ) => {return curr_id === id}) ) {

        console.log('del connected 2, mainItem:' + mainItem.id + 'added item:' + id);

        let id_array = mainItem.connected_notes.filter(( item_id ) => {return item_id !== id});
        if(id_array.length === 0) id_array = [ -1 ];

        $.ajax({
          url: '/notes',// & id,
          type: 'PUT',
          data: {

            '_id' : mainItem.id,
            'updateObject': {'connected_notes': id_array}
           },

          success: function(data, textStatus, jqXHR) {

            dispatch({

              type: 'DEL_CONNECTED_ITEM',               // <- tutaj powinno być coś w rodzaju REFRESH MAIN ITEM..
              id: id
            });

            dispatch({

              type: 'TOGGLE_TODO',
              id: id,
              on: false
            });
          }
        });
      }
      else {

        console.log('add connected 2, mainItem:' + mainItem.id + 'added item:' + id);

        $.ajax({
          url: '/notes',// & id,
          type: 'PUT',
          data: {

            '_id' : mainItem.id,
            'updateObject': {connected_notes: [...mainItem.connected_notes, id]}
            //'connected_notes': [...mainItem.connected_notes, id]
          },

          success: function(data, textStatus, jqXHR) {

            dispatch({

              type: 'ADD_CONNECTED_ITEM',               // <- tutaj powinno być coś w rodzaju REFRESH MAIN ITEM..
              id: id
            });

            dispatch({

              type: 'TOGGLE_TODO',
              id: id,
              on: true
            });
          }
        });
      }
    }
  },


  updateMainItem: ( text ) => {

    return {

      type: 'UPDATE_MAIN_ITEM',
      text: text
    }
  },
  
  showDescription: ( desc ) => {

    return {

      type: 'SHOW_DESCRIPTION',
      description: desc
    }
  },


  createNewUserId: () => {

    return {
      type: 'CREATE_USER_ID',
      id: Math.round(Math.random() * 100)
    }
  },

  // example for *thunk* middleware
  createNewUserIdIfOdd: () => {

    return (dispatch, getState) => {   

      // function is returned here instead of object, *thunk* middleware pass control 
      // to this function when action arise but action will not be dispatched immediately
      // but e.g. on server API response
      const { user } = getState();
      if(user.id % 2 === 0 ) return;
      dispatch( actions.createNewUserId());
    }
  },

  // example for *thunk* middleware
  createNewUserIdAsync: () => {

    return ( dispatch ) => {   

      // function is returned here instead of object, *thunk* middleware pass control 
      // to this function when action arise but action will not be dispatched immediately
      // but e.g. on server API response
      // server call, $.ajax, $.get('url'{} etc..
      setTimeout(() => {

        dispatch( actions.createNewUserId())
      }, 2500)
    }
  },

// dodać oddzielną funkcję dla searchText
  // loadDbData: (item, searchText) => {   //mainItem.search_text ?

  //   return (dispatch, getState) => {

  //     $.ajax({

  //       url: '/notes',
  //       method: 'GET',

  //       success: function(data, textStatus, jqXHR) {

  //         //console.log(JSON.stringify(data, null, 2));

  //         const {todos, mainItem} = getState();

  //         let re = new RegExp( searchText ) //=== '' ? mainItem.search_text : searchText );
  //         let _mainItem = item ? item : mainItem;

  //         // loop by all items from DB (curr_item)
  //         data.map(( curr_item ) => {

  //           let inTodos = todos.some(( todo ) => {return todo.id === curr_item._id}); // curr_item already on todos list
  //           let inSearch = searchText ? re.test( curr_item.note ) : false;
  //           let inConnected = ( // curr_item in _mainItem.connected_notes

  //             _mainItem && 
  //             _mainItem.connected_notes && 
  //             _mainItem.connected_notes.length > 0 && 
  //             _mainItem.connected_notes.some(( curr_id ) => {return curr_id === curr_item._id})
  //           )

  //           // remove or add by searchText, item (new mainItem) may be null here

  //           if(!inTodos && (inConnected || inSearch)) {
  //             //console.log("Curr && (ent todos:" + JSON.stringify(todos, null, 2));
  //             console.log('new item id:' + curr_item._id);

  //             dispatch({

  //               type: 'ADD_TODO',
  //               text: curr_item.note,
  //               id: curr_item._id,
  //               description: curr_item.description ? curr_item.description : '',
  //               connected_notes: curr_item.connected_notes,
  //               completed: inConnected
  //             })
  //           }
  //           else if(inTodos && !inConnected && !inSearch) {

  //             dispatch({

  //              type: 'DELETE_TODO',
  //                id: curr_item._id
  //             })    
  //           }
  //         })

  //         // looking into all viewed todos and switching on or off (if connected to _mainItem or not)
  //         todos.map(( todo ) => {

  //           let toggle_on = (_mainItem && _mainItem.connected_notes) ? _mainItem.connected_notes.some(( curr_id ) => {return curr_id === todo.id}) : false;
  //           dispatch({

  //             type: 'TOGGLE_TODO',
  //             id: todo.id,
  //             on: toggle_on
  //           });
  //         })

  //         if( item ) {

  //           dispatch({

  //             type: 'CHANGE_MAIN_ITEM',
  //             item: item
  //           });

  //           dispatch({

  //             type: 'SHOW_DESCRIPTION',
  //             desc: item.description
  //           })  
  //         }

  //         // save mainItem search_text
  //         dispatch({

  //           type: 'CHANGE_SEARCH_TEXT',
  //           search_text: searchText
  //         })
  //       }
  //     });
  //   }
  // }



  changeMainItem: ( item ) => {

    return (dispatch, getState) => {

      $.ajax({

        url: '/notes',
        method: 'GET',

        success: function(data, textStatus, jqXHR) {

          //console.log(JSON.stringify(data, null, 2));

          const {todos, mainItem} = getState();

          let _mainItem = item ? item : mainItem;
          let re = new RegExp( _mainItem.search_text ) //=== '' ? mainItem.search_text : searchText );

          // loop by all items from DB (curr_item)
          data.map(( curr_item ) => {

            let inTodos = todos.some(( todo ) => {return todo.id === curr_item._id}); // curr_item already on todos list
            let inSearch = re.test( curr_item.note );
            let inConnected = ( // curr_item in _mainItem.connected_notes

              _mainItem && 
              _mainItem.connected_notes && 
              _mainItem.connected_notes.length > 0 && 
              _mainItem.connected_notes.some(( curr_id ) => {return curr_id === curr_item._id})
            )

            // remove or add by searchText, item (new mainItem) may be null here

            if(!inTodos && inConnected) {
              //console.log("Curr && (ent todos:" + JSON.stringify(todos, null, 2));
              console.log('new item id:' + curr_item._id);

              dispatch({

                type: 'ADD_TODO',
                text: curr_item.note,
                id: curr_item._id,
                description: curr_item.description ? curr_item.description : '',
                connected_notes: curr_item.connected_notes,
                completed: inConnected
              })
            }
            else if(inTodos && !inConnected && !inSearch) {

              dispatch({

               type: 'DELETE_TODO',
                 id: curr_item._id
              }) 
            }

            if(inConnected || (inTodos && inSearch)) {

              dispatch({

                type: 'TOGGLE_TODO',
                id: curr_item._id,
                on: inConnected
              });
            }
          })

          if( item ) {

            dispatch({

              type: 'CHANGE_MAIN_ITEM',
              item: item
            });

            dispatch({

              type: 'SHOW_DESCRIPTION',
              desc: item.description
            })  
          }
        }
      });
    }
  },


  loadSearchItems: ( searchText ) => { 

    return (dispatch, getState) => {

      $.ajax({

        url: '/notes',
        method: 'GET',

        success: function(data, textStatus, jqXHR) {

          //console.log(JSON.stringify(data, null, 2));

          const {todos, mainItem} = getState();

          let re = new RegExp( searchText ) //=== '' ? mainItem.search_text : searchText );
          let _mainItem = mainItem;

          // loop by all items from DB (curr_item)
          data.map(( curr_item ) => {

            let inTodos = todos.some(( todo ) => {return todo.id === curr_item._id}); // curr_item already on todos list
            let inSearch = searchText ? re.test( curr_item.note ) : false;
            let inConnected = ( // curr_item in _mainItem.connected_notes

              _mainItem && 
              _mainItem.connected_notes && 
              _mainItem.connected_notes.length > 0 && 
              _mainItem.connected_notes.some(( curr_id ) => {return curr_id === curr_item._id})
            )

            // remove or add by searchText, item (new mainItem) may be null here

            if(!inTodos && inSearch) {
              //console.log("Curr && (ent todos:" + JSON.stringify(todos, null, 2));
              console.log('new item id:' + curr_item._id);

              dispatch({

                type: 'ADD_TODO',
                text: curr_item.note,
                id: curr_item._id,
                description: curr_item.description ? curr_item.description : '',
                connected_notes: curr_item.connected_notes,
                completed: false
              })

              dispatch({

                type: 'TOGGLE_TODO',
                id: curr_item._id,
                on: false
              });

            }
            else if(inTodos && !inConnected && !inSearch) {

              dispatch({

               type: 'DELETE_TODO',
                 id: curr_item._id
              })    
            }
          })

          // save mainItem search_text
          dispatch({

            type: 'CHANGE_SEARCH_TEXT',
            search_text: searchText
          })
        }
      });
    }
  }
}

export default actions

//store.dispatch( addTodo( 'some text'))