import * as React from 'react';
import {Button, Text, StyleSheet, View} from 'react-native';
import {PickerIOS} from '@react-native-picker/picker';

const CAR_MAKES_AND_MODELS = {
  amc: {
    name: 'AMC',
    models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
  },
  alfa: {
    name: 'Alfa-Romeo',
    models: [
      '159',
      '4C',
      'Alfasud',
      'Brera',
      'GTV6',
      'Giulia',
      'MiTo',
      'Spider',
    ],
  },
  aston: {
    name: 'Aston Martin',
    models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage'],
  },
  audi: {
    name: 'Audi',
    models: [
      '90',
      '4000',
      '5000',
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'Q5',
      'Q7',
    ],
  },
  austin: {
    name: 'Austin',
    models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess'],
  },
  borgward: {
    name: 'Borgward',
    models: ['Hansa', 'Isabella', 'P100'],
  },
  buick: {
    name: 'Buick',
    models: [
      'Electra',
      'LaCrosse',
      'LeSabre',
      'Park Avenue',
      'Regal',
      'Roadmaster',
      'Skylark',
    ],
  },
  cadillac: {
    name: 'Cadillac',
    models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville'],
  },
  chevrolet: {
    name: 'Chevrolet',
    models: [
      'Astro',
      'Aveo',
      'Bel Air',
      'Captiva',
      'Cavalier',
      'Chevelle',
      'Corvair',
      'Corvette',
      'Cruze',
      'Nova',
      'SS',
      'Vega',
      'Volt',
    ],
  },
};

function PickerExample() {
  const [carMake, setCarMake] = React.useState<string>('cadillac');
  const [modelIndex, setModelIndex] = React.useState(3);

  const make = CAR_MAKES_AND_MODELS[carMake];
  const selectionString = make.name + ' ' + make.models[modelIndex];
  return (
    <View>
      <Text>Please choose a make for your car:</Text>
      <PickerIOS
        selectedValue={carMake}
        onValueChange={(value) => {
          setCarMake(value);
          setModelIndex(0);
        }}
      >
        {Object.keys(CAR_MAKES_AND_MODELS).map((value) => (
          <PickerIOS.Item
            key={value}
            value={value}
            label={CAR_MAKES_AND_MODELS[value].name}
          />
        ))}
      </PickerIOS>
      <Text>Please choose a model of {make.name}:</Text>
      <PickerIOS
        selectedValue={modelIndex}
        key={carMake}
        onValueChange={(value) => setModelIndex(value)}
      >
        {CAR_MAKES_AND_MODELS[carMake].models.map((modelName, value) => (
          <PickerIOS.Item
            key={`${carMake}_${value}`}
            value={value}
            label={modelName}
          />
        ))}
      </PickerIOS>
      <Text>You selected: {selectionString}</Text>
    </View>
  );
}

function ControlledPickerRapidUpdatesExample() {
  const [value, setValue] = React.useState('first');

  return (
    <View>
      <Text>Rapidly alternate the two buttons while the wheel is moving.</Text>
      <Button title="Select first" onPress={() => setValue('first')} />
      <Button title="Select last" onPress={() => setValue('last')} />
      <PickerIOS
        accessibilityLabel="Controlled picker rapid updates reproduction"
        selectedValue={value}
        testID="controlled-picker-rapid-updates"
        onValueChange={(nextValue) => setValue(nextValue)}
      >
        <PickerIOS.Item label="First" value="first" />
        <PickerIOS.Item label="Second" value="second" />
        <PickerIOS.Item label="Third" value="third" />
        <PickerIOS.Item label="Last" value="last" />
      </PickerIOS>
      <Text testID="controlled-picker-rapid-updates-value">
        Selected: {value}
      </Text>
    </View>
  );
}

function PickerStyleExample() {
  const [carMake, setCarMake] = React.useState<string>('cadillac');

  return (
    <PickerIOS
      itemStyle={styles.item}
      selectedValue={carMake}
      selectionColor="rgba(0, 0, 0, 0.3)"
      onValueChange={(value) => setCarMake(value)}
    >
      {Object.keys(CAR_MAKES_AND_MODELS).map((value) => (
        <PickerIOS.Item
          key={value}
          value={value}
          label={CAR_MAKES_AND_MODELS[value].name}
        />
      ))}
    </PickerIOS>
  );
}

export const title = '<PickerIOS>';
export const description =
  'Render lists of selectable options with UIPickerView.';
export const examples = [
  {
    title: '<PickerIOS>',
    render: PickerExample,
  },
  {
    title: '<PickerIOS> with rapid controlled updates',
    render: ControlledPickerRapidUpdatesExample,
  },
  {
    title: '<PickerIOS> with custom styling',
    render: PickerStyleExample,
  },
];

const styles = StyleSheet.create({
  item: {
    fontSize: 25,
    color: 'red',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
