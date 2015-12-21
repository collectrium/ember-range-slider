module.exports = {

  name: 'ember-mobiletouch',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
        { name: 'hammerjs', target: 'hammerjs/hammer.js#189098ff7736' }
      ];

    return this.addBowerPackagesToProject(bowerPackages);
  }


};
