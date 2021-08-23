module.exports = {
  name: '@upsilon/ember-range-slider',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
        { name: 'hammerjs', target: '^2.0.8' }
      ];

    return this.addPackagesToProject(bowerPackages);
  }
};
