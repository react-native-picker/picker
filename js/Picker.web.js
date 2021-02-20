/**
 * Copyright (c) Nicolas Gallagher.
 *
 * @flow
 *
 */

import * as React from 'react';
import {forwardRef, useRef} from 'react';
import type {ViewProps} from 'react-native-web/src/exports/View/types';
import type {GenericStyleProp} from 'react-native-web/src/types';
import type {TextStyle} from 'react-native-web/src/exports/Text/types';
// $FlowFixMe fallback for older react-native-web versions
import {createElement, unstable_createElement} from 'react-native';
import PickerItem from './PickerItem';

type PickerProps = {
  ...ViewProps,
  children?: typeof PickerItem | Array<typeof PickerItem>,
  enabled?: boolean,
  onValueChange?: (number | string, number) => void,
  selectedValue?: number | string,
  /**
   * dropdownIconColor
   * Not used for Web.
   */
  dropdownIconColor?: string,
  /* compat */
  itemStyle?: GenericStyleProp<TextStyle>,
  mode?: string,
  prompt?: string,
};

const myCreateElement = createElement || unstable_createElement;

const Select = forwardRef((props: any, forwardedRef) =>
  myCreateElement('select', props),
);

const Picker: React$AbstractComponent<PickerProps, empty> = forwardRef<
  PickerProps,
  *,
>((props, forwardedRef) => {
  const {
    enabled,
    onValueChange,
    selectedValue,
    itemStyle,
    mode,
    prompt,
    dropdownIconColor,
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
