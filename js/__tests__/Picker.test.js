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
});
