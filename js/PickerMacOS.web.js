/**
 * @flow
 */

import * as React from 'react';
import UnimplementedView from 'react-native-web/src/modules/UnimplementedView';

function PickerMacOS(): React.Node {
  return <UnimplementedView />;
}

/**
 * Fallback for other platforms
 */
PickerMacOS.Item = UnimplementedView;

export default PickerMacOS;
