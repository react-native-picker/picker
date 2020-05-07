import React from 'react';
import {Platform} from 'react-native';
import Picker from '../Picker';

describe('Picker', () => {
  it('should render the iOS native component', () => {
    Platform.OS = 'ios';
    expect(<Picker />).toMatchSnapshot();
  });
  it('should render the Android native component', () => {});
});
