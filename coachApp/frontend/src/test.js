const Denque = require('denque');
const denque = new Denque();
const Plotly = require('plotly.js-dist');
const socket = new WebSocket("ws://localhost:8000");

// inits array container for each XYZ graph
function initXYZGraph(x_axis_num, y_axis_num, name) {
  str_xaxis = (x_axis_num === undefined) ? "x" : "x" + x_axis_num.toString();
  str_yaxis = (y_axis_num === undefined) ? "y" : "y" + y_axis_num.toString();

  var x = {
    x: [0],
    y: [0],
    name: name + 'x',
    xaxis: str_xaxis,
    yaxis: str_yaxis,
    mode: 'line'
  };

  var y = {
    x: [0],
    y: [0],
    xaxis: str_xaxis,
    yaxis: str_yaxis,
    name: name + 'y',
    mode: 'line'
  };

  var z = {
    x: [0],
    y: [0],
    xaxis: str_xaxis,
    yaxis: str_yaxis,
    name: name + 'z',
    mode: 'line'
  };

  return [x, y, z];
}

// inits graph for single source graphs
function initGraph(x_axis_num, y_axis_num, name) {
  str_xaxis = (x_axis_num === undefined) ? "x" : "x" + x_axis_num.toString();
  str_yaxis = (y_axis_num === undefined) ? "y" : "y" + y_axis_num.toString();

  var trace = {
    x: [0],
    y: [0],
    name: name,
    xaxis: str_xaxis,
    yaxis: str_yaxis,
    mode: 'line'
  };

  return [trace];
}

// main loop for updating and filling in graph
function startGraph() {

  var cnt = 0;
  var interval = setInterval(() => {
    if (!(denque.isEmpty())) {
      const newpoint = denque.shift();
      const time = newpoint.time;
      const accel1X = newpoint.imu1.accelX;
      const accel1Y = newpoint.imu1.accelY;
      const accel1Z = newpoint.imu1.accelZ;
      const accel2X = newpoint.imu2.accelX;
      const accel2Y = newpoint.imu2.accelY;
      const accel2Z = newpoint.imu2.accelZ;
      const gyro1X = newpoint.imu1.gyroX;
      const gyro1Y = newpoint.imu1.gyroY;
      const gyro1Z = newpoint.imu1.gyroZ;
      const gyro2X = newpoint.imu2.gyroX;
      const gyro2Y = newpoint.imu2.gyroY;
      const gyro2Z = newpoint.imu2.gyroZ;
      const pressure1 = newpoint.pressure1;
      const pressure2 = newpoint.pressure2;
      const deflection = newpoint.deflection;
      const extension = newpoint.extension;
      const radialDeviation = newpoint.radialDeviation;
      const ulnarDeviation = newpoint.ulnarDeviation;

      var updatePlot = {
        x: [
          [time], [time], [time], [time], [time], [time], [time], [time], [time], [time], [time], [time], [time], [time], [time], [time], [time], [time]
        ],
        y: [
          [accel1X], [accel1Y], [accel1Z], [accel2X], [accel2Y], [accel2Z], [gyro1X], 
          [gyro1Y], [gyro1Z], [gyro2X], [gyro2Y], [gyro2Z], [pressure1], [pressure2], [deflection], [extension], [radialDeviation],
          [ulnarDeviation]
        ]
      };

      var olderTime = time.setSeconds(time.getSeconds() - 1);
      var futureTime = time.setSeconds(time.getSeconds() + 1);

      var minuteView = {
        xaxis: {
          type: 'date',
          range: [olderTime, futureTime]
        },
        xaxis2: {
          type: 'date',
          range: [olderTime, futureTime]
        }
      };

      Plotly.relayout('graph', minuteView);
      Plotly.extendTraces('graph', updatePlot, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
      t
      if (cnt === 100) clearInterval(interval);
    }
  }, 10);
}


var graph_array = []; 
graph_array = graph_array.concat(initXYZGraph(1,1, 'accel1')); // x,y starting from bottom and left to right
graph_array = graph_array.concat(initXYZGraph(2,1, 'accel2'));
graph_array = graph_array.concat(initXYZGraph(1,2, 'gyro1'));
graph_array = graph_array.concat(initXYZGraph(2,2, 'gyro2'));

graph_array = graph_array.concat(initGraph(1,3, 'pressure1'));
graph_array = graph_array.concat(initGraph(2,3, 'pressure2'));
graph_array = graph_array.concat(initGraph(1,4, 'deflection'));
graph_array = graph_array.concat(initGraph(2,4, 'extension'));
graph_array = graph_array.concat(initGraph(1,5, 'radialDeviation'));
graph_array = graph_array.concat(initGraph(2,5, 'ulnarDeviation'));

var layout = {
  autosize: false,
  width: 1800,
  height: 1000,
  grid: {
    rows: 5,
    columns: 2,
    roworder:'bottom to top'
  }
};


Plotly.plot('graph', graph_array, layout);

document.getElementById("connect-button").addEventListener("click", handleConnect);
document.getElementById("disconnect-button").addEventListener("click", handleDisconnect);
document.getElementById("start-button").addEventListener("click", handleStartAcceptingData);
document.getElementById("stop-button").addEventListener("click", handleStopAcceptingData);
document.getElementById("analyze-button").addEventListener("click", analyzeData);
document.getElementById("clear-button").addEventListener("click", handleClearData);


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
  denque.clear();
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
  //clear queue
  denque.clear();
  // send message as a JSON-formatted string
  socket.send(JSON.stringify(message));
}

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