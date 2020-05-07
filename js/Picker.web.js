/**
 * @flow
 * @format
 */

import React from 'react';
import type {ViewStyleProp, TextStyleProp} from 'StyleSheet';
import type {ViewProps} from 'ViewPropTypes';
import {StyleSheet} from 'react-native';
import PickerItem from './PickerItem';
import {forwardRef, useRef} from 'react';

type PickerProps = {
  ...ViewProps,
  children?: PickerItem | Array<typeof PickerItem>,
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

Picker.Item = PickerItem;

const styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0,
  },
});

export default Picker;
