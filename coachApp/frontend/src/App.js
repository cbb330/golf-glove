import React, { Component } from 'react';
import axios from 'axios';

import TestChart from './TestChart.js';
import testData from './data/test-data.json';

const ws = new WebSocket("ws://170.253.147.206:8080"); //to access Christian Bush's rsbpi

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: undefined,
      socket: undefined
    };
  }

  componentDidMount() {
    this.getHello();
    this.getSocket();
  }

  getHello() {
    axios.get('http://170.253.147.206:4000/hello') //to access Christian Bush's rsbpi
      .then((response) => {
        this.setHello(response.data.time);
        // console.log(response.data)
      });
  }

  // TODO: fix this
  setHello(e) {
    this.setState({
      response: e
    });
  }

  getSocket() {
    ws.onmessage = event => {
      this.setState({ socket: JSON.parse(event.data) });
      console.log(this.state.socket);
    };
  };


  render() {

    // if ((this.state.response === undefined) && (this.state.socket === undefined)) {
    //   return (
    //       <div style={{height: 600, width: 1000}}>
    //         <h1>Still fetching data</h1>
    //         <TestChart data={testData} />
    //       </div>
    //   )
    // }
    // else {
    return (
        <div style={{height: 600, width: 1000}}>
          {this.state.response === undefined && this.state.socket === undefined ?
            <h1>Still fetching data</h1> :
            <div>
              <h1>{this.state.response}</h1>
              <h1>{this.state.socket["name"]}</h1> {/* name is conditionally set in backend */}
              <h2>{this.state.socket.uuid}</h2>
            </div>
          }
          <TestChart data={testData} />
        </div>
    );
  }
}

export default App;
