import React, { Component } from 'react'


class MainItem extends Component {


  constructor(props, context) {

    super(props, context)

    //this.state = {inputText: ''} 
    // I don't store input value in state, I use text_input class attribute instead
    // I have to clear input after action is created, is simpler to do that this way

    // this attribute is set later by ref: ref = {node => {this.text_input = node}}
    this.text_input = this.props.item.text;
  }


  handleComplete(event) {

    event.preventDefault();
    //this.props.actions.completeTodo(this.props.item.id);
  }


  handleDelete(event) {

    event.preventDefault();
    this.props.actions.deleteTodo(this.props.item.id);
  }


  handleSubmit(event) {

    event.preventDefault()
    this.props.actions.saveMainItemNote(this.props.item.id, this.text_input.value ) // this.props.addTodo(this.state.inputText)
    //this.text_input.value = ""
  }


  handleTextChange(event) {

    event.preventDefault()
    this.props.actions.updateMainItem(this.text_input.value ) // this.props.addTodo(this.state.inputText)
  }


  render() {

    this.props.showDescription(this.props.item.description);

    return (

      <form className = "form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <div className = "list-group-item col-sm-12 pull-right">
          <span className = "glyphicon glyphicon-pencil" aria-hidden="true" col-sm-1>
          </span>
          <div className = "col-sm-10">
            <input className = "col-sm-12"
              id = "mainItem"
              type = "text" 
              ref = {node => {this.text_input = node}}
              placeholder = "Type in your Searchzz"
              value = {this.props.item.text}
              onChange = {this.handleTextChange.bind(this)}
            />
          </div>
          <div className = "col-sm-2">
            <button type="button" className="btn btn-md btn-success img-circle" onClick={this.handleComplete.bind(this)}>&#x2713;</button> <button type="button" className="btn btn-md btn-danger glyphicon glyphicon-remove" onClick={this.handleDelete.bind(this)}/>
          </div>
        </div>
      </form>
    )
  }
}

export default MainItem
