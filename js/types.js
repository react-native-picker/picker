/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */
import type {SyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

export type PickerAndroidChangeEvent = SyntheticEvent<
  $ReadOnly<{|
    position: number,
  |}>,
>;

export type PickerItem = $ReadOnly<{|
  label: string,
  value: ?(number | string),
  color?: ?number,
  contentDescription?: ?string,
  fontFamily: ?string,
  /**
   * Style to apply to individual item labels.
   * Only following values take effect:
   *   - 'color'
   *   - 'backgroundColor'
   *   - 'fontSize'
   *   - 'fontFamily'
   *
   * @platform android
   */
  style?: ?ViewStyleProp,
  /**
   * If set to false, the specific item will be disabled, i.e. the user will not be able to make a
   * selection.
   * @default true
   * @platform android
   */
  enabled?: ?boolean,
|}>;
