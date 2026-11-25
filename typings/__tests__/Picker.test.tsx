// Type-only test, checked by `yarn validate:typescript`. It is never run.
import * as React from 'react';
import {Picker, PickerIOS} from '..';

export function NumericPicker(): React.JSX.Element {
  const [value, setValue] = React.useState<number>(10);
  return (
    <Picker<number>
      selectedValue={value}
      onValueChange={(itemValue: number, itemIndex: number) => {
        setValue(itemValue + itemIndex);
      }}>
      <Picker.Item label="Ten" value={10} />
      <Picker.Item label="Twenty" value={20} enabled={false} />
    </Picker>
  );
}

export function IOSPicker(): React.JSX.Element {
  return (
    <PickerIOS selectedValue="a">
      <PickerIOS.Item label="A" value="a" />
    </PickerIOS>
  );
}

export function RejectsUnknownItemProps(): React.JSX.Element {
  return (
    <Picker>
      {/* @ts-expect-error: `notAProp` is not a Picker.Item prop */}
      <Picker.Item label="A" value="a" notAProp />
    </Picker>
  );
}
