const path = require('path');
const {makeMetroConfig} = require('@rnx-kit/metro-config');
const pkg = require('../package.json');

const root = path.join(__dirname, '..');

module.exports = makeMetroConfig({
  watchFolders: [path.join(root, 'node_modules'), path.join(root, 'js')],
  resolver: {
    // The library is the root workspace, which Yarn does not link into
    // node_modules, so resolve it to its source entry point directly.
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === pkg.name) {
        return context.resolveRequest(
          context,
          path.join(root, pkg['react-native']),
          platform,
        );
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
