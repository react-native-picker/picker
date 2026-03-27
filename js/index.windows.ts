/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * @format
 */

// Re-export standard exports
export {default as Picker} from './Picker';
export {default as PickerIOS} from './PickerIOS';

// Export the Windows native component and its types
export { default as RNCPicker } from './RNCPickerNativeComponent.windows';
export type {
  RNCPickerProps,
  RNCPickerItem,
  RNCPickerChangeEvent,
} from './RNCPickerNativeComponent.windows';

// Re-export the native module for direct access
export { default as NativePickerModule } from './NativePickerModule.windows';
export type { Spec as NativePickerModuleSpec } from './NativePickerModule.windows';
