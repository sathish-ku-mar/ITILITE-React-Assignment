import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loginscreen from './components/Login/Loginscreen';
import Homescreen from './components/Home/Homescreen';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    let token = localStorage.getItem("token");
    var loginPage =[];
    if(token){
      loginPage.push(<Homescreen parentContext={this}/>);
    }else{
      loginPage.push(<Loginscreen parentContext={this}/>);
    }
    
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
    );
  }
}
const style = {
  margin: 15,
};


export default App;
