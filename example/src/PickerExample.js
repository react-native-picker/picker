/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Text, View} from 'react-native';
import type {Element} from 'react';
import {Picker} from '@react-native-community/picker';

const Item = Picker.Item;

function BasicPickerExample() {
  const [value, setValue] = React.useState('key1');
  return (
    <Picker
      testID="basic-picker"
      selectedValue={value}
      onValueChange={(v) => setValue(v)}>
      <Item label="hello" value="key0" />
      <Item label="world" value="key1" />
    </Picker>
  );
}

function DisabledPickerExample() {
  const [value] = React.useState('key1');

  return (
    <Picker enabled={false} selectedValue={value}>
      <Item label="hello" value="key0" />
      <Item label="world" value="key1" />
    </Picker>
  );
}

function DropdownPickerExample() {
  const [value, setValue] = React.useState('key1');

  return (
    <Picker
      selectedValue={value}
      onValueChange={(v) => setValue(v)}
      mode="dropdown">
      <Item label="hello" value="key0" />
      <Item label="world" value="key1" />
    </Picker>
  );
}

function PromptPickerExample() {
  const [value, setValue] = React.useState('key1');
  return (
    <Picker
      selectedValue={value}
      onValueChange={(v) => setValue(v)}
      prompt="Pick one, just one">
      <Item label="hello" value="key0" />
      <Item label="world" value="key1" />
    </Picker>
  );
}

function NoListenerPickerExample() {
  return (
    <View>
      <Picker>
        <Item label="hello" value="key0" />
        <Item label="world" value="key1" />
      </Picker>
      <Text>
        Cannot change the value of this picker because it doesn't update
        selectedValue.
      </Text>
    </View>
  );
}

function ColorPickerExample() {
  const [value, setValue] = React.useState('red');

  return (
    <>
      <Picker
        style={{color: 'white', backgroundColor: '#333'}}
        selectedValue={value}
        onValueChange={(v) => setValue(v)}
        mode="dropdown">
        <Item label="red" color="red" value="red" />
        <Item label="green" color="green" value="green" />
        <Item label="blue" color="blue" value="blue" />
      </Picker>
      <Picker
        style={{color: value}}
        selectedValue={value}
        onValueChange={(v) => setValue(v)}
        mode="dialog">
        <Item label="red" color="red" value="red" />
        <Item label="green" color="green" value="green" />
        <Item label="blue" color="blue" value="blue" />
      </Picker>
    </>
  );
}

export const title = '<Picker>';
export const description =
  'Provides multiple options to choose from, using either a dropdown menu or a dialog.';
export const examples = [
  {
    title: 'Basic Picker',
    render: BasicPickerExample,
  },
  {
    title: 'Disabled Picker',
    render: DisabledPickerExample,
  },
  {
    title: 'Dropdown Picker',
    render: DropdownPickerExample,
  },
  {
    title: 'Picker with prompt message',
    render: PromptPickerExample,
  },
  {
    title: 'Picker with no listener',
    render: NoListenerPickerExample,
  },
  {
    title: 'Colorful pickers',
    render: ColorPickerExample,
  },
];
