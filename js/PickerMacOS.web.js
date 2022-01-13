/**
 * @flow
 */

import * as React from 'react';
import UnimplementedView from './UnimplementedView';

function PickerMacOS(): React.Node {
  return <UnimplementedView />;
}

/**
 * Fallback for other platforms
 */
PickerMacOS.Item = UnimplementedView;

export default PickerMacOS;
