
#  `@react-native-picker/picker`



[![npm version](https://img.shields.io/npm/v/@react-native-picker/picker.svg)](https://www.npmjs.com/package/@react-native-picker/picker)
[![Build](https://github.com/react-native-picker/picker/workflows/Build/badge.svg)](https://github.com/react-native-picker/picker/actions) ![Supports Android, iOS, MacOS, and Windows](https://img.shields.io/badge/platforms-android%20|%20ios|%20macos|%20windows-lightgrey.svg) ![MIT License](https://img.shields.io/npm/l/@react-native-picker/picker.svg) [![Lean Core Extracted](https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg)](https://github.com/facebook/react-native/issues/23313)

| Android | iOS | PickerIOS | Windows | MacOS |
| --- | --- | --- | --- | --- |
| <img src="./screenshots/picker-android.png" width="150"> | <img src="./screenshots/picker-ios.png" width="150"> | <img src="./screenshots/pickerios-ios.png" width="150"> | <img src="./screenshots/picker-windows.png" width="300"> | <img src="./screenshots/picker-macos.png" width="300">

## Supported Versions

| @react-native-picker/picker | react-native | react-native-windows |
| --- | --- | --- |
| >= 2.0.0 | 0.61+ | 0.64+ |
| >= 1.16.0 | 0.61+ | 0.61+ |
| >= 1.2.0 | 0.60+ or 0.59+ with [Jetifier](https://www.npmjs.com/package/jetifier) | N/A |
| >= 1.0.0 | 0.57 | N/A |

## For Managed Workflow users using Expo 37
This component is not supported in the managed workflow for expo sdk 37. Please import the `Picker` from `react-native`.
See more info [here](https://github.com/react-native-picker/picker/issues/45#issuecomment-633163973)
   
## Getting started

`$ npm install @react-native-picker/picker --save`

or

`$ yarn add @react-native-picker/picker`

### For React Native v0.60 and above (Autolinking)

As [react-native@0.60](https://reactnative.dev/blog/2019/07/03/version-60) and above supports autolinking there is no need to run the linking process. 
Read more about autolinking [here](https://github.com/react-native-picker/cli/blob/master/docs/autolinking.md). This is supported by `react-native-windows@0.64` and above. 

#### iOS
CocoaPods on iOS needs this extra step:

```
npx pod-install
```

#### Android
No additional step is required.

<details>
<summary>Windows (expand for details)</summary>

#### Windows
Usage in Windows without autolinking requires the following extra steps:

##### Add the `ReactNativePicker` project to your solution.

1. Open the solution in Visual Studio 2019
2. Right-click Solution icon in Solution Explorer > Add > Existing Project
   Select `D:\dev\RNTest\node_modules\@react-native-picker\picker\windows\ReactNativePicker\ReactNativePicker.vcxproj`

##### **windows/myapp.sln**
Add a reference to `ReactNativePicker` to your main application project. From Visual Studio 2019:

Right-click main application project > Add > Reference...
  Check `ReactNativePicker` from Solution Projects.

##### **app.cpp**
Add `#include "winrt/ReactNativePicker.h"` to the headers included at the top of the file.

Add `PackageProviders().Append(winrt::ReactNativePicker::ReactPackageProvider());` before `InitializeComponent();`.
</details>

#### MacOS
CocoaPods on MacOS needs this extra step (called from the MacOS directory)

```
pod install
```


<details>
   <summary>React Native below 0.60 (Link and Manual Installation)</summary>

The following steps are only necessary if you are working with a version of React Native lower than 0.60
### Mostly automatic installation

`$ react-native link @react-native-picker/picker`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ ` @react-native-picker/picker` and add `RNCPicker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCPicker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open **application** file (`android/app/src/main/java/[...]/MainApplication.java`)
  - Add `import com.reactnativecommunity.picker.RNCPickerPackage;` to the imports at the top of the file
  - Add `new RNCPickerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':@react-native-picker_picker'
  	project(':@react-native-picker_picker').projectDir = new File(rootProject.projectDir, 	'../node_modules/@react-native-picker/picker/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      implementation project(path: ':@react-native-picker_picker')
  	```
#### MacOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ ` @react-native-picker/picker` and add `RNCPicker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCPicker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<
</details>

## RTL Support

you need to add `android:supportsRtl="true"` to `AndroidManifest.xml`
```xml
   <application
      ...
      android:supportsRtl="true">
```

## Usage

Import Picker from `@react-native-picker/picker`:

```javascript
import {Picker} from '@react-native-picker/picker';
```

Create state which will be used by the `Picker`:

```javascript
const [selectedLanguage, setSelectedLanguage] = useState();
```

Add `Picker` like this:

```javascript
<Picker
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
```

If you want to open/close picker programmatically on android (available from version 1.16.0+), pass ref to `Picker`:

```javascript
const pickerRef = useRef();

function open() {
  pickerRef.current.focus();
}

function close() {
  pickerRef.current.blur();
}

return <Picker
  ref={pickerRef}
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
```

### Props

* [Inherited `View` props...](https://reactnative.dev/docs/view#props)

- [`onValueChange`](#onvaluechange)
- [`selectedValue`](#selectedvalue)
- [`style`](#style)
- [`testID`](#testid)
- [`enabled`](#enabled)
- [`mode`](#mode)
- [`prompt`](#prompt)
- [`itemStyle`](#itemstyle)
- [`selectionColor`](#selectionColor)

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
| bool | No       | Android, Web,  Windows  |

---

### `mode`

On Android, specifies how to display the selection items when the user taps on the picker:

* 'dialog': Show a modal dialog. This is the default.
* 'dropdown': Shows a dropdown anchored to the picker view

| Type                       | Required | Platform |
| -------------------------- | -------- | -------- |
| enum('dialog', 'dropdown') | No       | Android  |

---

### `dropdownIconColor`

On Android, specifies color of dropdown triangle. Input value should be value that is accepted by react-native `processColor` function.

| Type       | Required | Platform |
| ---------- | -------- | -------- |
| ColorValue | No       | Android  |

---

### `dropdownIconRippleColor`

On Android, specifies ripple color of dropdown triangle. Input value should be value that is accepted by react-native `processColor` function.

| Type       | Required | Platform |
| ---------- | -------- | -------- |
| ColorValue | No       | Android  |

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
| [text styles](https://reactnative.dev/docs/text-style-props) | No       | iOS, Windows      |

### `numberOfLines`

On Android & iOS, used to truncate the text with an ellipsis after computing the text layout, including line wrapping,
such that the total number of lines does not exceed this number. Default is '1'

| Type    | Required | Platform |
| ------- | -------- | -------- |
| number  | No       | Android, iOS  |

### `onBlur`

| Type      | Required | Platform |
| --------- | -------- | -------- |
| function  | no       | Android  |

### `onFocus`

| Type      | Required | Platform |
| --------- | -------- | -------- |
| function  | no       | Android  |

### `selectionColor`

| Type      | Required | Platform |
| ------- | -------- | -------- |
| ColorValue  | no       | iOS  |

## Methods

### `blur` (Android only, lib version 1.16.0+)

Programmatically closes picker

### `focus` (Android only, lib version 1.16.0+)

Programmatically opens picker

## PickerItemProps

Props that can be applied to individual `Picker.Item`

### `label`

Displayed value on the Picker Item

| Type    | Required | 
| ------- | -------- | 
| string  | yes       | 


### `value`

Actual value on the Picker Item

| Type    | Required |
| ------- | -------- |
| number,string | yes     |

### `color`

Displayed color on the Picker Item

| Type        | Required | 
| ----------- | -------- | 
| ColorValue  | no       | 


### `fontFamily`

Displayed fontFamily on the Picker Item

| Type    | Required |
| ------- | -------- |
| string  | no      | 


### `style`

Style to apply to individual item labels.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| ViewStyleProp  | no       | Android  |


### `enabled`

If set to false, the specific item will be disabled, i.e. the user will not be able to make a selection

@default: true

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean  | no       | Android  |


### `contentDescription`

Sets the content description to the Picker Item

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |


### PickerIOS
### Props

- [Inherited `View` props...](https://reactnative.dev/docs/view#props)
- [`itemStyle`](#itemstyle)
- [`onValueChange`](#onvaluechange)
- [`selectedValue`](#selectedvalue)
- [`selectionColor`](#selectionColor)
- [`themeVariant`](#themeVariant)

---

# Reference

## Props

### `itemStyle`

| Type                               | Required |
| ---------------------------------- | -------- |
| [text styles](https://reactnative.dev/docs/text-style-props) | No       |

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

---

### `selectionColor`

| Type      | Required | Platform |
| ------- | -------- | -------- |
| ColorValue  | no       | iOS  |

---

### `themeVariant`

| Type | Required |
| ---- | -------- |
|  enum('light', 'dark')  | No       |
