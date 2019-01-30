
import React, { Component } from 'react'

class SearchInput extends Component {

  constructor(props, context) {

    super(props, context)

    // I store input value in state,
    // this.state = {inputText: ''} 

    // I also use text_input class attribute 
    // I have to clear input after action is created, is simpler to do that this way

    // this attribute is set later by ref: ref = {node => {this.text_input = node}}
    this.text_input = null;
  }

  // I don't have to handle this, current input text is stored directly in this.text_input
  // handleChange(event) {

  //   this.setState({inputText: event.target.value})
  // }
  // onChange = { this.handleChange.bind(this) }

  handleSubmit(event) {

    event.preventDefault()
    this.props.addTodo( this.text_input.value ) // this.props.addTodo(this.state.inputText)
    this.text_input.value = ""
  }


  handleTextChange(event) {

    event.preventDefault()
    //this.setState({inputText: event.target.value})
    this.props.loadSearchItems(this.text_input.value)
  }


  render() {

    return (
      <form className = "form-container" id = "search-form" onSubmit={this.handleSubmit.bind(this)}>
        <input className = "form-value" id="serach" type = "text" 
          ref = {node => {this.text_input = node}}
          placeholder = "Type in your Search.."
          onChange = {this.handleTextChange.bind(this)}
        />
         <button type="submit" className="btn-success">
          <div><i className="fas fa-search"/> Add</div>
        </button>
      </form>
    )
  }
}

export default SearchInput