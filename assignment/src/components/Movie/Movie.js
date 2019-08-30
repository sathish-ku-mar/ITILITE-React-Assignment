import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from '../../axios';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Event from '../Event/Event';
import Homescreen from '../Home/Homescreen';


class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loginscreen: [],
            buttonLabel: 'Event',
            error: true,
            hiddenRowKeys: []
        }
    }

    render() {
        let table = "Not booked any movie ticket!..."
        let columns = []
        let self = this;
        let token = localStorage.getItem("token");
        if (this.props.response) {
            let data = []
            this.props.response.forEach(item => {
                data.push({
                    id: item.id,
                    movie: item.show.movie.name,
                    language: item.show.movie.language,
                    theater: item.show.theater.name,
                    place: item.show.theater.place,
                    screen: item.show.screen,
                    date: item.show.date,
                    time: item.show.time,
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
                            remote: true,
                            deleteRow: true,
                            events: {
                                onClick: (e, column, columnIndex, row, rowIndex) => {
                                    axios.delete('http://127.0.0.1:8000/movie/book/' + row.id + '/', { headers: { Authorization: token } })
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

export default Movie;