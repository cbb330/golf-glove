import React, { Component } from 'react';
import TestChart from './TestChart.js'

import axios from 'axios'
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: undefined,
      post: '',
      responseToPost: '',
      socket: undefined,
      socketEndpoint: 'ws://localhost:4000'
    };
  }

  componentDidMount() {
    this.getHello()
    this.getSocket()
  }

  getHello() {
    axios.get('http://localhost:4000/hello')
      .then((response) => {
        this.setHello(response.data.time)
        // console.log(response.data)
      })
  }

  setHello(e) {
    this.setState({
      response: e
    })
  }

  getSocket() {
    const { socketEndpoint } = this.state;
    const socket = socketIOClient(socketEndpoint);
    socket.on("connection", data => this.setState({ socket: data }));
  }

  // setSocket(e) {
  //   this.setState({
  //     socket: e
  //   })
  // }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  render() {
    if ((this.state.response === undefined) &&
      (this.state.socket === undefined)) {
      return (<div>Still fetching data</div>)
    }
    else {
      return (
        <div style={{height: 500, width: 800}}>
          <h1>{this.state.response}</h1>
          <h2>{this.state.socket}</h2>
          <TestChart />
        </div>
      )
    }

  }
}

export default App;
