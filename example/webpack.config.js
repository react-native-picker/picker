const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const node_modules = path.resolve(__dirname, '..', 'node_modules');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.context = path.resolve(__dirname, '..');

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: /(js|example)\/.+/,
    exclude: /node_modules/,
    use: require.resolve('babel-loader'),
  });

  Object.assign(config.resolve.alias, {
    react: path.resolve(node_modules, 'react'),
    'react-native': path.resolve(node_modules, 'react-native-web'),
    'react-native-web': path.resolve(node_modules, 'react-native-web'),
    '@react-native-community/picker': path.resolve('../js'),
  });

  return config;
};
