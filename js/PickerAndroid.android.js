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
import AndroidDialogPickerNativeComponent from './AndroidDialogPickerNativeComponent';
import AndroidDropdownPickerNativeComponent from './AndroidDropdownPickerNativeComponent';

const MODE_DROPDOWN = 'dropdown';

// On Android 8-10 the onBlur event can be triggered before the onValueChange event.
const TIME_WINDOW_TO_INVOKE_ON_VALUE_CHANGE = 500;

import type {TextStyleProp} from 'StyleSheet';

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
  
  const [onBlurTimestamp, setOnBlurTimestamp] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

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
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(pickerRef.current),
          viewManagerConfig.Commands.blur,
          [],
        );
      },
      focus: () => {
        if (!viewManagerConfig.Commands) {
          return;
        }
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(pickerRef.current),
          viewManagerConfig.Commands.focus,
          [],
        );
      },
    };
  });

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
        label,
        enabled,
        style: {
          ...style,
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

      const canInvokeOnValueChange = isOpen || (!!onBlurTimestamp && (Date.now() - onBlurTimestamp) <= TIME_WINDOW_TO_INVOKE_ON_VALUE_CHANGE);

      if (onValueChange != null && canInvokeOnValueChange) {
        
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

      // The picker is a controlled component. This means we expect the
      // on*Change handlers to be in charge of updating our
      // `selectedValue` prop. That way they can also
      // disallow/undo/mutate the selection of certain values. In other
      // words, the embedder of this component should be the source of
      // truth, not the native component.
      if (pickerRef.current) {
        // TODO: using setNativeProps is deprecated and will be unsupported once Fabric lands. Use codegen to generate native commands
        pickerRef.current.setNativeProps({
          selected,
        });
      }
    },
    [props.children, props.onValueChange, props.selectedValue, selected, isOpen, onBlurTimestamp],
  );

  const onBlur = React.useCallback(
    (e: NativeSyntheticEvent<undefined>) => {
      setOnBlurTimestamp(Date.now());
      setIsOpen(false);
      props.onBlur && props.onBlur(e);
    },
    [props.onBlur],
  );

  const onFocus = React.useCallback(
    (e: NativeSyntheticEvent<undefined>) => {
      setIsOpen(true);
      props.onFocus && props.onFocus(e);
    },
    [props.onFocus],
  );

  const Picker =
    props.mode === MODE_DROPDOWN
      ? AndroidDropdownPickerNativeComponent
      : AndroidDialogPickerNativeComponent;

  const rootProps = {
    accessibilityLabel: props.accessibilityLabel,
    enabled: props.enabled,
    items,
    onBlur: onBlur,
    onFocus: onFocus,
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
