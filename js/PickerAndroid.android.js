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
import {
  findNodeHandle,
  NativeSyntheticEvent,
  processColor,
  UIManager,
} from 'react-native';
import AndroidDialogPickerNativeComponent, {
  Commands as AndroidDialogPickerCommands,
} from './AndroidDialogPickerNativeComponent';
import AndroidDropdownPickerNativeComponent, {
  Commands as AndroidDropdownPickerCommands,
} from './AndroidDropdownPickerNativeComponent';

import type {TextStyleProp} from 'StyleSheet';

const MODE_DROPDOWN = 'dropdown';

type PickerAndroidProps = $ReadOnly<{|
  children?: React.Node,
  style?: ?TextStyleProp,
  selectedValue?: ?(number | string),
  enabled?: ?boolean,
  mode?: ?('dialog' | 'dropdown'),
  onBlur?: (e: NativeSyntheticEvent<undefined>) => mixed,
  onFocus?: (e: NativeSyntheticEvent<undefined>) => mixed,
  onValueChange?: ?(itemValue: ?(string | number), itemIndex: number) => mixed,
  prompt?: ?string,
  testID?: string,
  dropdownIconColor?: string,
  numberOfLines?: ?number,
|}>;

type PickerRef = React.ElementRef<
  | typeof AndroidDialogPickerNativeComponent
  | typeof AndroidDropdownPickerNativeComponent,
>;

/**
 * Not exposed as a public API - use <Picker> instead.
 */
function PickerAndroid(props: PickerAndroidProps, ref: PickerRef): React.Node {
  const pickerRef = React.useRef(null);
  const FABRIC_ENABLED = !!global?.nativeFabricUIManager;

  const [nativeSelectedIndex, setNativeSelectedIndex] = React.useState({
    value: null,
  });

  React.useImperativeHandle(ref, () => {
    const viewManagerConfig = UIManager.getViewManagerConfig(
      props.mode === MODE_DROPDOWN
        ? 'RNCAndroidDialogPicker'
        : 'RNCAndroidDropdownPicker',
    );
    return {
      blur: () => {
        if (!viewManagerConfig.Commands) {
          return;
        }
        if (FABRIC_ENABLED) {
          if (props.mode === MODE_DROPDOWN) {
            AndroidDropdownPickerCommands.blur(pickerRef.current);
          } else {
            AndroidDialogPickerCommands.blur(pickerRef.current);
          }
        } else {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(pickerRef.current),
            viewManagerConfig.Commands.blur,
            [],
          );
        }
      },
      focus: () => {
        if (!viewManagerConfig.Commands) {
          return;
        }
        if (FABRIC_ENABLED) {
          if (props.mode === MODE_DROPDOWN) {
            AndroidDropdownPickerCommands.focus(pickerRef.current);
          } else {
            AndroidDialogPickerCommands.focus(pickerRef.current);
          }
        } else {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(pickerRef.current),
            viewManagerConfig.Commands.focus,
            [],
          );
        }
      },
    };
  });

  React.useLayoutEffect(() => {
    let jsValue = 0;
    React.Children.toArray(props.children).map((child, index) => {
      if (child === null) {
        return null;
      }
      if (child.props.value === props.selectedValue) {
        jsValue = index;
      }
    });

    const shouldUpdateNativePicker =
      nativeSelectedIndex.value != null &&
      nativeSelectedIndex.value !== jsValue;

    // This is necessary in case native updates the switch and JS decides
    // that the update should be ignored and we should stick with the value
    // that we have in JS.
    if (shouldUpdateNativePicker && pickerRef.current) {
      if (FABRIC_ENABLED) {
        if (props.mode === MODE_DROPDOWN) {
          AndroidDropdownPickerCommands.setNativeSelected(
            pickerRef.current,
            selected,
          );
        } else {
          AndroidDialogPickerCommands.setNativeSelected(
            pickerRef.current,
            selected,
          );
        }
      } else {
        pickerRef.current.setNativeProps({
          selected,
        });
      }
    }
  }, [
    props.selectedValue,
    nativeSelectedIndex,
    props.children,
    FABRIC_ENABLED,
    props.mode,
    selected,
  ]);

  const [items, selected] = React.useMemo(() => {
    // eslint-disable-next-line no-shadow
    let selected = 0;
    // eslint-disable-next-line no-shadow
    const items = React.Children.toArray(props.children).map((child, index) => {
      if (child === null) {
        return null;
      }
      if (child.props.value === props.selectedValue) {
        selected = index;
      }

      const {enabled = true} = child.props;

      const {color, contentDescription, label, style = {}} = child.props;

      const processedColor = processColor(color);

      return {
        color: color == null ? null : processedColor,
        contentDescription,
        label: String(label),
        enabled,
        style: {
          ...style,
          // there seems to be a problem with codegen, where it would assign to an item
          // the last defined value of the font size if not set explicitly
          // 0 is handled on the native side as "not set"
          fontSize: style.fontSize ?? 0,
          color: style.color ? processColor(style.color) : null,
          backgroundColor: style.backgroundColor
            ? processColor(style.backgroundColor)
            : null,
        },
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
          onValueChange(value, position);
        } else {
          onValueChange(null, position);
        }
      }
      setNativeSelectedIndex({value: position});
    },
    [props.children, props.onValueChange],
  );

  const Picker =
    props.mode === MODE_DROPDOWN
      ? AndroidDropdownPickerNativeComponent
      : AndroidDialogPickerNativeComponent;

  const rootProps = {
    accessibilityLabel: props.accessibilityLabel,
    enabled: props.enabled,
    items,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    onSelect,
    prompt: props.prompt,
    selected,
    style: props.style,
    dropdownIconColor: processColor(props.dropdownIconColor),
    dropdownIconRippleColor: processColor(props.dropdownIconRippleColor),
    testID: props.testID,
    numberOfLines: props.numberOfLines,
  };

  return <Picker ref={pickerRef} {...rootProps} />;
}

export default React.forwardRef<PickerAndroidProps>(PickerAndroid);
