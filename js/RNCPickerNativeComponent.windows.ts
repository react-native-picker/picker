/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * @format
 */
'use strict';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps, ColorValue, HostComponent } from 'react-native';
import type { 
  Int32,
  WithDefault,
  BubblingEventHandler 
} from 'react-native/Libraries/Types/CodegenTypes';

/**
 * Represents a single item in the Picker.
 */
export type RNCPickerItem = Readonly<{
  /**
   * Text label for this item.
   */
  label: string;
  
  /**
   * The value associated with this item. Can be a string.
   */
  value?: string;
  
  /**
   * Text color for this item.
   */
  textColor?: ColorValue;
  
  /**
   * Used to locate the item in end-to-end tests.
   */
  testID?: string;
}>;

/**
 * Event payload when the picker selection changes.
 */
export type RNCPickerChangeEvent = Readonly<{
  /**
   * The value of the newly selected item.
   */
  value: string;
  
  /**
   * The index of the newly selected item.
   */
  itemIndex: Int32;
  
  /**
   * The text/label of the newly selected item.
   */
  text: string;
}>;

/**
 * Props for the RNCPicker native component on Windows.
 */
export interface RNCPickerProps extends ViewProps {
  /**
   * Array of picker items to display.
   */
  items: ReadonlyArray<RNCPickerItem>;
  
  /**
   * The index of the currently selected item.
   * @default -1
   */
  selectedIndex?: WithDefault<Int32, -1>;
  
  /**
   * If set to false, the picker will be disabled.
   * @default true
   */
  enabled?: WithDefault<boolean, true>;
  
  /**
   * Placeholder string displayed when no item is selected.
   */
  placeholder?: string;
  
  /**
   * If set to true, the picker will be editable (allows text input).
   * @platform windows
   * @default false
   */
  editable?: WithDefault<boolean, false>;
  
  /**
   * The text value when the picker is in editable mode.
   * @platform windows
   */
  text?: string;
  
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
  
  /**
   * Accessibility label for the picker.
   */
  accessibilityLabel?: string;

  /**
   * Callback when the selected item changes.
   */
  onPickerSelect?: BubblingEventHandler<RNCPickerChangeEvent>;
}

export default codegenNativeComponent<RNCPickerProps>('RNCPicker', {
  excludedPlatforms: ['iOS', 'android'],
}) as HostComponent<RNCPickerProps>;
