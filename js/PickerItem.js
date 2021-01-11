/**
 * Copyright (c) Nicolas Gallagher.
 *
 * @flow
 *
 */

import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

// $FlowFixMe
import {createElement, unstable_createElement} from 'react-native';

import * as React from 'react';

type Props = {
  color?: ColorValue,
  label: string,
  testID?: string,
  value?: number | string,
};

const myCreateElement = createElement || unstable_createElement;

const Option = (props: any) => myCreateElement('option', props);

export default function PickerItem({
  color,
  label,
  testID,
  value,
}: Props): React.Node {
  return (
    <Option style={{color}} testID={testID} value={value} label={label}>
      {label}
    </Option>
  );
}
