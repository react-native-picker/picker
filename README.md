
#  `@react-native-community/picker`

[![CircleCI Status](https://img.shields.io/circleci/project/github/react-native-community/react-native-picker/master.svg)](https://circleci.com/gh/react-native-community/workflows/react-native-picker/tree/master) ![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg) ![MIT License](https://img.shields.io/npm/l/@react-native-community/picker.svg)

<img src="./screenshots/picker-android.png" width="150">
<img src="./screenshots/picker-ios.png" width="150">
<img src="./screenshots/pickerios-ios.png" width="150">

## Getting started

`$ npm install @react-native-community/picker --save`

### Mostly automatic installation

`$ react-native link @react-native-community/picker`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ ` @react-native-community/picker` and add `RNCPicker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCPicker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactnativecommunity.picker.RNCPickerPackage;` to the imports at the top of the file
  - Add `new RNCPickerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ': @react-native-community/picker'
  	project(': @react-native-community/picker').projectDir = new File(rootProject.projectDir, 	'../node_modules/ @react-native-community/picker/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(': @react-native-community/picker')
  	```


## Usage
### Picker

Renders the native picker component on iOS and Android. Example:

#### Usage

Import Picker from `@react-native-community/picker`

```javascript
import {Picker} from '@react-native-community/picker';
```

Create state which will be used by the `Picker`

```javascript
state = {
  language: 'java',
};
```

Add `Picker` like this:
```javascript
<Picker
  selectedValue={this.state.language}
  style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
```

### Props

* [Inherited `View` props...](https://facebook.github.io/react-native/docs/view#props)

- [`onValueChange`](#onvaluechange)
- [`selectedValue`](#selectedvalue)
- [`style`](#style)
- [`testID`](#testid)
- [`enabled`](#enabled)
- [`mode`](#mode)
- [`prompt`](#prompt)
- [`itemStyle`](#itemstyle)

---

# Reference

## Props

### `onValueChange`

Callback for when an item is selected. This is called with the following parameters:

* `itemValue`: the `value` prop of the item that was selected
* `itemPosition`: the index of the selected item in this picker

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `selectedValue`

Value matching value of one of the items. Can be a string or an integer.

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### `style`

| Type            | Required |
| --------------- | -------- |
| pickerStyleType | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `enabled`

If set to false, the picker will be disabled, i.e. the user will not be able to make a selection.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `mode`

On Android, specifies how to display the selection items when the user taps on the picker:

* 'dialog': Show a modal dialog. This is the default.
* 'dropdown': Shows a dropdown anchored to the picker view

| Type                       | Required | Platform |
| -------------------------- | -------- | -------- |
| enum('dialog', 'dropdown') | No       | Android  |

---

### `prompt`

Prompt string for this picker, used on Android in dialog mode as the title of the dialog.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `itemStyle`

Style to apply to each of the item labels.

| Type                               | Required | Platform |
| ---------------------------------- | -------- | -------- |
| [text styles](https://facebook.github.io/react-native/docs/text-style-props) | No       | iOS      |

### PickerIOS
### Props

* [Inherited `View` props...](https://facebook.github.io/react-native/docs/view#props)

- [`itemStyle`](#itemstyle)
- [`onValueChange`](#onvaluechange)
- [`selectedValue`](#selectedvalue)

---

# Reference

## Props

### `itemStyle`

| Type                               | Required |
| ---------------------------------- | -------- |
| [text styles](https://facebook.github.io/react-native/docs/text-style-props) | No       |

---

### `onValueChange`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `selectedValue`

| Type | Required |
| ---- | -------- |
| any  | No       |

  
