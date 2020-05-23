const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.context = path.resolve(__dirname, '..');

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: /(js|example)\/.+/,
    exclude: /node_modules/,
    use: require.resolve('babel-loader'),
  });

  return config;
};
