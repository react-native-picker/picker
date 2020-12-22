import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '../../js';

const Item = Picker.Item as any;

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

function DropdownMultilinePickerExample() {
  const [value, setValue] = React.useState('key1');

  return (
    <Picker
      numberOfLines={5}
      selectedValue={value}
      onValueChange={(v) => setValue(v)}
      mode="dropdown">
      <Item label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" value="key0" />
      <Item label="quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." value="key1" />
    </Picker>
  );
}

function PromptPickerExample() {
  const [value, setValue] = React.useState('key1');
  return (
    <Picker
      mode="dialog"
      selectedValue={value}
      onValueChange={(v) => setValue(v)}
      prompt="Pick one, just one">
      <Item label="hello" value="key0" />
      <Item label="world" value="key1" />
    </Picker>
  );
}

function PromptMultilinePickerExample() {
  const [value, setValue] = React.useState('key1');
  return (
    <Picker
      mode="dialog"
      numberOfLines={5}
      selectedValue={value}
      onValueChange={(v) => setValue(v)}
      prompt="Pick one, just one">
      <Item label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" value="key0" />
      <Item label="quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." value="key1" />
    </Picker>
  );
}

function CustomDropdownArrowColorPickerExample() {
  return (
    <View>
      <Picker dropdownIconColor="#ffffff">
        <Item label="hello" value="key0" />
        <Item label="world" value="key1" />
      </Picker>
    </View>
  );
};

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
        style={styles.container}
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

const styles = StyleSheet.create({
  container: {
    color: 'white',
    backgroundColor: '#333',
  },
});

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
    title: 'Multiline Dropdown Picker',
    render: DropdownMultilinePickerExample,
  },
  {
    title: 'Picker with prompt message',
    render: PromptPickerExample,
  },
  {
    title: 'Multiline Picker with prompt message',
    render: PromptMultilinePickerExample,
  },
  {
    title: 'Picker with no listener',
    render: NoListenerPickerExample,
  },
  {
    title: 'Colorful pickers',
    render: ColorPickerExample,
  },
  {
    title: 'Picker with changed color of arrow',
    render: CustomDropdownArrowColorPickerExample,
  },
];
