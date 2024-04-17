/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * This is a controlled component version of RNCPickerIOS
 *
 * @format
 * @flow
 */

'use strict';

import * as React from 'react';
import {processColor, StyleSheet, View} from 'react-native';
import RNCPickerNativeComponent, {
  Commands as iOSPickerCommands,
} from './RNCPickerNativeComponent';
import type {SyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {
  ColorValue,
  ViewStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {Element, ChildrenArray} from 'react';

type PickerIOSChangeEvent = SyntheticEvent<
  $ReadOnly<{|
    newValue: number | string,
    newIndex: number,
  |}>,
>;

type RNCPickerIOSItemType = $ReadOnly<{|
  label: ?Label,
  value: ?(number | string),
  textColor: ?ColorValue,
  testID: ?string,
|}>;

type Label = Stringish | number;

type Props = $ReadOnly<{|
  ...ViewProps,
  // $FlowFixMe
  children: ChildrenArray<Element<typeof PickerIOSItem>>,
  itemStyle?: ?ViewStyleProp,
  numberOfLines: ?number,
  onChange?: ?(event: PickerIOSChangeEvent) => mixed,
  onValueChange?: ?(itemValue: string | number, itemIndex: number) => mixed,
  selectedValue: ?(number | string),
  selectionColor: ?string,
  themeVariant: ?string,
|}>;

type ItemProps = $ReadOnly<{|
  label: ?Label,
  value?: ?(number | string),
  color?: ?ColorValue,
  testID?: ?string,
|}>;

type CallbackRef<T> = (T) => mixed;
type ObjectRef<T> = {current: T, ...};

type Ref<T> = CallbackRef<T> | ObjectRef<T>;

/**
 * Constructs a new ref that forwards new values to each of the given refs. The
 * given refs will always be invoked in the order that they are supplied.
 *
 * WARNING: A known problem of merging refs using this approach is that if any
 * of the given refs change, the returned callback ref will also be changed. If
 * the returned callback ref is supplied as a `ref` to a React element, this may
 * lead to problems with the given refs being invoked more times than desired.
 */
function useMergeRefs<T>(...refs: $ReadOnlyArray<?Ref<T>>): CallbackRef<T> {
  return React.useCallback(
    (current: T) => {
      for (const ref of refs) {
        if (ref != null) {
          if (typeof ref === 'function') {
            ref(current);
          } else {
            ref.current = current;
          }
        }
      }
    },
    [...refs], // eslint-disable-line react-hooks/exhaustive-deps
  );
}

// $FlowFixMe
const PickerIOSItem: RNCPickerIOSItemType = (props: ItemProps): null => {
  return null;
};

const PickerIOSWithForwardedRef: React.AbstractComponent<
  Props,
  React.ElementRef<typeof RNCPickerNativeComponent>,
> = React.forwardRef(function PickerIOS(props, forwardedRef): React.Node {
  const {
    children,
    selectedValue,
    selectionColor,
    themeVariant,
    testID,
    itemStyle,
    numberOfLines,
    onChange,
    onValueChange,
    style,
  } = props;

  const nativePickerRef = React.useRef<React.ElementRef<
    typeof RNCPickerNativeComponent,
  > | null>(null);

  // $FlowFixMe
  const ref = useMergeRefs(nativePickerRef, forwardedRef);

  const [nativeSelectedIndex, setNativeSelectedIndex] = React.useState({
    value: null,
  });

  const [items, selectedIndex] = React.useMemo(() => {
    // eslint-disable-next-line no-shadow
    let selectedIndex = 0;
    // eslint-disable-next-line no-shadow
    const items = React.Children.toArray<$FlowFixMe>(children).map(
      (child, index) => {
        if (child === null) {
          return null;
        }
        if (String(child.props.value) === String(selectedValue)) {
          selectedIndex = index;
        }
        return {
          value: String(child.props.value),
          label: String(child.props.label),
          textColor: processColor(child.props.color),
          testID: child.props.testID,
        };
      },
    );
    return [items, selectedIndex];
  }, [children, selectedValue]);

  let parsedNumberOfLines = Math.round(numberOfLines ?? 1);
  if (parsedNumberOfLines < 1) {
    parsedNumberOfLines = 1;
  }

  React.useLayoutEffect(() => {
    let jsValue = 0;
    React.Children.toArray<$FlowFixMe>(children).forEach(function (
      child: $FlowFixMe,
      index: number,
    ) {
      if (String(child.props.value) === String(selectedValue)) {
        jsValue = index;
      }
    });
    // This is necessary in case native updates the switch and JS decides
    // that the update should be ignored and we should stick with the value
    // that we have in JS.
    const shouldUpdateNativePicker =
      nativeSelectedIndex.value != null &&
      nativeSelectedIndex.value !== jsValue;
    if (shouldUpdateNativePicker && nativePickerRef.current) {
      if (global?.nativeFabricUIManager) {
        iOSPickerCommands.setNativeSelectedIndex(
          nativePickerRef.current,
          jsValue,
        );
      } else {
        nativePickerRef.current.setNativeProps({
          selectedIndex: jsValue,
        });
      }
    }
  }, [selectedValue, nativeSelectedIndex, children]);

  const _onChange = React.useCallback(
    (event: $FlowFixMe) => {
      onChange?.(event);
      onValueChange?.(event.nativeEvent.newValue, event.nativeEvent.newIndex);
      setNativeSelectedIndex({value: event.nativeEvent.newIndex});
    },
    [onChange, onValueChange],
  );

  return (
    <View style={style}>
      <RNCPickerNativeComponent
        ref={ref}
        themeVariant={themeVariant}
        testID={testID}
        style={[styles.pickerIOS, itemStyle]}
        // $FlowFixMe
        items={items}
        onChange={_onChange}
        numberOfLines={parsedNumberOfLines}
        selectedIndex={selectedIndex}
        selectionColor={processColor(selectionColor)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  pickerIOS: {
    // The picker will conform to whatever width is given, but we do
    // have to set the component's height explicitly on the
    // surrounding view to ensure it gets rendered.
    height: 216,
  },
});

// $FlowFixMe
PickerIOSWithForwardedRef.Item = PickerIOSItem;

export default PickerIOSWithForwardedRef;
