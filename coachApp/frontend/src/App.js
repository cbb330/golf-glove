import React, { Component } from 'react';
import TestChart from './TestChart.js'

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div style={{height: 500, width: 800}}>
        <h1>Coach App</h1>
        <TestChart />
      </div>
    )
  }
}

export default App;
