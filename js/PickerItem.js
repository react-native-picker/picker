/**
 * Copyright (c) Nicolas Gallagher.
 *
 * @flow
 *
 */

import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';

import * as React from 'react';
import * as ReactNativeWeb from 'react-native-web';

type Props = {
  color?: ColorValue,
  label: string,
  testID?: string,
  enabled?: Boolean,
  value?: number | string,
};

const Option = (props: any) =>
  ReactNativeWeb.unstable_createElement('option', props);

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
