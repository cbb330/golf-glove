import React, { Component } from 'react';

import TestChart from './TestChart.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAcceptingData: false,
      isConnectedToDevice: false,
      response: undefined
    };

    // this.socket = new WebSocket("ws://170.253.147.206:8081");
    this.socket = new WebSocket("ws://localhost:8080");
    this.data = [];
    this.holdingData = [];
  }
  
  componentDidMount() {
    this.socket.onmessage = (event) => {
      // TODO: handle responses from server
      // TODO: responses include data, errors with connection, and general updates
      const message = JSON.parse(event.data);
      // console.log(message);
      // this.setState({message});
      switch (message.type) {
        case 'data':
          // TODO: handle data (append to structure or whatever)
          message.data.time = new Date(message.data.timestamp);
          this.holdingData.push(message.data);
          if (this.holdingData.length >= 25) {
            this.data = [...this.data.slice(-500), ...this.holdingData];
            this.holdingData = [];
            // console.log('found 10 frames');
            this.setState(message);
          }
          break;
        case 'error':
          // TODO: handle other error
          console.log(message.data);
          // TODO: fix sending stop message on backend, just update state
          this.handleStopAcceptingData();
          break;
        case 'status':
          // handle status updates
          console.log(message.data);
          break;
        default:
          console.log(`Client received unknown message type (${message.type}) from the server`);
          console.log(message);
      }
    };
  }

  analyzeData() {
    console.log(this.data);
  }
  
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

  handleClearData() {
    this.data = [];
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
        <div style={{height: 400, width: 1000}}>
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
          <button onClick={(e) => this.analyzeData(e)}>
            Analyze
          </button>
          <button onClick={(e) => this.handleClearData(e)}>
            Clear Data
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
          <TestChart data={this.data} />
        </div>
    );
  }
}

export default App;
