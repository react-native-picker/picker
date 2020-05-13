/**
 * @flow
 * @format
 */

import React from 'react';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import {StyleSheet} from 'react-native';
import PickerItem from './PickerItem';
import {forwardRef, useRef} from 'react';

type PickerProps = {
  ...ViewProps,
  children?: typeof PickerItem | Array<typeof PickerItem>,
  enabled?: boolean,
  onValueChange?: (number | string, number) => void,
  selectedValue?: number | string,
  style?: ViewStyleProp,
  /* compat */
  itemStyle?: TextStyleProp,
  mode?: string,
  prompt?: string,
};

const Picker = forwardRef<PickerProps, *>((props, forwardedRef) => {
  const {
    enabled,
    onValueChange,
    selectedValue,
    style,
    testID,
    itemStyle,
    mode,
    prompt,
    ...other
  } = props;

  const hostRef = useRef(null);

  function handleChange(e: Object) {
    const {selectedIndex, value} = e.target;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }

  return (
    // $FlowFixMe
    <select
      disabled={enabled === false ? true : undefined}
      onChange={handleChange}
      ref={hostRef}
      style={StyleSheet.flatten([styles.initial, style])}
      testid={testID}
      value={selectedValue}
      {...other}
    />
  );
});

// $FlowFixMe
Picker.Item = PickerItem;

const styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    margin: 0,
  },
});

export default Picker;
