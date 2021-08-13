/* jshint node: true */
'use strict';

module.exports = {
  name: '@upsilon/ember-range-slider',
  included: function(app) {
    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/hammerjs/hammer.js');
    }
  }
};
