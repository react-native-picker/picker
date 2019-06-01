/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import PickerExamples from './PickerExample';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Picker Examples</Text>
        {PickerExamples.examples.map(element => (
          <View style={styles.elementContainer} key={element.title}>
            <Text style={styles.title}> {element.title} </Text>
            {element.render()}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
  elementContainer: {
    marginTop: 8,
  },
  heading: {
    fontSize: 22,
    color: 'black',
  },
});
