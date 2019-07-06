/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */
const {device, expect, element, by} = require('detox');

describe('Picker', () => {
  beforeAll(async () => {
    await device.launchApp({});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should load example app with no errors and show all the examples by default', async () => {
    await expect(element(by.text('Picker Examples'))).toBeVisible();
  });
});
