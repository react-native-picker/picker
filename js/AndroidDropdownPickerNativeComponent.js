/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
import type {SyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

export type PickerAndroidChangeEvent = $ReadOnly<{|
  position: Int32,
|}>;

// export type PickerItem = $ReadOnly<{|
//   label: string,
//   value: ?string,
//   color?: ?Int32,
//   fontFamily: ?string,
//   /**
//    * Style to apply to individual item labels.
//    * Only following values take effect:
//    *   - 'color'
//    *   - 'backgroundColor'
//    *   - 'fontSize'
//    *   - 'fontFamily'
//    *
//    * @platform android
//    */
//   style?: ?ViewStyleProp,
//   /**
//    * If set to false, the specific item will be disabled, i.e. the user will not be able to make a
//    * selection.
//    * @default true
//    * @platform android
//    */
//   enabled?: ?boolean,
// |}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  enabled?: ?boolean,
  // items: $ReadOnlyArray<PickerItem>,
  mode?: ?string,
  onSelect?: BubblingEventHandler<PickerAndroidChangeEvent>,
  selected: Int32,
  prompt?: ?string,
  testID?: string,
  // style?: ?TextStyleProp,
  accessibilityLabel?: ?string,
  numberOfLines?: ?Int32,
|}>;

export default codegenNativeComponent<NativeProps>('RNCAndroidDropdownPicker', {
  excludedPlatforms: ['iOS'],
});
