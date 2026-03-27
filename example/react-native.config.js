const path = require('path');

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
      windows: {
        sourceDir: 'windows',
        solutionFile: 'PickerExample.sln',
      },
    });
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? {project} : undefined),
  dependencies: {
    '@react-native-picker/picker': {
      root: path.resolve(__dirname, '..'),
      platforms: {
        windows: {
          sourceDir: 'windows',
          solutionFile: 'Picker.sln',
          projects: [
            {
              projectFile: 'Picker\\Picker.vcxproj',
              projectName: 'Picker',
              projectLang: 'cpp',
              projectGuid: '{170F439F-1AC2-40F6-94D2-FB6511EDF052}',
              directDependency: true,
              cppHeaders: ['winrt/Picker.h'],
              cppPackageProviders: ['Picker::ReactPackageProvider'],
            },
          ],
        },
      },
    },
  },
};
