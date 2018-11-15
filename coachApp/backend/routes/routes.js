'use strict';
const Controller = require('./coachAppController');
const controller = new Controller();

module.exports = function(app) {
  const wss = app.get('wss');

  wss.on('connection', socket => {
    console.log("Socket connected at port: " + wss.options.port);
    // dont create new controller object on new websocket, instead set socket again like below
    // hardware doesn't work with multiple noble bindings
    controller.setSocket(socket);

    socket.on('message', (data) => {
      try {
        var msg = JSON.parse(data);
      }
      catch(err) {
        socket.send(JSON.stringify({ err: err }));
        return;
      }
      console.log("Recieved message: " + msg.type);

      switch(msg.type) {
        case "scanAndConnect":
          controller.getDiscovers();
          break;
        case "disconnect":
          controller.disconnectPeripheral();
          break;
      }

    });

    socket.on('close', () => {
      // TODO: do this on the frontend
      // TODO: test if fully closed down noble adapter
      // todo: figure out if this is the best way to close both socket in ./routes and ./controller
      if (socket.isAlive === false) {
        socket.terminate();
        console.log("Socket terminated.");
        controller.socket.terminate();
      }
      controller.disconnectPeripheral();
    });
  });
};
