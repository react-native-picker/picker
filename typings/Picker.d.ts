import * as React from "react"
import { TextStyle, StyleProp, ViewProps } from 'react-native'

export type ItemValue  = number | string

export interface PickerItemProps {
	label: string;
	value?: ItemValue;
	color?: string;
	testID?: string;
}

export interface PickerProps extends ViewProps {
	style?: StyleProp<TextStyle>;
	/**
   * Value matching value of one of the items. Can be a string or an integer.
   */
	selectedValue?: ItemValue;
	/**
   * Callback for when an item is selected. This is called with the following parameters:
   *   - `itemValue`: the `value` prop of the item that was selected
   *   - `itemIndex`: the index of the selected item in this picker
   */
	onValueChange?: (itemValue: ItemValue, itemIndex: number) => void;
	/**
   * If set to false, the picker will be disabled, i.e. the user will not be able to make a
   * selection.
   * @platform android
   */
	enabled?: boolean;
	/**
   * On Android, specifies how to display the selection items when the user taps on the picker:
   *
   *   - 'dialog': Show a modal dialog. This is the default.
   *   - 'dropdown': Shows a dropdown anchored to the picker view
   *
   * @platform android
   */
	mode?: 'dialog' | 'dropdown';
	/**
   * Style to apply to each of the item labels.
   * @platform ios
   */
	itemStyle?: StyleProp<TextStyle>;
	/**
   * Prompt string for this picker, used on Android in dialog mode as the title of the dialog.
   * @platform android
   */
	prompt?: string;
	/**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
   /**
    * Color of arrow for spinner dropdown in hexadecimal format
    */
   dropdownIconColor?: string;
}

declare class Picker extends React.Component<PickerProps, {}> {
   /**
     * On Android, display the options in a dialog (this is the default).
     */
    static readonly MODE_DIALOG: 'dialog';
    /**
     * On Android, display the options in a dropdown.
     */
    static readonly MODE_DROPDOWN: 'dropdown';

   static Item: React.ComponentType<PickerItemProps>;
}

export {Picker};
