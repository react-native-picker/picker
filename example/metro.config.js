const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const root = path.resolve(__dirname, '..');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [root],
  resolver: {
    // Ensure .ts and .tsx files are resolved (for Windows-specific TypeScript files)
    sourceExts: [...defaultConfig.resolver.sourceExts, 'ts', 'tsx'],
    // Add 'windows' to platform extensions so Metro resolves .windows.ts/.windows.js files
    platforms: [...(defaultConfig.resolver.platforms || []), 'windows'],
    // Make sure Metro can resolve the picker package from the parent folder
    extraNodeModules: {
      '@react-native-picker/picker': root,
    },
    // Block duplicate react-native packages
    blockList: [
      new RegExp(`${root.replace(/[/\\]/g, '[/\\\\]')}/node_modules/react-native/.*`),
    ],
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(root, 'node_modules'),
    ],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(defaultConfig, config);
