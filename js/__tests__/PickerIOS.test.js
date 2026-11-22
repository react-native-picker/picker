import * as React from 'react';
import {Platform} from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import Picker from '../Picker';
import RNCPickerNativeComponent from '../RNCPickerNativeComponent';

function render(props) {
  let renderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <Picker selectedValue="a" {...props}>
        <Picker.Item label="A" value="a" />
        <Picker.Item label="B" value="b" />
      </Picker>,
    );
  });
  const native = renderer.root.findByType(RNCPickerNativeComponent);
  return {native, wrapper: native.parent.parent};
}

describe('Picker on iOS', () => {
  beforeEach(() => {
    Platform.OS = 'ios';
  });

  it('is interactive by default', () => {
    const {native, wrapper} = render();
    expect(wrapper.props.pointerEvents).toBeUndefined();
    expect(native.props.accessibilityState).toBeUndefined();
  });

  it('is interactive when enabled is true', () => {
    const {native, wrapper} = render({enabled: true});
    expect(wrapper.props.pointerEvents).toBeUndefined();
    expect(native.props.accessibilityState).toBeUndefined();
  });

  it('blocks touches and is announced as disabled when enabled is false', () => {
    const {native, wrapper} = render({enabled: false});
    expect(wrapper.props.pointerEvents).toBe('none');
    expect(native.props.accessibilityState).toEqual({disabled: true});
  });

  it('keeps other accessibility state when disabled', () => {
    const {native} = render({
      enabled: false,
      accessibilityState: {busy: true},
    });
    expect(native.props.accessibilityState).toEqual({
      busy: true,
      disabled: true,
    });
  });
});
