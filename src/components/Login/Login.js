import React, { Component } from 'react';
import axios from '../../axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Homescreen from '../Home/Homescreen';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    }
  }

  handleClick(event) {
    var apiBaseUrl = "http://127.0.0.1:8000";
    var self = this;
    var payload = {
      "email": this.state.username,
      "password": this.state.password
    }
    axios.post(apiBaseUrl + '/user/login/', payload)
      .then(function (response) {
        console.log(response);
        if (response.data.statusCode == 200) {
          console.log("Login successfull");
          var uploadScreen = [];
          localStorage.setItem("token", response.data.data.token);
          uploadScreen.push(<Homescreen appContext={self.props.appContext} />)
          console.log("self===>", self);
          self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
        }
        else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        if (error.length > 0) {
          let { data } = error.response;
          let temp = [];
          temp.push(data.data)
          self.setState({
            errors: temp,
          })
        }
      });
  }
  render() {
    const { errors } = this.state;
    let err = ''
    if (errors.length > 0) {
      let temp = errors[0]
      console.log(temp)
      err = temp.message
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Login"
            />
            {err && <div><p style={{ color: 'red' }}>{err}</p></div>}
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />

            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Login;