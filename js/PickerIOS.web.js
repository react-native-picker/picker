/**
 * @flow
 */

import * as React from 'react';
import UnimplementedView from 'react-native-web/src/modules/UnimplementedView';

function PickerIOS(): React.Node {
  return <UnimplementedView />;
}

/**
 * Fallback for other platforms
 */
PickerIOS.Item = UnimplementedView;

export default PickerIOS;
