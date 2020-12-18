import * as React from 'react';
import {UnimplementedView} from 'react-native';

function PickerIOS() {
  return <UnimplementedView />;
}

/**
 * Fallback for non-iOS platforms
 */
PickerIOS.Item = UnimplementedView;

export default PickerIOS;
