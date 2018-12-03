import React, { Component } from 'react';

// import testData from './data/test-data.json';
import ChartDashboard from './ChartDashboard.js';
import Checkbox from './Checkbox.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAcceptingData: false,
      isConnectedToDevice: false,
      visibleGraphs: {
        accel: true,
        gyro: true,
        stretch: true,
        pressure: true
      },
      response: undefined
    };
    this.handleGraphDisplayChange = this.handleGraphDisplayChange.bind(this);

    // this.socket = new WebSocket("ws://170.253.147.206:8081");
    this.socket = new WebSocket("ws://localhost:8000");
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
          // console.log(new Date(message.data.timestamp));
          // message.data.timestamp = new Date(message.data.timestamp);
          message.data.time = new Date(message.data.timestamp);
          this.holdingData.push(message.data);
          // console.log(message.data.time);
          const FRAME_SIZE = 40;
          if (this.holdingData.length >= FRAME_SIZE) {
            this.data = [...this.data.slice(-100), ...this.holdingData];
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

  handleGraphDisplayChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => {
      const vg = prevState.visibleGraphs;
      vg[item] = isChecked;
      return {visibleGraphs: vg};
    });
  }

  render() {
    return (
        <div>
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
          <label>
            accel
            <Checkbox name='accel' checked={this.state.visibleGraphs.accel} onChange={this.handleGraphDisplayChange} />
          </label>
          <label>
            gyro
            <Checkbox name='gyro' checked={this.state.visibleGraphs.gyro} onChange={this.handleGraphDisplayChange} />
          </label>
          <label>
            stretch
            <Checkbox name='stretch' checked={this.state.visibleGraphs.stretch} onChange={this.handleGraphDisplayChange} />
          </label>
          <label>
            pressure
            <Checkbox name='pressure' checked={this.state.visibleGraphs.pressure} onChange={this.handleGraphDisplayChange} />
          </label>
          <div style={{height: 1000, width: '100%', display: 'flex'}}>
            <ChartDashboard data={this.data} overlay={false} visibleGraphs={this.state.visibleGraphs} />
          </div>
        </div>
    );
  }
}

export default App;
