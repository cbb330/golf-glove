'use strict';
const Controller = require('./coachAppController');

module.exports = function(app) {
  const wss = app.get('wss');

  wss.on('connection', socket => {
    console.log("Socket connected at port: " + wss.options.port);
    const controller = new Controller(socket);

    socket.on('message', (data) => {
      var msg = JSON.parse(data);
      console.log("Recieved message: " + msg.type);

      switch(msg.type) {
        case "scanAndConnect":
          controller.getDiscovers();
          break;
        case "disconnect":
          break;
      }

    });

    socket.on('close', () => {
      // TODO: do this on the frontend
      // TODO: close down noble adapter
      console.log("WebSocket was closed");

    });
  });
};
