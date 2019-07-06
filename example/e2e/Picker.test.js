/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+react_native
 * @format
 */

const {device, expect, element, by} = require('detox');

describe('Picker', () => {
  beforeAll(async () => {
    await device.launchApp({});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should be selectable by ID', async () => {
    await expect(element(by.id('basic-picker'))).toBeVisible();
  });
});
