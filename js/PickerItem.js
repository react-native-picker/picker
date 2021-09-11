/**
 * Copyright (c) Nicolas Gallagher.
 *
 * @flow
 *
 */

import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';

import * as React from 'react';

type Props = {
  color?: ColorValue,
  label: string,
  testID?: string,
  value?: number | string,
};

const createElement =
  require('react-native-web').createElement ||
  require('react-native-web').unstable_createElement;

const Option = (props: any) => createElement('option', props);

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
