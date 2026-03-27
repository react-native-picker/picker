/**
 * @flow
 */

import {Platform} from 'react-native';

export {default as Picker} from './Picker';
export {default as PickerIOS} from './PickerIOS';

// Windows-specific exports
// $FlowFixMe - dynamic require for platform-specific module
export const RNCPicker = Platform.OS === 'windows'
  ? require('./RNCPickerNativeComponent.windows').default
  : undefined;

// $FlowFixMe - dynamic require for platform-specific module
export const NativePickerModule = Platform.OS === 'windows'
  ? require('./NativePickerModule.windows').default
  : undefined;

// Re-export types (these are type-only, so safe for all platforms)
export type {
  RNCPickerProps,
  RNCPickerItem,
  RNCPickerChangeEvent,
} from './RNCPickerNativeComponent.windows';
