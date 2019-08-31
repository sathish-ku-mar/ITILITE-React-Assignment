import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from '../../axios';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Event from '../Event/Event';
import Movie from '../Movie/Movie';
import Login from '../Login/Login';

class Homescreen extends Component {
  _table = null

  constructor(props) {
    super(props);
    this.state = {
      movie: {
        response: null,
        callBack: () => this.movieHandleClick(),
        active: true
      },
      event: {
        response: null,
        callBack: () => this.eventHandleClick(),
        active: false
      },
      loginscreen: [],
      buttonLabel: 'Event',
      error: true,
    }
  }
  token = localStorage.getItem("token");
  componentDidMount() {
    this.state.movie.callBack()
  }


  eventHandleClick(event) {
    axios.get('/event/book/', { headers: { Authorization: this.token } })
      .then(response => {
        let event = { ...this.state.event };
        event.response = response.data.data;
        event.active = true;
        this.setState({ event: event });

        let movie = { ...this.state.movie };
        movie.active = false;
        this.setState({ movie: movie });
        if (this.state.event) {
          const instance = new Event(this.state.event);
          this._table = instance.render();
          this.forceUpdate()
        }
      }).catch(error => {
        this.setState({ error: false })
      });
  }

  movieHandleClick(event) {

    axios.get('/movie/book/', { headers: { Authorization: this.token } })
      .then(response => {
        let movie = { ...this.state.movie };
        movie.response = response.data.data;
        movie.active = true;
        this.setState({ movie: movie });

        let event = { ...this.state.event };
        event.active = false;
        this.setState({ event: event });
        if (this.state.movie) {
          const instance = new Movie(this.state.movie);
          this._table = instance.render();
          this.forceUpdate()
        }

      }).catch(error => {
        this.setState({ error: false })
      });
  }

  logoutHandleClick(event) {
    console.log('sghj')
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = '/';
  }


  render() {
    let table = null

    if (this._table) {
      table = this._table
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar class="header" title="Home Page" />

          </div>

          <RaisedButton class={this.state.movie.active ? "active1" : ''} label='Movie' primary={true} style={style} onClick={(event) => this.movieHandleClick(event)} />
          <RaisedButton class={this.state.event.active ? "active1" : ''} label='Event' primary={true} style={style} onClick={(event) => this.eventHandleClick(event)} />
        </MuiThemeProvider>
        <button class="login-btn" style={{ color: 'red' }} onClick={(event) => this.logoutHandleClick(event)} >Logout</button>

        <div>
          {table}
        </div>
      </div>

    );
  }
}
const style = {
  margin: 15,
};
export default Homescreen;