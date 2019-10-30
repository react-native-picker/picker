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

import type {SyntheticEvent} from 'CoreEventTypes';
import type {TextStyleProp} from 'StyleSheet';
import type {NativeComponent} from 'ReactNative';

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
|}>;

type Label = Stringish | number;

type RNCPickerIOSType = Class<
  NativeComponent<
    $ReadOnly<{|
      items: $ReadOnlyArray<RNCPickerIOSTypeItemType>,
      onChange: (event: PickerIOSChangeEvent) => void,
      selectedIndex: number,
      style?: ?TextStyleProp,
      testID?: ?string,
    |}>,
  >,
>;

module.exports = ((requireNativeComponent('RNCPicker'): any): RNCPickerIOSType);
