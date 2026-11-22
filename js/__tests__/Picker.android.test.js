// Runs in the "android" Jest project, so Picker resolves PickerAndroid.android.js.
import * as React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Picker from '../Picker';
import AndroidDialogPickerNativeComponent from '../AndroidDialogPickerNativeComponent';
import AndroidDropdownPickerNativeComponent from '../AndroidDropdownPickerNativeComponent';

function render(props) {
  let renderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <Picker selectedValue="b" {...props}>
        <Picker.Item label="A" value="a" />
        <Picker.Item label="B" value="b" />
        <Picker.Item label="C" value="c" enabled={false} />
      </Picker>,
    );
  });
  return renderer;
}

describe('Picker on Android', () => {
  it('renders the dialog picker by default', () => {
    const native = render().root.findByType(AndroidDialogPickerNativeComponent);
    expect(native.props.selected).toBe(1);
    expect(native.props.items.map((item) => item.label)).toEqual([
      'A',
      'B',
      'C',
    ]);
    expect(native.props.items.map((item) => item.enabled)).toEqual([
      true,
      true,
      false,
    ]);
  });

  it('renders the dropdown picker when mode is "dropdown"', () => {
    const renderer = render({mode: 'dropdown'});
    expect(
      renderer.root.findAllByType(AndroidDropdownPickerNativeComponent),
    ).toHaveLength(1);
    expect(
      renderer.root.findAllByType(AndroidDialogPickerNativeComponent),
    ).toHaveLength(0);
  });

  it('passes enabled and the accessibility label to the native picker', () => {
    const native = render({
      enabled: false,
      accessibilityLabel: 'Label for this picker',
    }).root.findByType(AndroidDialogPickerNativeComponent);
    expect(native.props.enabled).toBe(false);
    expect(native.props.accessibilityLabel).toBe('Label for this picker');
  });

  it('calls onValueChange with the value and position of the native selection', () => {
    const onValueChange = jest.fn();
    const native = render({onValueChange}).root.findByType(
      AndroidDialogPickerNativeComponent,
    );
    ReactTestRenderer.act(() => {
      native.props.onSelect({nativeEvent: {position: 0}});
    });
    expect(onValueChange).toHaveBeenCalledWith('a', 0);
  });
});
