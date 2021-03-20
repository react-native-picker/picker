/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

'use strict';

import * as React from 'react';
import {processColor} from 'react-native';
import AndroidDialogPickerNativeComponent from './AndroidDialogPickerNativeComponent';
import AndroidDropdownPickerNativeComponent from './AndroidDropdownPickerNativeComponent';

const REF_PICKER = 'picker';
const MODE_DROPDOWN = 'dropdown';

import type {TextStyleProp} from 'StyleSheet';

type PickerAndroidProps = $ReadOnly<{|
  children?: React.Node,
  style?: ?TextStyleProp,
  selectedValue?: ?(number | string),
  enabled?: ?boolean,
  mode?: ?('dialog' | 'dropdown'),
  onValueChange?: ?(itemValue: ?(string | number), itemIndex: number) => mixed,
  prompt?: ?string,
  testID?: string,
  dropdownIconColor?: string,
  numberOfLines?: ?number,
|}>;

/**
 * Not exposed as a public API - use <Picker> instead.
 */
function PickerAndroid(props: PickerAndroidProps): React.Node {
  const pickerRef = React.useRef(null);

  const [items, selected] = React.useMemo(() => {
    // eslint-disable-next-line no-shadow
    let selected = 0;
    // eslint-disable-next-line no-shadow
    const items = React.Children.map(props.children, (child, index) => {
      if (child === null) {
        return null;
      }
      if (child.props.value === props.selectedValue) {
        selected = index;
      }
      const {color, label} = child.props;
      const processedColor = processColor(color);

      return {
        color: color == null ? null : processedColor,
        label,
      };
    });
    return [items, selected];
  }, [props.children, props.selectedValue]);

  const onSelect = React.useCallback(
    ({nativeEvent}: PickerItemSelectSyntheticEvent) => {
      const {position} = nativeEvent;
      const onValueChange = props.onValueChange;

      if (onValueChange != null) {
        if (position >= 0) {
          const children = React.Children.toArray(props.children).filter(
            (item) => item != null,
          );
          const value = children[position].props.value;
          if (props.selectedValue !== value) {
            onValueChange(value, position);
          }
        } else {
          onValueChange(null, position);
        }
      }
      const {current} = pickerRef;

      // The picker is a controlled component. This means we expect the
      // on*Change handlers to be in charge of updating our
      // `selectedValue` prop. That way they can also
      // disallow/undo/mutate the selection of certain values. In other
      // words, the embedder of this component should be the source of
      // truth, not the native component.
      if (current[REF_PICKER] && selected !== position) {
        // TODO: using setNativeProps is deprecated and will be unsupported once Fabric lands. Use codegen to generate native commands
        current[REF_PICKER].setNativeProps({
          selected,
        });
      }
    },
    [props.children, props.onValueChange, props.selectedValue, selected],
  );

  const Picker =
    props.mode === MODE_DROPDOWN
      ? AndroidDropdownPickerNativeComponent
      : AndroidDialogPickerNativeComponent;

  const rootProps = {
    accessibilityLabel: props.accessibilityLabel,
    enabled: props.enabled,
    items,
    onSelect,
    prompt: props.prompt,
    ref: pickerRef,
    selected,
    style: props.style,
    backgroundColor: props.backgroundColor,
    dropdownIconColor: props.dropdownIconColor,
    testID: props.testID,
    numberOfLines: props.numberOfLines,
  };

  return <Picker ref={REF_PICKER} {...rootProps} />;
}

export default PickerAndroid;
