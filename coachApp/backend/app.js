const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

routes(app);

const server = app.listen(port, function () {
  console.log('Server running on port ' + port);
});

// setup websockets
const io = require('socket.io').listen(server);
var controller = require('./routes/coachAppController');

io.on('connection', function (socket) {
  // controller.getDiscovers(socket);
  socket.emit('serverNews', { testNews: 'Wassup from websockets' });
  socket.on('clientNews', function (data) {
    console.log(data);
  });
})
