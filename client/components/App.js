import React, { Component } from 'react'
import SearchInput from './SearchInput'
import SearchList from './SearchList'
import MainItem from './MainItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'

class App extends Component {


  constructor(props, context) {

    super(props, context)

    // I store input value in state,
    // this.state = {inputText: ''} 

    // I also use text_input class attribute 
    // I have to clear input after action is created, is simpler to do that this way

    // this attribute is set later by ref: ref = {node => {this.text_input = node}}
    this.description = null;
  }


  handleSaveDescription( event ) {

    event.preventDefault();
    this.props.actions.saveDescription(this.props.mainItem.id, this.description.value) // this.props.addTodo(this.state.inputText)
  }

  showDescription( desc ) {

   //this.setState({ description: desc });
    //this.description = desc;
    //this.render();
  }

  handleTextChange(event) {

    event.preventDefault()
    //this.setState({inputText: event.target.value})
    this.props.mainItem.description = this.description.value
    this.setState({ description: this.description.value});
  }

  render() {

    //this.description.value = this.props.mainItem.description;
    //ref = {node => {this.description = node}} 
    //<button type="button" className="btn btn-success btn-md" onClick={this.handleLoadDbData.bind(this)}>Podrap Asie...</button>

    return (
      <div className = "container">
        <h1>Search Tree *Super Asia ~~>  M.E.R.N. example</h1>

        <MainItem
          item = { this.props.mainItem } 
          actions = { this.props.actions }
          showDescription = { this.showDescription.bind(this) }
        />
        <SearchInput addTodo = {this.props.actions.addTodo} loadSearchItems = {this.props.actions.loadSearchItems}/>
        <SearchList todos = {this.props.todos} actions={this.props.actions}/>

        <div className="form-group">
          <label for="comment">Comment:</label>
          <textarea className="form-control" rows="5" id="comment" ref = {node => {this.description = node}} onChange = {this.handleTextChange.bind(this)} value = {this.props.mainItem.description}></textarea>
          <button type="button" className="btn btn-success btn-md" onClick={this.handleSaveDescription.bind(this)}>Zapisz</button>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {

  return state
}

// wraps all actions with dispatcher function and returns them
// you don't have to call dispatch explicitly, actions dispatch themself
// you can't use actions just from actions.js file, only by App component as props
function mapDispatchToProps( dispatch ) {

  return {actions: bindActionCreators(actions, dispatch)} 
}

export default connect(mapStateToProps, mapDispatchToProps)(App)