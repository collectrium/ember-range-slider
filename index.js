/* jshint node: true */
"use strict";

module.exports = {
  name: "@upsilon/ember-range-slider",

  included(app) {
    if (typeof FastBoot !== 'undefined') {
      app.import('node_modules/hammerjs/hammer.js');
    }
  },
};
