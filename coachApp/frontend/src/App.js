import React, { Component } from 'react';
// import axios from 'axios'; // http request package

import TestChart from './TestChart.js';
import testData from './data/test-data.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: undefined
    };
  }
  
  componentDidMount() {
    this.sendScan();
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
  
  sendScan() {
    const ws = new WebSocket("ws://170.253.147.206:8080"); //to access Christian Bush's rsbpi
    
    // Send the msg object as a JSON-formatted string.
    ws.onopen = (event) => {
      console.log('we open');
      // Construct a msg object containing the data the server needs to process the message from the chat client.
      var msg = {
        type: "scanOn"
      };
      console.log(JSON.stringify(msg));
      ws.send(JSON.stringify(msg));
    };
    ws.onmessage = (event) => {
      console.log(event.data);
    };
  };


  render() {
    return (
        <div style={{height: 600, width: 1000}}>
          {this.state.response === undefined ?
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
