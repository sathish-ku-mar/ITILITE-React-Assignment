import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from '../../axios';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      buttonLabel: 'Movie',
      error: true,
    }
  }

  render() {
    let table = "Not booked any event ticket!..."
    let token = localStorage.getItem("token");
    let columns = []
    let self = this
    if (this.props.response) {
      let data = []
      this.props.response.forEach(item => {
        data.push({
          id: item.id,
          event: item.event.name,
          type: item.event.type,
          language: item.event.language,
          duration: item.event.duration,
          artist: item.event.artist,
          place: item.event.place,
          date: item.event.date,
          time: item.event.time,
          class: item.seat_class.name,
          seat: item.seat_number,
          cost_per_ticket: item.seat_class.cost_per_ticket,
          no_of_tickets: item.no_of_tickets,
          service_fee: item.service_fee,
          total_cost: item.total_cost,
          action: 'Delete'
        })
      })

      if (data.length > 0) {
        Object.keys(data[0]).forEach(element => {
          if (element == 'action') {
            columns.push({
              dataField: element,
              text: element.toUpperCase(),
              style: { color: 'blue', textDecoration: 'underline' },
              events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                  axios.delete('http://127.0.0.1:8000/event/book/' + row.id + '/', { headers: { Authorization: token } })
                    .then(response => {
                      console.log('sucess');
                      self.props.callBack()
                    }).catch(error => {
                      console.log('error');
                    });
                }
              }
            })
          } else {
            columns.push({
              dataField: element,
              text: element.toUpperCase(),
            })
          }
        });

        table = <BootstrapTable keyField='id' data={data} columns={columns} pagination={paginationFactory()} />
      }
    }
    return (
      <div>
        {table}
      </div>

    );
  }
}
const style = {
  margin: 15,
};
export default Event;