/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 *
 * @format
 * @flow
 */

'use strict';

import * as React from 'react';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
import type {UnsafeMixed} from 'react-native/Libraries/Types/CodegenTypes';
import type {
  BubblingEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

type PickerWindowsChangeEvent = $ReadOnly<{|
  value: UnsafeMixed,
  itemIndex: Int32,
  text: string,
|}>;

type PickerWindowsItemType = $ReadOnly<{|
  label: string,
  value: ?UnsafeMixed,
  textColor: ?ColorValue,
  testID: ?string,
|}>;

export type NativeProps = $ReadOnly<{|
  ...ViewProps,
  items: $ReadOnlyArray<PickerWindowsItemType>,
  selectedIndex: Int32,
  // onChange: BubblingEventHandler<PickerWindowsChangeEvent>,
  enabled?: ?boolean,
  placeholder?: ?string,
  testID?: ?string,
  accessibilityLabel?: ?string,

  // TODO: for some reason codegen does not create `fromRawValue` inline functions for
  // objects inside the `ReadOnlyArray` of items, so we need to explicitly define a prop
  // with this object so those functions are generated
  // fakeProp?: PickerWindowsItemType,
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

export default (codegenNativeComponent<NativeProps>('RNCPickerWindows', {
  excludedPlatforms: ['android', 'iOS'],
}): ComponentType);
