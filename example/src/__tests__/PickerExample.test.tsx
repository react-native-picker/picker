import * as React from 'react';
import {BasicPickerExample} from '../PickerExample';
import {fireEvent, render} from '@testing-library/react-native';

describe('PickerExample', () => {
  it('should set selectedIndex when item changed', () => {
    const renderer = render(<BasicPickerExample />);
    const picker = renderer.getByTestId('basic-picker');

    // initial selected-value is `key1` at selectedIndex '1'
    expect(picker.props.selectedIndex).toStrictEqual(1);

    // trigger a change to the UI, selecting the first element
    fireEvent(picker, 'onValueChange', 'key0');
    expect(picker.props.selectedIndex).toStrictEqual(0);

    // trigger a second change to the UI, selecting the seconed element
    fireEvent(picker, 'onValueChange', 'key1');
    expect(picker.props.selectedIndex).toStrictEqual(1);
  });
});
