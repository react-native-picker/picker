/**
 * @flow
 */

import * as React from 'react';
import UnimplementedView from 'react-native-web/src/modules/UnimplementedView';

function PickerAndroid(): React.Node {
  return <UnimplementedView />;
}

/**
 * Fallback for other platforms
 */
PickerAndroid.Item = UnimplementedView;

export default PickerAndroid;
