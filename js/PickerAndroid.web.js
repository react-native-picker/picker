/**
 * @flow
 */

import * as React from 'react';
import UnimplementedView from './UnimplementedView';

function PickerAndroid(): React.Node {
  return <UnimplementedView />;
}

/**
 * Fallback for other platforms
 */
PickerAndroid.Item = UnimplementedView;

export default PickerAndroid;
