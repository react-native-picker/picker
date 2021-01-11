/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import UnimplementedView from 'react-native/Libraries/Components/UnimplementedViews/UnimplementedView';
class PickerMacOS extends React.Component<{}> {
  static Item: typeof UnimplementedView = UnimplementedView;
  render(): React.Node {
    return <UnimplementedView />;
  }
}

/**
 * Fallback for non-MacOS platforms
 */
export default PickerMacOS;
