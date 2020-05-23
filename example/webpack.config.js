const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const root = path.resolve(__dirname, '..');
const node_modules = path.resolve(__dirname, 'node_modules');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: path.resolve('../js'),
    use: 'babel-loader',
  });

  Object.assign(config.resolve.alias, {
    react: path.join(node_modules, 'react'),
    'react-native-web': path.join(node_modules, 'react-native-web'),
    '@react-native-community/picker': path.join(
      root,
      require('../package.json').main,
    ),
  });

  return config;
};
