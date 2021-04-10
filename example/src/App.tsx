import * as React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  I18nManager,
  Switch,
} from 'react-native';

import * as PickerExamples from './PickerExample';
import * as PickerIOSExamples from './PickerIOSExample';

export default function App() {
  const [isRTL, setIsRTL] = React.useState(I18nManager.isRTL);
  React.useEffect(() => {
    I18nManager.allowRTL(true);
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <View style={styles.rtlSwitchContainer}>
          <Switch
            value={isRTL}
            onValueChange={(newValue) => {
              setIsRTL(newValue);
              I18nManager.forceRTL(newValue);
            }}
          />
          <Text>{I18nManager.isRTL ? 'RTL' : 'LTR'}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Picker Examples</Text>
          {PickerExamples.examples.map((element) => (
            <View style={styles.elementContainer} key={element.title}>
              <Text style={styles.title}> {element.title} </Text>
              {element.render()}
            </View>
          ))}
          {Platform.OS === 'ios' && (
            <Text style={styles.heading}>PickerIOS Examples</Text>
          )}
          {Platform.OS === 'ios' &&
            PickerIOSExamples.examples.map((element) => (
              <View style={styles.elementContainer} key={element.title}>
                <Text style={styles.title}> {element.title} </Text>
                {element.render()}
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5FCFF',
  },
  container: {
    padding: 24,
    paddingBottom: 60,
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
  rtlSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 20,
  },
});
