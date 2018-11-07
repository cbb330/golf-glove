'use strict';
// these are in this file since they are specific to the route that controls websockets
var controller = require('./coachAppController');

module.exports = function(app) {
  // coachApp Routes
  app.route('/')
      .get(controller.getDiscovers);

  app.route('/hello')
      .get(controller.hello);

};

