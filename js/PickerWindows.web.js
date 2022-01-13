/**
 * @flow
 */

import * as React from 'react';
import UnimplementedView from './UnimplementedView';

function PickerWindows(): React.Node {
  return <UnimplementedView />;
}

/**
 * Fallback for other platforms
 */
PickerWindows.Item = UnimplementedView;

export default PickerWindows;
