const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const root = path.resolve(__dirname, '..');

const escape = (str) => str.replace(/[/\\]/g, '[/\\\\]');

// With yarn workspaces, some deps are hoisted to the root node_modules.
// We need to tell metro where to find them.
const resolveModule = (name) => {
  try {
    return path.dirname(require.resolve(`${name}/package.json`));
  } catch {
    return path.resolve(__dirname, 'node_modules', name);
  }
};

const reactPath = resolveModule('react');
const reactNativePath = resolveModule('react-native');
const reactNativeMacosPath = resolveModule('react-native-macos');

const config = {
  projectRoot: __dirname,
  watchFolders: [root],
  resolver: {
    // Ensure consistent module resolution
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(root, 'node_modules'),
    ],
    extraNodeModules: {
      react: reactPath,
      'react-native': reactNativePath,
      'react-native-macos': reactNativeMacosPath,
    },
    blockList: [
      // Block the parent repo's copies to avoid duplicates
      // Only block if they differ from the resolved paths
      ...(reactNativePath !== path.resolve(root, 'node_modules', 'react-native')
        ? [
            new RegExp(
              escape(path.resolve(root, 'node_modules', 'react-native')) +
                '[/\\\\].*',
            ),
          ]
        : []),
      ...(reactNativeMacosPath !==
      path.resolve(root, 'node_modules', 'react-native-macos')
        ? [
            new RegExp(
              escape(path.resolve(root, 'node_modules', 'react-native-macos')) +
                '[/\\\\].*',
            ),
          ]
        : []),
      // Block other example directories
      new RegExp(escape(path.resolve(root, 'example-macos')) + '[/\\\\].*'),
      new RegExp(escape(path.resolve(root, 'FabricExample')) + '[/\\\\].*'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
