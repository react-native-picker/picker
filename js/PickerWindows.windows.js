/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 *
 * @flow strict-local
 */

'use strict';

import React from 'react';
import {processColor, requireNativeComponent, StyleSheet} from 'react-native';

import type {SyntheticEvent} from 'CoreEventTypes';
import type {TextStyleProp} from 'StyleSheet';

const RNCPicker = requireNativeComponent('RNCPicker');

type PickerWindowsChangeEvent = SyntheticEvent<
  $ReadOnly<{|
    nativeEvent: {
      value: any,
      itemIndex: number,
      text: string,
    },
  |}>,
>;

type PickerWindowsProps = $ReadOnly<{|
  children?: React.Node,
  style?: ?TextStyleProp,
  selectedValue?: any,
  enabled?: boolean,
  prompt?: string,
  testID?: string,
  onChange?: (event: IPickerChangeEvent) => void,
  onValueChange?: (value: any, itemIndex: number, text: string) => void,
  // Editable support
  editable?: boolean,
  text?: string,
|}>;

type Item = $ReadOnly<{|
  label: string,
  value?: any,
  color?: string,
  testID?: string,
|}>;

type PickerWindowsState = {|
  selectedIndex: number,
  items: $ReadOnlyArray<Item>,
|};

/**
 * Not exposed as a public API - use <Picker> instead.
 */

class PickerWindows extends React.Component<
  PickerWindowsProps,
  PickerWindowsState,
> {
  static getDerivedStateFromProps(
    props: PickerWindowsProps,
  ): PickerWindowsState {
    let selectedIndex = -1;
    const items: Item[] = [];
    React.Children.toArray(props.children).forEach(
      (c: React.ReactNode, index: number) => {
        const child = (c: Item);
        if (child.props.value === props.selectedValue) {
          selectedIndex = index;
        }
        items.push({
          value: child.props.value,
          label: child.props.label,
          textColor: processColor(child.props.color),
        });
      },
    );
    return {selectedIndex, items};
  }

  state = PickerWindows.getDerivedStateFromProps(this.props);

  render() {
    const nativeProps = {
      enabled: this.props.enabled,
      items: this.state.items,
      onChange: this._onChange,
      selectedIndex: this.state.selectedIndex,
      testID: this.props.testID,
      style: [styles.pickerWindows, this.props.style, this.props.itemStyle],
    };

    return (
      <RNCPicker
        ref={this._setRef}
        {...nativeProps}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
      />
    );
  }

  _setRef = (comboBox: PickerWindows) => {
    this._picker = comboBox;
  };

  _onChange = (event: PickerWindowsChangeEvent) => {
    if (this._picker) {
      this._picker.setNativeProps({
        selectedIndex: this.state.selectedIndex,
        text: this.props.text,
      });
    }

    this.props.onChange && this.props.onChange(event);
    this.props.onValueChange &&
      this.props.onValueChange(
        event.nativeEvent.value,
        event.nativeEvent.itemIndex,
        event.nativeEvent.text,
      );
  };
}

const styles = StyleSheet.create({
  pickerWindows: {
    height: 32,
  },
});

export default PickerWindows;
