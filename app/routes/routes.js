'use strict';
module.exports = function(app) {
  var coachApp = require('./coachAppController');

  // coachApp Routes
  app.route('/scan')
    .get(coachApp.getDeviceInfo);
};
