/**
 * Copyright (c) Nicolas Gallagher.
 *
 * @flow
 * @format
 */

import React from 'react';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
// $FlowFixMe
import {createElement} from 'react-native';
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

const Select = (props: any) => createElement('select', props);

const Picker = forwardRef<PickerProps, *>((props, forwardedRef) => {
  const {
    enabled,
    onValueChange,
    selectedValue,
    itemStyle,
    mode,
    prompt,
    ...other
  } = props;

  const hostRef = useRef(null);

  const handleChange = React.useCallback<any>(
    (e: Object) => {
      const {selectedIndex, value} = e.target;
      if (onValueChange) {
        onValueChange(value, selectedIndex);
      }
    },
    [onValueChange],
  );

  return (
    // $FlowFixMe
    <Select
      disabled={enabled === false ? true : undefined}
      onChange={handleChange}
      ref={hostRef}
      value={selectedValue}
      {...other}
    />
  );
});

// $FlowFixMe
Picker.Item = PickerItem;

export default Picker;
