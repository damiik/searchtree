
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
      <div className="clearfix">
        <form className = "form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
          <div className = "list-group-item col-sm-12 pull-right">
            <span className = "glyphicon glyphicon-search" aria-hidden="true" col-sm-1>
            </span>
            <div className = "col-sm-9">
              <input className = "col-sm-12"
                type = "text" 
                ref = {node => {this.text_input = node}}
                placeholder = "Type in your Search"
                onChange = {this.handleTextChange.bind(this)}
              />
            </div>
            <div className = "col-sm-2">
              <input className="btn btn-info btn-md col-sm-12" type="submit" text="Add" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SearchInput