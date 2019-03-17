
# react-native-picker

## Getting started

`$ npm install react-native-picker --save`

### Mostly automatic installation

`$ react-native link react-native-picker`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-picker` and add `RNCPicker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCPicker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactnativecommunity.picker.RNCPickerPackage;` to the imports at the top of the file
  - Add `new RNCPickerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-picker'
  	project(':react-native-picker').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-picker/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-picker')
  	```


## Usage
```javascript
import RNCPicker from 'react-native-picker';

// TODO: What to do with the module?
RNCPicker;
```
  