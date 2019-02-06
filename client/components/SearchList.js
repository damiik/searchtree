import React, { Component } from 'react'
import SearchItem from './SearchItem'


        // this.props.todos.map(( todo ) => {

        //     return <SearchItem 
        //     key = { todo.id } 
        //     todo = { todo } 
        //     t_id = {todo.completed ? 'toggled' : 'untoggled'}
        //     actions = { this.props.actions }
        //   />
        // })
class SearchList extends Component {

  render() {

    let connected_set = this.props.todos.filter((f_todo) => { return f_todo.completed });
    let not_connected = this.props.todos.filter((f_todo) => { return !(f_todo.completed); }); 

    // recreate list, connected first
    let ordered_set =  [...connected_set, ...not_connected];

    return (

      <div className="table frame form-container" id = "search-list"> 
      {
        ordered_set.map(( todo ) => {

          return <SearchItem key = { todo.id } todo = { todo } t_id =  {todo.completed ? 'toggled' : 'untoggled'}
          actions = { this.props.actions } />
        })
      }
      </div> 
    )
  }
}

export default SearchList
