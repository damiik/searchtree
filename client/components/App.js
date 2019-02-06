import React, { Component } from 'react'
import SearchInput from './SearchInput'
import SearchList from './SearchList'
import MainItem from './MainItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
// import store from '../redux/store'

function readonly(target, name, descriptor) {

  descriptor.writable = false;
  return descriptor;
}

class App extends Component {


  constructor(props, context) {

    super(props, context)

    // I store input value in state,
    // this.state = {inputText: ''} 

    // I also use text_input class attribute 
    // I have to clear input after action is created, is simpler to do that this way
    this.state = {
      img_url: null
    };

    this.description = null; 
  }


  handleSaveDescription = ( event ) => {

    event.preventDefault();
    this.props.actions.saveDescription(this.props.mainItem.id, this.description.value) // this.props.addTodo(this.state.inputText)
  }


  @readonly
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

  componentDidMount = async () => {
    
    const resp = await fetch('/gif/'+ this.props.match.params.noteid);  // eq.: /gif/cats if noteid="cats"
    const json = await resp.json();
    console.log(json)
    this.setState( { img_url: json.img_url});
  }

  render() {


    console.log( this.state === null ? "no state" : this.state.img_url)

    //this.description.value = this.props.mainItem.description;
    //ref = {node => {this.description = node}} 
    //<button type="button" className="btn btn-success btn-md" onClick={this.handleLoadDbData.bind(this)}>Podrap Asie...</button>
    // let {pathname} = this.props.location;
    // console.log(pathname);


    // let result =  getGifData();
    // console.log(result);//.data.image_original_url) 

    // to add: youtube
    var gifElement = [];
    if(this.props.mainItem.description === '' && this.state !== null && this.state.img_url !== null) {

      gifElement[0] = <img src={this.state.img_url}></img>
    } else {

      gifElement = this.props.mainItem.description.split("\n").filter(line => line.slice(-4) === '.gif').map(line => <img src={ line }></img>);
    }
      

    
    return ( 

      <div className = "container" id = "main-container">
        <span className="logo"><h1>{ this.props.info }</h1></span>
        <SearchInput addTodo = {this.props.actions.addTodo} loadSearchItems = {this.props.actions.loadSearchItems}/>
        <SearchList todos = {this.props.todos} actions={this.props.actions}/>

        <MainItem
          item = { this.props.mainItem } 
          actions = { this.props.actions }
          showDescription = { this.showDescription.bind(this) }
        /> 
        <div className="form-container" id="content-form"> 
          <label>{"Content:" + this.props.match.params.noteid}</label>
          <textarea className = "app-info light" rows="5" ref = {node => {this.description = node}} onChange = {this.handleTextChange.bind(this)} value = {this.props.mainItem.description}></textarea>
          <button type="button" className="btn btn-success" onClick={this.handleSaveDescription}>Zapisz</button>
          { gifElement.map(line => line) }
          
        </div>        
      </div>
    )
  }
}
 

function mapStateToProps(state) {

  return { ...state, info: 'Search Tree ~~~> Asia Asiula 2019' };  // info is not a state!
}

// wraps all actions with dispatcher function and returns them
// you don't have to call dispatch explicitly, actions dispatch themself
// you can't use actions just from actions.js file, only by App component as props
function mapDispatchToProps( dispatch ) {

  return {actions: bindActionCreators(actions, dispatch)} 
}

export default connect(mapStateToProps, mapDispatchToProps)(App)  // connect App component