/**
 * The library ships platform-specific files (e.g. PickerAndroid.android.js),
 * and Jest resolves them for a single platform per run. Run the tests twice:
 * once resolving iOS files and once resolving Android files.
 */
const common = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/example/'],
};

module.exports = {
  projects: [
    {
      ...common,
      displayName: 'ios',
      testPathIgnorePatterns: ['/node_modules/', '\\.android\\.test\\.js$'],
    },
    {
      ...common,
      displayName: 'android',
      haste: {
        defaultPlatform: 'android',
        platforms: ['android', 'ios', 'native'],
      },
      testMatch: ['**/__tests__/**/*.android.test.js'],
    },
  ],
};
