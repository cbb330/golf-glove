'use strict';

module.exports = function(app) {
  const controller = require('./coachAppController');
  const wss = app.get('wss');

  wss.on('connection', socket => {
    console.log("Socket connected.");

    socket.on('message', (data) => {
      var msg = JSON.parse(data);
      console.log(msg.type);

      switch(msg.type) {
        case "scanOn":
          //controller.getDiscovers(socket);
          socket.send(JSON.stringify({ data: "hello" }));
          break;
        case "scanOff":
          break;
      }

    });

    socket.on('close', () => {
      // TODO: do this on the frontend
      console.log("WebSocket was closed");

    });
  });

  app.route('/hello')
    .get(controller.hello);

};
