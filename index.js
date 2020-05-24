/**
 * This file is an entry point for example app
 */

import {AppRegistry} from 'react-native';
import App from './example/src/App';
import {name as appName} from './example/app.json';

AppRegistry.registerComponent(appName, () => App);
