import * as React from 'react';
import {Platform} from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import Picker from '../Picker';
import RNCPickerNativeComponent from '../RNCPickerNativeComponent';

function renderNative(props) {
  let renderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <Picker selectedValue="b" {...props}>
        <Picker.Item label="A" value="a" />
        <Picker.Item label="B" value="b" color="red" />
        <Picker.Item label="C" value="c" />
      </Picker>,
    );
  });
  return renderer.root.findByType(RNCPickerNativeComponent);
}

describe('Picker on iOS', () => {
  beforeEach(() => {
    Platform.OS = 'ios';
  });

  it('renders the native iOS picker with the items and selected index', () => {
    const native = renderNative();
    expect(native.props.selectedIndex).toBe(1);
    expect(native.props.items.map((item) => item.label)).toEqual([
      'A',
      'B',
      'C',
    ]);
    expect(native.props.items.map((item) => item.value)).toEqual([
      'a',
      'b',
      'c',
    ]);
  });

  it('passes the accessibility label to the native picker', () => {
    const native = renderNative({accessibilityLabel: 'Label for this picker'});
    expect(native.props.accessibilityLabel).toBe('Label for this picker');
  });

  it('calls onValueChange with the value and index of the native selection', () => {
    const onValueChange = jest.fn();
    const native = renderNative({onValueChange});
    ReactTestRenderer.act(() => {
      native.props.onChange({nativeEvent: {newValue: 'c', newIndex: 2}});
    });
    expect(onValueChange).toHaveBeenCalledWith('c', 2);
  });

  it('passes the item value with its original type to onValueChange', () => {
    const onValueChange = jest.fn();
    const objectValue = {id: 3};
    let renderer;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <Picker selectedValue={10} onValueChange={onValueChange}>
          <Picker.Item label="Ten" value={10} />
          <Picker.Item label="Twenty" value={20} />
          <Picker.Item label="Object" value={objectValue} />
        </Picker>,
      );
    });
    const native = renderer.root.findByType(RNCPickerNativeComponent);
    // The native side may hand the value back converted (e.g. as a string);
    // onValueChange should still get the value the item was given.
    ReactTestRenderer.act(() => {
      native.props.onChange({nativeEvent: {newValue: '20', newIndex: 1}});
    });
    expect(onValueChange).toHaveBeenLastCalledWith(20, 1);
    ReactTestRenderer.act(() => {
      native.props.onChange({nativeEvent: {newValue: {id: 3}, newIndex: 2}});
    });
    expect(onValueChange.mock.calls[1][0]).toBe(objectValue);
  });
});
