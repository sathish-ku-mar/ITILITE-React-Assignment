import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from '../../axios';
import Login from '../Login/Login';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      errors: []
    }
  }

  handleClick(event) {
    
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      "name": this.state.name,
      "email": this.state.email,
      "phone": this.state.phone,
      "password": this.state.password,
    }
    axios.post('/user/signup/', payload)
      .then(function (response) {
        console.log(response);
        if (response.data.statusCode == 200) {
          var loginscreen = []; 
          let { props } = self.props.parentContext; //
          loginscreen.push(<Login appContext={props.parentContext} />); //
          var loginmessage = "Not Registered yet.Go to registration";
          self.props.parentContext.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage,
            buttonLabel: "Register",
            isLogin: true
          });
        }
      })
      .catch(function (error) {
        if(error){ //
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
    let err = {
      name: '',
      email: '',
      phone: '',
      password: ''
    }
    if (errors.length > 0) {
      let temp = errors[0]

      for (var key in err) {
        if (temp.hasOwnProperty(key)) {
          err[key] = temp[key][0]
        }
      }
    }

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Register"
            />

            <TextField
              hintText="Enter your Name"
              floatingLabelText="Name"
              onChange={(event, newValue) => this.setState({ name: newValue })}
            />
            {err['name'] && <div><p style={{ color: 'red' }}>{err['name']}</p></div>}
            <br />
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            {err['email'] && <div><p style={{ color: 'red' }}>{err['name']}</p></div>}
            <br />
            <TextField
              hintText="Enter your Phone"
              floatingLabelText="Phone"
              onChange={(event, newValue) => this.setState({ phone: newValue })}
            />
            {err['phone'] && <div><p style={{ color: 'red' }}>{err['phone']}</p></div>}
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            {err['password'] && <div><p style={{ color: 'red' }}>{err['password']}</p></div>}
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
export default Register;