'use strict';

module.exports = function(app) {
  const controller = require('./coachAppController');
  const wss = app.get('wss');
  
  // coachApp Routes
  wss.on('connection', function(socket) {
    controller.getDiscovers(socket);
  });

  app.route('/hello')
      .get(controller.hello);

};

