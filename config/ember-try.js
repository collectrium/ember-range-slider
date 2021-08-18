/*jshint node:true*/

module.exports = function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: "default",
        dependencies: {},
      },
      {
        name: "2.13.3",
        dependencies: {
          ember: "2.13.3",
        },
      },
      {
        name: "2.16.2",
        dependencies: {
          ember: "2.16.2",
        },
      },
      {
        name: "ember-release",
        dependencies: {
          ember: "components/ember#release",
        },
        resolutions: {
          ember: "release",
        },
      },
      {
        name: "ember-beta",
        dependencies: {
          ember: "components/ember#beta",
        },
        resolutions: {
          ember: "beta",
        },
      },
      {
        name: "ember-canary",
        dependencies: {
          ember: "components/ember#canary",
        },
        resolutions: {
          ember: "canary",
        },
      },
    ],
  };
};
