/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import * as React from 'react';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
import type {
  BubblingEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import type {ProcessedColorValue} from 'react-native/Libraries/StyleSheet/processColor';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

type PickerIOSChangeEvent = $ReadOnly<{|
  newValue: string,
  newIndex: Int32,
|}>;

type RNCPickerIOSTypeItemType = $ReadOnly<{|
  label: ?string,
  value: ?string,
  textColor: ?ColorValue,
  testID: ?string,
|}>;

export type NativeProps = $ReadOnly<{|
  ...ViewProps,
  items: $ReadOnlyArray<RNCPickerIOSTypeItemType>,
  selectedIndex: Int32,
  selectionColor?: ?ProcessedColorValue,
  onChange: BubblingEventHandler<PickerIOSChangeEvent>,
  color?: ColorValue,
  textAlign?: string,
  numberOfLines?: Int32,
  fontSize?: Int32,
  fontWeight?: string,
  fontStyle?: string,
  fontFamily?: string,
  testID?: ?string,
  themeVariant?: ?string,

  // TODO: for some reason codegen does not create `fromRawValue` inline functions for
  // objects inside the `ReadOnlyArray` of items, so we need to explicitly define a prop
  // with this object so those functions are generated
  fakeProp?: RNCPickerIOSTypeItemType,
|}>;

type ComponentType = HostComponent<NativeProps>;

interface NativeCommands {
  +setNativeSelectedIndex: (
    viewRef: React.ElementRef<ComponentType>,
    selectedIndex: Int32,
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['setNativeSelectedIndex'],
});

export default (codegenNativeComponent<NativeProps>('RNCPicker', {
  excludedPlatforms: ['android'],
}): ComponentType);
