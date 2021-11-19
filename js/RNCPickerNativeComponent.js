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

import {requireNativeComponent} from 'react-native';

import type {SyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

type PickerIOSChangeEvent = SyntheticEvent<
  $ReadOnly<{|
    newValue: number | string,
    newIndex: number,
  |}>,
>;

type RNCPickerIOSTypeItemType = $ReadOnly<{|
  label: ?Label,
  value: ?(number | string),
  textColor: ?number,
  testID: ?string,
|}>;

type Label = Stringish | number;

export type RNCPickerIOSType = HostComponent<
  $ReadOnly<{|
    items: $ReadOnlyArray<RNCPickerIOSTypeItemType>,
    onChange: (event: PickerIOSChangeEvent) => void,
    selectedIndex: number,
    style?: ?TextStyleProp,
    testID?: ?string,
    numberOfLines?: ?number,
    themeVariant?: ?string,
  |}>,
>;

module.exports = ((requireNativeComponent('RNCPicker'): any): RNCPickerIOSType);
