import React, { Component } from 'react'


class SearchItem extends Component {

  handlePushpin = (event) => {

    event.preventDefault();
    this.props.actions.addMainItemConnection(this.props.todo.id);
  }

  handleDelete = (event) => {

    event.preventDefault();
    this.props.actions.deleteTodo(this.props.todo.id);
  }

  handleChangeMainItem = () => {

    this.props.actions.changeMainItem( this.props.todo )
    //this.props.actions.changeMainItem(this.props.todo, '')
  }

  render() {
    
    return (

      <a href="#" className="search-element"> 
        <span className = "row light search-element-text" id = {this.props.t_id} onClick = {this.handleChangeMainItem}>{this.props.todo.text} </span>
        <button type="button" className="btn-success-noframe search-element-tool" onClick={this.handlePushpin}>
          <i className ={"fas " + (this.props.todo.completed ? "fa-lock" : "fa-lock-open")}/>
        </button> 
        <button type="button" className="btn-danger-noframe search-element-tool" onClick={this.handleDelete}>
          <i className="fas fa-times-circle"/>
        </button>
      </a>
    )
  }
}

export default SearchItem
