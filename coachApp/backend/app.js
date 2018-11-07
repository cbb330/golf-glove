const express = require('express');
const cors = require('cors');
const http = require('http');


const app = express();
const port = process.env.PORT || 4000;

const server = http.createServer(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

var controller = require('./routes/coachAppController');

io.on('connection', function (client) {
  controller.getDiscovers(client);
})

// // setup websocket server
// const ws = require('ws');
// const wss = new ws.Server({ port : 8080 });
// //wss.on('connection', controller.getDiscovers(ws));
// wss.on('connection', function (ws) {
//   controller.getDiscovers(ws);
// });

var routes = require('./routes/routes');
routes(app);

app.listen(port, function () {
  console.log('Server running on port ' + port);
});
