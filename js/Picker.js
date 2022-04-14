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
import {Platform} from 'react-native';

import PickerAndroid from './PickerAndroid';
import PickerIOS from './PickerIOS';
import PickerWindows from './PickerWindows';
import PickerMacOS from './PickerMacOS';

import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {Node} from 'react';

const MODE_DIALOG = 'dialog';
const MODE_DROPDOWN = 'dropdown';

type PickerItemProps = $ReadOnly<{|
  /**
   * Text to display for this item.
   */
  label: string,

  /**
   * The value to be passed to picker's `onValueChange` callback when
   * this item is selected. Can be a string or an integer.
   */
  value?: ?(number | string),

  /**
   * Color of this item's text.
   * @platform android
   */
  color?: ColorValue,

  /**
   * Used to locate the item in end-to-end tests.
   */
  testID?: string,
|}>;

/**
 * Individual selectable item in a Picker.
 */
class PickerItem extends React.Component<PickerItemProps> {
  render() {
    // The items are not rendered directly
    throw null;
  }
}

type PickerProps = $ReadOnly<{|
  children?: Node,
  style?: ?TextStyleProp,

  /**
   * Value matching value of one of the items. Can be a string or an integer.
   */
  selectedValue?: ?(number | string),

  /**
   * Callback for when an item is selected. This is called with the following parameters:
   *   - `itemValue`: the `value` prop of the item that was selected
   *   - `itemIndex`: the index of the selected item in this picker
   */
  onValueChange?: ?(itemValue: string | number, itemIndex: number) => mixed,

  /**
   * If set to false, the picker will be disabled, i.e. the user will not be able to make a
   * selection.
   * @platform android
   */
  enabled?: ?boolean,

  /**
   * On Android, specifies how to display the selection items when the user taps on the picker:
   *
   *   - 'dialog': Show a modal dialog. This is the default.
   *   - 'dropdown': Shows a dropdown anchored to the picker view
   *
   * @platform android
   */
  mode?: ?('dialog' | 'dropdown'),

  /**
   * Style to apply to each of the item labels.
   * @platform ios
   */
  itemStyle?: ?TextStyleProp,

  /**
   * Prompt string for this picker, used on Android in dialog mode as the title of the dialog.
   * @platform android
   */
  prompt?: ?string,

  /**
   * Placeholder string for this picker, used on Windows if no item has been selected.
   * @platform windows
   */
  placeholder?: ?string,

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: ?string,

  /**
   * On Android, used to truncate the text with an ellipsis after computing the text layout, including line wrapping,
   * such that the total number of lines does not exceed this number. Default is '1'
   * @platform android
   */
  numberOfLines?: ?number,

  /**
   * The string used for the accessibility label. Will be read once focused on the picker but not on change.
   */
  accessibilityLabel?: ?string,
|}>;

/**
 * Renders the native picker component on iOS and Android. Example:
 *
 *     <Picker
 *       selectedValue={this.state.language}
 *       onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
 *       <Picker.Item label="Java" value="java" />
 *       <Picker.Item label="JavaScript" value="js" />
 *     </Picker>
 */
class Picker extends React.Component<PickerProps> {
  pickerRef: React.ElementRef<any> = React.createRef();
  /**
   * On Android, display the options in a dialog.
   */
  static MODE_DIALOG: typeof MODE_DIALOG = MODE_DIALOG;

  /**
   * On Android, display the options in a dropdown (this is the default).
   */
  static MODE_DROPDOWN: typeof MODE_DROPDOWN = MODE_DROPDOWN;

  static Item: typeof PickerItem = PickerItem;

  static defaultProps: PickerProps = {
    mode: MODE_DIALOG,
  };

  blur: () => void = () => {
    this.pickerRef.current?.blur();
  };

  focus: () => void = () => {
    this.pickerRef.current?.focus();
  };

  render(): React.Node {
    if (Platform.OS === 'ios') {
      /* $FlowFixMe(>=0.81.0 site=react_native_ios_fb) This suppression was
       * added when renaming suppression sites. */
      return <PickerIOS {...this.props}>{this.props.children}</PickerIOS>;
    } else if (Platform.OS === 'macos') {
      /* $FlowFixMe(>=0.81.0 site=react_native_ios_fb) This suppression was
       * added when renaming suppression sites. */
      return <PickerMacOS {...this.props}>{this.props.children}</PickerMacOS>;
    } else if (Platform.OS === 'android') {
      return (
        /* $FlowFixMe(>=0.81.0 site=react_native_android_fb) This suppression
         * was added when renaming suppression sites. */
        <PickerAndroid ref={this.pickerRef} {...this.props}>
          {this.props.children}
        </PickerAndroid>
      );
    } else if (Platform.OS === 'windows') {
      return (
        <PickerWindows {...this.props}>{this.props.children}</PickerWindows>
      );
    } else {
      return null;
    }
  }
}

export default Picker;
