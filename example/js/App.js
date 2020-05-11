/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';

import PickerExamples from './PickerExample';
import PickerIOSExamples from './PickerIOSExample';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Picker Examples</Text>
        {PickerExamples.examples.map((element) => (
          <View style={styles.elementContainer} key={element.title}>
            <Text style={styles.title}> {element.title} </Text>
            {element.render()}
          </View>
        ))}
        {Platform.OS === 'ios' && (
          <Text style={styles.heading}>{'PickerIOS Examples'}</Text>
        )}
        {Platform.OS === 'ios' &&
          PickerIOSExamples.examples.map((element) => (
            <View style={styles.elementContainer} key={element.title}>
              <Text style={styles.title}> {element.title} </Text>
              {element.render()}
            </View>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 30,
      },
    }),
    backgroundColor: '#F5FCFF',
    margin: 16,
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
