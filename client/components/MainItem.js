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
    this.props.actions.saveMainItemNote(this.props.item.id, this.text_input.value) // this.props.addTodo(this.state.inputText)
    //this.text_input.value = ""
  }


  handleTextChange(event) {

    event.preventDefault()
    this.props.actions.updateMainItem( this.text_input.value ) // this.props.addTodo(this.state.inputText)
  }


  render() {

    this.props.showDescription(this.props.item.description);

    return (

      <form className = 'form-container frame' id = 'book-form' onSubmit={this.handleSubmit.bind(this)}> 
            <label className = "form-label">Note:</label>
            <input className = "form-value" id = "mainItem" type = "text" placeholder = "???"
              ref = {node => {this.text_input = node}}
              value = {this.props.item.text} 
              onChange = {this.handleTextChange.bind(this)}/>

            <button type="button" className="btn-success" id="form-button-ok" onClick={this.handleComplete.bind(this)}>
            ok</button> 
          <button type="button" className="btn-danger" id= "form-button-delete" onClick={this.handleDelete.bind(this)}>del</button>
      </form>
    )
  }
}

export default MainItem