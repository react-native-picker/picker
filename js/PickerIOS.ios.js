/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * This is a controlled component version of RNCPickerIOS
 *
 * @format
 * @flow
 */

'use strict';

import * as React from 'react';
import {processColor, StyleSheet, View} from 'react-native';
import RNCPickerNativeComponent from './RNCPickerNativeComponent';

import type {SyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {Element, ElementRef, ChildrenArray} from 'react';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

type PickerIOSChangeEvent = SyntheticEvent<
  $ReadOnly<{|
    newValue: number | string,
    newIndex: number,
  |}>,
>;

type RNCPickerIOSItemType = $ReadOnly<{|
  label: ?Label,
  value: ?(number | string),
  textColor: ?number,
  testID: ?string,
|}>;

type RNCPickerIOSType = HostComponent<
  $ReadOnly<{|
    items: $ReadOnlyArray<RNCPickerIOSItemType>,
    onChange: (event: PickerIOSChangeEvent) => void,
    selectedIndex: number,
    style?: ?TextStyleProp,
    testID?: ?string,
  |}>,
>;

type Label = Stringish | number;

type Props = $ReadOnly<{|
  ...ViewProps,
  children: ChildrenArray<Element<typeof PickerIOSItem>>,
  itemStyle?: ?TextStyleProp,
  onChange?: ?(event: PickerIOSChangeEvent) => mixed,
  onValueChange?: ?(itemValue: string | number, itemIndex: number) => mixed,
  selectedValue: ?(number | string),
|}>;

type State = {|
  selectedIndex: number,
  items: $ReadOnlyArray<RNCPickerIOSItemType>,
|};

type ItemProps = $ReadOnly<{|
  label: ?Label,
  value?: ?(number | string),
  color?: ?ColorValue,
  testID?: ?string,
|}>;

const PickerIOSItem = (props: ItemProps): null => {
  return null;
};

class PickerIOS extends React.Component<Props, State> {
  _picker: ?ElementRef<RNCPickerIOSType> = null;

  state: State = {
    selectedIndex: 0,
    items: [],
  };

  static Item: typeof PickerIOSItem = PickerIOSItem;

  static getDerivedStateFromProps(props: Props): State {
    let selectedIndex = 0;
    const items = [];
    React.Children.toArray(props.children).forEach(function (child, index) {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({
        value: child.props.value,
        label: child.props.label,
        textColor: processColor(child.props.color),
        testID: child.props.testID,
      });
    });
    return {selectedIndex, items};
  }

  render(): React.Node {
    return (
      <View style={this.props.style}>
        <RNCPickerNativeComponent
          ref={(picker) => {
            this._picker = picker;
          }}
          testID={this.props.testID}
          style={[styles.pickerIOS, this.props.itemStyle]}
          items={this.state.items}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
        />
      </View>
    );
  }

  _onChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (this.props.onValueChange) {
      this.props.onValueChange(
        event.nativeEvent.newValue,
        event.nativeEvent.newIndex,
      );
    }

    // The picker is a controlled component. This means we expect the
    // on*Change handlers to be in charge of updating our
    // `selectedValue` prop. That way they can also
    // disallow/undo/mutate the selection of certain values. In other
    // words, the embedder of this component should be the source of
    // truth, not the native component.
    if (
      this._picker &&
      this.state.selectedIndex !== event.nativeEvent.newIndex
    ) {
      this._picker.setNativeProps({
        selectedIndex: this.state.selectedIndex,
      });
    }
  };
}

const styles = StyleSheet.create({
  pickerIOS: {
    // The picker will conform to whatever width is given, but we do
    // have to set the component's height explicitly on the
    // surrounding view to ensure it gets rendered.
    height: 216,
  },
});

export default PickerIOS;
