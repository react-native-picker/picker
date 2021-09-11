/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
declare var __DEV__: boolean;
/**
 * Common implementation for a simple stubbed view. Simply applies the view's styles to the inner
 * View component and renders its children.
 */
const UnimplementedView = (props: $FlowFixMeProps): React.Node => {
  return (
    <View style={[styles.unimplementedView, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  unimplementedView:
    process.env.NODE_ENV !== 'production'
      ? {
          alignSelf: 'flex-start',
          borderColor: 'red',
          borderWidth: 1,
        }
      : {},
});

export default UnimplementedView;
