import React, { Component } from 'react';
// import axios from 'axios'; // http request package

import TestChart from './TestChart.js';
import testData from './data/test-data.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAcceptingData: false,
      isConnectedToDevice: false,
      response: undefined
    };

    this.socket = new WebSocket("ws://170.253.147.206:8081");
  }
  
  componentDidMount() {
    this.socket.onmessage = (event) => {
      // TODO: handle responses from server
      // TODO: responses include data, errors with connection, and general updates
      const response = JSON.parse(event.data);
      console.log(response);
      this.setState({response});
    };
  }

  // http request for future needs
  // getHello() {
  //   axios.get('http://170.253.147.206:4000/hello') //to access Christian Bush's rsbpi
  //     .then((response) => {
  //       this.setHello(response.data.time);
  //       // console.log(response.data)
  //     });
  // }

  // setHello(e) {
  //   this.setState({
  //     response: e
  //   });
  // }
  
  handleConnect() {
    this.connectDevice();
    this.setState({
      isConnectedToDevice: true
    });
  }

  handleDisconnect() {
    this.disconnectDevice();
    this.setState({
      isConnectedToDevice: false
    });
  }

  handleStartAcceptingData() {
    this.startDataReception();
    this.setState({
      isAcceptingData: true
    });
  }

  handleStopAcceptingData() {
    this.stopDataReception();
    this.setState({
      isAcceptingData: false
    });
  }

  connectDevice() {
    // construct connect message object
    const message = {type: "connect"};
    console.log('sending following connect message to backend:');
    console.log(message);
    // send message as a JSON-formatted string
    this.socket.send(JSON.stringify(message));
  }

  disconnectDevice() {
    // construct disconnect message object
    const message = {type: "disconnect"};
    console.log('sending following disconnect message to backend:');
    console.log(message);
    // send message as a JSON-formatted string
    this.socket.send(JSON.stringify(message));
  }

  startDataReception() {
    // construct start message object
    const message = {type: "start"};
    console.log('sending following start message to backend:');
    console.log(message);
    // send message as a JSON-formatted string
    this.socket.send(JSON.stringify(message));
  }

  stopDataReception() {
    // construct stop message object
    const message = {type: "stop"};
    console.log('sending following start message to backend:');
    console.log(message);
    // send message as a JSON-formatted string
    this.socket.send(JSON.stringify(message));
  }

  render() {
    return (
        <div style={{height: 600, width: 1000}}>
          <button onClick={(e) => this.handleConnect(e)} disabled={this.state.isConnectedToDevice}>
            Connect
          </button>
          <button onClick={(e) => this.handleDisconnect(e)} disabled={!this.state.isConnectedToDevice}>
            Disconnect
          </button>
          <button onClick={(e) => this.handleStartAcceptingData(e)} disabled={this.state.isAcceptingData}>
            Start
          </button>
          <button onClick={(e) => this.handleStopAcceptingData(e)} disabled={!this.state.isAcceptingData}>
            Stop
          </button>
          {/* <p>{`Socket state: ${this.socket.readyState ? "connected" : "disconnected"}`}</p> */}
          <p>{`Connection state: ${this.state.isConnectedToDevice ? "connected" : "disconnected"}`}.</p>
          <p>{`Data state: ${this.state.isAcceptingData ? "accepting" : "not accepting"}`}.</p>
          {this.state.response === undefined ?
            <h1>Still fetching data</h1> :
            <div>
              <h1>{`Name: ${this.state.response.name}`}</h1> {/* name is conditionally set in backend */}
              <h2>{`Uuid: ${this.state.response.uuid}`}</h2>
            </div>
          }
          <TestChart data={testData} />
        </div>
    );
  }
}

export default App;
