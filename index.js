/* jshint node: true */
'use strict';

module.exports = {
  name: '@upsilon/ember-range-slider',
  included: function(app) {
    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('node_modules/' + 'hammerjs/hammer.js');
    }
  }
};
