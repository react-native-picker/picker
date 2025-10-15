/**
 * Copyright (c) Nicolas Gallagher.
 *
 * @flow
 *
 */

import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';

import * as React from 'react';
import * as ReactNativeWeb from 'react-native-web';

const preserveSpaces = (label: string) => {
  return label.replace(/ /g, '\u00a0');
};

type Props = {
  color?: ColorValue,
  label: string,
  testID?: string,
  enabled?: boolean,
  value?: number | string,
  preserveSpacesInLabel?: boolean,
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
  preserveSpacesInLabel = false,
}: Props): React.Node {
  const pickerLabel = preserveSpacesInLabel ? preserveSpaces(label) : label;

  return (
    <Option
      disabled={enabled === false ? true : undefined}
      style={{color}}
      testID={testID}
      value={value}
      label={pickerLabel}>
      {pickerLabel}
    </Option>
  );
}
