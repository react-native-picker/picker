const path = require('path');
const pkg = require('../package.json');

const project = (() => {
  try {
    const {configureProjects} = require('react-native-test-app');
    return configureProjects({
      android: {
        sourceDir: 'android',
      },
      ios: {
        sourceDir: 'ios',
      },
      macos: {
        sourceDir: 'macos',
      },
      windows: {
        sourceDir: 'windows',
        solutionFile: 'windows/Example.sln',
      },
    });
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? {project} : undefined),
  dependencies: {
    // The library lives in the parent directory and is not symlinked into
    // node_modules, so point autolinking at it explicitly.
    [pkg.name]: {
      root: path.join(__dirname, '..'),
    },
  },
};
