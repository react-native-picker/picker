/**
 * @flow
 * @format
 */

import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import * as React from 'react';

type Props = {
  color?: ColorValue,
  label: string,
  testID?: string,
  value?: number | string,
};

export default function PickerItem({color, label, testID, value}: Props) {
  const style = {color};
  return <option style={style} testid={testID} value={value} label={label} />;
}
