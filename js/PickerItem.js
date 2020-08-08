/**
 * Copyright (c) Nicolas Gallagher.
 *
 * @flow
 * @format
 */

import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
// $FlowFixMe
import {createElement} from 'react-native';

import * as React from 'react';

type Props = {
  color?: ColorValue,
  label: string,
  testID?: string,
  value?: number | string,
};

const Option = (props: any) => createElement('option', props);

export default function PickerItem({color, label, testID, value}: Props) {
  return (
    <Option style={{color}} testID={testID} value={value} label={label}>
      {label}
    </Option>
  );
}
