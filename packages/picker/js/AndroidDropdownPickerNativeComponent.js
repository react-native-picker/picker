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

import * as React from 'react';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
import type {
  BubblingEventHandler,
  Double,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

export type PickerAndroidChangeEvent = $ReadOnly<{|
  position: Int32,
|}>;

export type PickerItemStyle = $ReadOnly<{|
  backgroundColor?: ?ColorValue,
  color?: ?ColorValue,
  fontSize?: ?Double,
  fontFamily?: ?string,
|}>;

export type PickerItem = $ReadOnly<{|
  label: string,
  value: ?string,
  color?: ColorValue,
  fontFamily: ?string,
  enabled?: ?boolean,
  style?: ?PickerItemStyle,
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
  onSelect?: BubblingEventHandler<PickerAndroidChangeEvent, 'topSelect'>,
  onFocus?: BubblingEventHandler<null, 'topFocus'>,
  onBlur?: BubblingEventHandler<null, 'topBlur'>,
|}>;

type ComponentType = HostComponent<NativeProps>;

interface NativeCommands {
  +focus: (viewRef: React.ElementRef<ComponentType>) => void;
  +blur: (viewRef: React.ElementRef<ComponentType>) => void;
  +setNativeSelected: (
    viewRef: React.ElementRef<ComponentType>,
    selected: Int32,
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['focus', 'blur', 'setNativeSelected'],
});

export default (codegenNativeComponent<NativeProps>(
  'RNCAndroidDropdownPicker',
  {
    excludedPlatforms: ['iOS'],
    interfaceOnly: true,
  },
): ComponentType);
