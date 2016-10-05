module.exports = {

  name: 'ember-range-slider',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
        { name: 'hammerjs', target: 'hammerjs/hammer.js#189098ff7736' }
      ];

    return this.addBowerPackagesToProject(bowerPackages);
  }


};
