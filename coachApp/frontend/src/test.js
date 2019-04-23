const Denque = require('denque');
const denque = new Denque([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
const Plotly = require('plotly.js-dist');
const socket = new WebSocket("ws://localhost:8000");
//var d3 = require("d3");

/*var n = 40,
  random = d3.randomNormal(0, .2),
  data = d3.range(1).map(random),
  socket = new WebSocket("ws://localhost:8000");

var svg = d3.select("svg"),
  margin = {top: 20, right: 20, bottom: 20, left: 40},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
  .domain([0, n - 1])
  .range([0, width]);

var y = d3.scaleLinear()
  .domain([-1, 1])
  .range([height, 0]);

var line = d3.line()
  .x(function(d, i) { return x(i); })
  .y(function(d, i) { return y(d); });

g.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", width)
  .attr("height", height);

g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + y(0) + ")")
  .call(d3.axisBottom(x));

g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y));

g.append("g")
  .attr("clip-path", "url(#clip)")
  .append("path")
  .datum(data)
  .attr("class", "line")
  .transition()
  .duration(500)
  .ease(d3.easeLinear)
  .on("start", tick);

  function tick() {

    // Push a new data point onto the back.
    for (let i = 0; i < 40; i++) {
      data[i] = denque.shift();
    }
  
    // Redraw the line.
    d3.select(this)
        .attr("d", line)
        .attr("transform", null);
  
    // Slide it to the left.
    d3.active(this)
        .attr("transform", "translate(" + x(-1) + ",0)")
      .transition()
        .duration(1000)
        .on("start", tick);
  
    // Pop the old data point off the front.
    //data.shift();
  
  }
  */

var data = [{
  x: [0],
  y: [0],
  mode: 'lines',
  line: {
    color: '#80CAF6'
  }
}];

Plotly.plot('graph', data);



function startGraph() {
  var cnt = 0;
  var interval = setInterval(() => {
    if (!(denque.isEmpty())) {
      const newpoint = denque.shift();
      const time = newpoint.time;
      const val = newpoint.imu1.gyroX;
      console.log(time);
      var update = {
        x: [
          [time]
        ],
        y: [
          [val]
        ]
      };

      var olderTime = time.setSeconds(time.getSeconds() - 1);
      var futureTime = time.setSeconds(time.getSeconds() + 1);

      var minuteView = {
        xaxis: {
          type: 'date',
          range: [olderTime, futureTime]
        }
      };

      Plotly.relayout('graph', minuteView);
      Plotly.extendTraces('graph', update, [0]);

      if (cnt === 100) clearInterval(interval);
    }
  }, 10);
}

function analyzeData() {
  console.log(this.data);
}

function handleConnect() {
  connectDevice();
}

function handleDisconnect() {
  disconnectDevice();
}

function handleStartAcceptingData() {
  startGraph();
  startDataReception();
}

function handleStopAcceptingData() {
  stopDataReception();
}

function handleClearData() {
  data = [];
}

// todo: connect these functions to buttons

// handle data like: socket.onmessage = (event) => {

function connectDevice() {
  // construct connect message object
  const message = {
    type: "connect"
  };
  console.log('sending following connect message to backend:');
  console.log(message);
  // send message as a JSON-formatted string
  socket.send(JSON.stringify(message));
}

function disconnectDevice() {
  // construct disconnect message object
  const message = {
    type: "disconnect"
  };
  console.log('sending following disconnect message to backend:');
  console.log(message);
  // send message as a JSON-formatted string
  socket.send(JSON.stringify(message));
}

function startDataReception() {
  // construct start message object
  const message = {
    type: "start"
  };
  console.log('sending following start message to backend:');
  console.log(message);
  // send message as a JSON-formatted string
  socket.send(JSON.stringify(message));
}

function stopDataReception() {
  // construct stop message object
  const message = {
    type: "stop"
  };
  console.log('sending following stop message to backend:');
  console.log(message);
  // send message as a JSON-formatted string
  socket.send(JSON.stringify(message));
}

document.getElementById("connect-button").addEventListener("click", handleConnect);
document.getElementById("disconnect-button").addEventListener("click", handleDisconnect);
document.getElementById("start-button").addEventListener("click", handleStartAcceptingData);
document.getElementById("stop-button").addEventListener("click", handleStopAcceptingData);
document.getElementById("analyze-button").addEventListener("click", analyzeData);
document.getElementById("clear-button").addEventListener("click", handleClearData);

socket.onmessage = (event) => {
  // TODO: handle responses from server
  // TODO: responses include data, errors with connection, and general updates
  const message = JSON.parse(event.data);
  // console.log(message);
  // this.setState({message});
  switch (message.type) {
    case 'data':
      // TODO: handle data (append to structure or whatever)
      // console.log(message.data.timestamp);
      // message.data.timestamp = new Date(message.data.timestamp);
      message.data.time = new Date(message.data.timestamp);
      denque.push(message.data);
      // console.log(message.data.time);
      break;
    case 'error':
      // TODO: handle other error
      console.log(message.data);
      // TODO: fix sending stop message on backend, just update state
      handleStopAcceptingData();
      break;
    case 'status':
      // handle status updates
      console.log(message.data);
      break;
    default:
      console.log('Client received unknown message type', message.type, 'from the server');
      console.log(message);
  }
};