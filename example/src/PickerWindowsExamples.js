import * as React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Item: any = Picker.Item;

function PlaceholderPickerExample() {
  return (
    <View>
      <Picker placeholder="Select a value">
        <Item label="hello" value="key0" />
        <Item label="world" value="key1" />
      </Picker>
    </View>
  );
}

export const examples = [
  {
    title: 'Picker with placeholder',
    render: PlaceholderPickerExample,
  },
];
