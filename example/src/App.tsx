import * as React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  I18nManager,
  Switch,
} from 'react-native';

import * as PickerExamples from './PickerExample';
import * as PickerIOSExamples from './PickerIOSExample';
import * as PickerWindowsExamples from './PickerWindowsExamples';

export default function App() {
  const [isRTL, setIsRTL] = React.useState(I18nManager.isRTL);
  React.useEffect(() => {
    I18nManager.allowRTL(true);
  }, []);
  return (
    <View style={styles.main}>
      <ScrollView>
        {Platform.OS !== 'macos' && (
          <View style={styles.rtlSwitchContainer}>
            <Text style={styles.label}>Layout Direction:</Text>
            <Switch
              value={isRTL}
              onValueChange={(newValue) => {
                setIsRTL(newValue);
                I18nManager.forceRTL(newValue);
              }}
            />
            <Text style={styles.label}>
              {I18nManager.isRTL ? 'RTL' : 'LTR'}
            </Text>
          </View>
        )}
        <View style={styles.container}>
          <Text style={styles.heading}>Picker Examples</Text>
          {PickerExamples.examples.map((element) => (
            <View style={styles.elementContainer} key={element.title}>
              <Text style={styles.title}>{element.title}</Text>
              {element.render()}
            </View>
          ))}
          {Platform.OS === 'ios' && (
            <Text style={styles.heading}>PickerIOS Examples</Text>
          )}
          {Platform.OS === 'ios' &&
            PickerIOSExamples.examples.map((element) => (
              <View style={styles.elementContainer} key={element.title}>
                <Text style={styles.title}>{element.title}</Text>
                {element.render()}
              </View>
            ))}
          {Platform.OS === 'windows' && (
            <Text style={styles.heading}>PickerWindows Examples</Text>
          )}
          {Platform.OS === 'windows' &&
            PickerWindowsExamples.examples.map((element) => (
              <View style={styles.elementContainer} key={element.title}>
                <Text style={styles.title}>{element.title}</Text>
                {element.render()}
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    padding: 24,
    paddingBottom: 60,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  elementContainer: {
    marginTop: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  rtlSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
});
