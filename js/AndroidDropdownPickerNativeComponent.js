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

import {requireNativeComponent} from 'react-native';

import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {NativeComponent} from 'react-native/Libraries/Renderer/shims/ReactNative';
import type {PickerAndroidChangeEvent, PickerItem} from './types';

type NativeProps = $ReadOnly<{|
  enabled?: ?boolean,
  items: $ReadOnlyArray<PickerItem>,
  mode?: ?('dialog' | 'dropdown'),
  onSelect?: (event: PickerAndroidChangeEvent) => void,
  selected: number,
  prompt?: ?string,
  testID?: string,
  style?: ?TextStyleProp,
  accessibilityLabel?: ?string,
  numberOfLines?: ?number,
|}>;

type DropdownPickerNativeType = Class<NativeComponent<NativeProps>>;

export default ((requireNativeComponent(
  'RNCAndroidDropdownPicker',
): any): DropdownPickerNativeType);
