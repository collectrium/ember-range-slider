/* jshint node: true */
"use strict";

const FASTBOOT_TRANSFORMATION_OPTION = {
  using: [
    {
      transformation: 'fastbootShim',
    },
  ],
};

module.exports = {
  name: "@upsilon/ember-range-slider",

  included(app) {
    this._super.included(app);

    let hasFastboot = this.project.findAddonByName('ember-cli-fastboot');
    let importOptions = hasFastboot ? FASTBOOT_TRANSFORMATION_OPTION : {};
    app.import(
      'node_modules/hammerjs/hammer.js',
      importOptions
    );
  },
};
