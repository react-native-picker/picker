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

export type PickerAndroidChangeEvent = $ReadOnly<{|
  position: Int32,
|}>;

export type PickerItem = $ReadOnly<{|
  label: string,
  value: ?string,
  color?: ColorValue,
  fontFamily: ?string,
  enabled?: ?boolean,
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  items: $ReadOnlyArray<PickerItem>,
  color?: ColorValue,
  prompt?: ?string,
  enabled?: ?boolean,
  selected: Int32,
  backgroundColor?: Int32,
  dropdownIconColor?: Int32,
  dropdownIconRippleColor?: Int32,
  numberOfLines?: ?Int32,
  onSelect?: BubblingEventHandler<PickerAndroidChangeEvent>,
|}>;

export default codegenNativeComponent<NativeProps>('RNCAndroidDialogPicker', {
  excludedPlatforms: ['iOS'],
  interfaceOnly: true,
});
