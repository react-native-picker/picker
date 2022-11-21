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
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
import type {SyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

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

interface NativeCommands {
  +focus: (viewRef: React.ElementRef<ComponentType>) => void;
  +blur: (viewRef: React.ElementRef<ComponentType>) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['focus', 'blur'],
});

export default codegenNativeComponent<NativeProps>('RNCAndroidDropdownPicker', {
  excludedPlatforms: ['iOS'],
  interfaceOnly: true,
});
