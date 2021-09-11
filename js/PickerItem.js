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
  enabled?: Boolean,
  value?: number | string,
};

const createElement =
  require('react-native-web').createElement ||
  require('react-native-web').unstable_createElement;

const Option = (props: any) => createElement('option', props);

/**
 * PickerItem Component for React Native Web
 * @returns
 */
export default function PickerItem({
  color,
  label,
  testID,
  value,
  enabled = true,
}: Props): React.Node {
  return (
    <Option
      disabled={enabled === false ? true : undefined}
      style={{color}}
      testID={testID}
      value={value}
      label={label}>
      {label}
    </Option>
  );
}
