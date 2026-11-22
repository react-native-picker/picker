module.exports = {
  extends: '@react-native',
  overrides: [
    {
      // @react-native/babel-preset parses @flow files with hermes-parser, whose
      // output @babel/eslint-parser cannot convert. ESLint only needs to parse
      // the syntax, so give it the Flow and JSX syntax plugins instead of the
      // project's Babel config.
      files: ['*.js', '*.jsx'],
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          plugins: ['@babel/plugin-syntax-flow', '@babel/plugin-syntax-jsx'],
        },
      },
    },
  ],
};
