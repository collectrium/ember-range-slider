/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-range-slider',
  included: function(app) {
    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
  }
};
