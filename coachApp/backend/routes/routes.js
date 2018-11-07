'use strict';
// these are in this file since they are specific to the route that controls websockets
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port : 8080 });

var controller = require('./coachAppController');

module.exports = function(app) {
  // coachApp Routes
  app.route('/')
      .get(controller.getDiscovers);

  app.route('/hello')
      .get(controller.hello);

};

//wss.on('connection', controller.getDiscovers(ws));
wss.on('connection', function (ws) {
  controller.getDiscovers(ws);
});