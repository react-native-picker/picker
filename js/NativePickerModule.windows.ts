/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * @format
 */

'use strict';

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

/**
 * Native Picker TurboModule for Windows.
 * Provides native functionality for the Picker component.
 */
export interface Spec extends TurboModule {
  // TurboModule methods will be added here as needed
}

export default TurboModuleRegistry.getEnforcing<Spec>('Picker');
