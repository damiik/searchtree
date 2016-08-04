import React, { Component } from 'react'


class SearchItem extends Component {


  handlePushpin(event) {

    event.preventDefault();
    this.props.actions.addMainItemConnection(this.props.todo.id);
  }


  handleDelete(event) {

    event.preventDefault();
    this.props.actions.deleteTodo(this.props.todo.id);
  }


  handleChangeMainItem() {

    this.props.actions.changeMainItem( this.props.todo )
    //this.props.actions.changeMainItem(this.props.todo, '')
  }


  render() {
    
    return (

      <a href="#" className="list-group-item col-sm-12 pull-right">
      <h3 className = "text-primary col-sm-10" id = {this.props.t_id} onClick = {this.handleChangeMainItem.bind(this)}>{this.props.todo.text} </h3>
      <button type="button" className={"btn btn-md btn-success glyphicon " + (this.props.todo.completed ? "glyphicon-asterisk" : "glyphicon-pushpin")} onClick={this.handlePushpin.bind(this)}/>  <button type="button" className="btn btn-md btn-danger glyphicon glyphicon-remove" onClick={this.handleDelete.bind(this)}/>
      </a>
    )
  }
}

export default SearchItem
