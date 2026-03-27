import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
// @ts-ignore - module resolution works at runtime via workspace linking
import {
  RNCPicker,
  type RNCPickerItem,
  type RNCPickerChangeEvent,
} from '@react-native-picker/picker';

// Reusable Card component for examples
function ExampleCard({children}: {children: React.ReactNode}) {
  return <View style={styles.card}>{children}</View>;
}



// Example 1: Basic Picker with Placeholder
function PlaceholderPickerExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const items: RNCPickerItem[] = [
    {label: 'JavaScript', value: 'js'},
    {label: 'TypeScript', value: 'ts'},
    {label: 'Python', value: 'py'},
    {label: 'C++', value: 'cpp'},
  ];

  const handleChange = (event: {nativeEvent: RNCPickerChangeEvent}) => {
    setSelectedIndex(event.nativeEvent.itemIndex);
  };

  return (
    <ExampleCard>
      <Text style={styles.description}>
        Picker with placeholder text when nothing is selected
      </Text>
      <View style={styles.pickerContainer}>
        <RNCPicker
          items={items}
          selectedIndex={selectedIndex}
          placeholder="Choose a language..."
          onPickerSelect={handleChange}
          style={styles.picker}
          accessibilityLabel="Language Picker"
        />
      </View>
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Selected:</Text>
        <Text style={styles.resultValue}>
          {selectedIndex >= 0 ? items[selectedIndex]?.label : 'None'}
        </Text>
      </View>
    </ExampleCard>
  );
}

// Example 2: Basic Picker
function BasicPickerExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const items: RNCPickerItem[] = [
    {label: 'Small', value: 'sm'},
    {label: 'Medium', value: 'md'},
    {label: 'Large', value: 'lg'},
    {label: 'Extra Large', value: 'xl'},
  ];

  const handleChange = (event: {nativeEvent: RNCPickerChangeEvent}) => {
    setSelectedIndex(event.nativeEvent.itemIndex);
  };

  return (
    <ExampleCard>
      <Text style={styles.description}>Basic picker with pre-selected value</Text>
      <View style={styles.pickerContainer}>
        <RNCPicker
          testID="basic-picker"
          items={items}
          selectedIndex={selectedIndex}
          onPickerSelect={handleChange}
          style={styles.picker}
          accessibilityLabel="Size Picker"
        />
      </View>
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Size:</Text>
        <Text style={styles.resultValue}>{items[selectedIndex]?.label}</Text>
      </View>
    </ExampleCard>
  );
}

// Example 3: Disabled Picker
function DisabledPickerExample() {
  const items: RNCPickerItem[] = [
    {label: 'Option A', value: 'a'},
    {label: 'Option B (Selected)', value: 'b'},
    {label: 'Option C', value: 'c'},
  ];

  return (
    <ExampleCard>
      <Text style={styles.description}>
        Disabled picker - user cannot interact
      </Text>
      <View style={styles.pickerContainer}>
        <RNCPicker
          items={items}
          selectedIndex={1}
          enabled={false}
          style={[styles.picker, styles.pickerDisabled]}
          accessibilityLabel="Disabled Picker"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          This picker is disabled and cannot be changed
        </Text>
      </View>
    </ExampleCard>
  );
}

// Example 4: Editable Picker
function EditablePickerExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [text, setText] = React.useState('');
  const items: RNCPickerItem[] = [
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Cherry', value: 'cherry'},
    {label: 'Date', value: 'date'},
    {label: 'Elderberry', value: 'elderberry'},
  ];

  const handleChange = (event: {nativeEvent: RNCPickerChangeEvent}) => {
    setSelectedIndex(event.nativeEvent.itemIndex);
    setText(event.nativeEvent.text);
  };

  return (
    <ExampleCard>
      <Text style={styles.description}>
        Editable picker - type to filter or enter custom text
      </Text>
      <View style={styles.pickerContainer}>
        <RNCPicker
          items={items}
          selectedIndex={selectedIndex}
          editable={true}
          text={text}
          placeholder="Type or select a fruit..."
          onPickerSelect={handleChange}
          style={styles.picker}
          accessibilityLabel="Editable Fruit Picker"
        />
      </View>
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Text:</Text>
        <Text style={styles.resultValue}>{text || '(empty)'}</Text>
      </View>
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Selected Index:</Text>
        <Text style={styles.resultValue}>{selectedIndex}</Text>
      </View>
    </ExampleCard>
  );
}

// Example 5: Color Picker
function ColorPickerExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const items: RNCPickerItem[] = [
    {label: 'Red', value: 'red'},
    {label: 'Green', value: 'green'},
    {label: 'Blue', value: 'blue'},
    {label: 'Orange', value: 'orange'},
    {label: 'Purple', value: 'purple'},
  ];

  const handleChange = (event: {nativeEvent: RNCPickerChangeEvent}) => {
    setSelectedIndex(event.nativeEvent.itemIndex);
  };

  const selectedColor = items[selectedIndex]?.value || 'gray';

  return (
    <ExampleCard>
      <Text style={styles.description}>Pick a color and see it applied</Text>
      <View style={styles.pickerContainer}>
        <RNCPicker
          items={items}
          selectedIndex={selectedIndex}
          onPickerSelect={handleChange}
          style={styles.picker}
          accessibilityLabel="Color Picker"
        />
      </View>
      <View style={[styles.colorPreview, {backgroundColor: selectedColor}]}>
        <Text style={styles.colorPreviewText}>
          Selected: {items[selectedIndex]?.label}
        </Text>
      </View>
    </ExampleCard>
  );
}

// Example 6: Multiple Pickers in a Form
function FormPickerExample() {
  const [countryIndex, setCountryIndex] = React.useState(0);
  const [categoryIndex, setCategoryIndex] = React.useState(-1);

  const countries: RNCPickerItem[] = [
    {label: 'United States', value: 'us'},
    {label: 'Canada', value: 'ca'},
    {label: 'United Kingdom', value: 'uk'},
    {label: 'Germany', value: 'de'},
    {label: 'France', value: 'fr'},
    {label: 'Japan', value: 'jp'},
  ];

  const categories: RNCPickerItem[] = [
    {label: 'Electronics', value: 'electronics'},
    {label: 'Clothing', value: 'clothing'},
    {label: 'Books', value: 'books'},
    {label: 'Home & Garden', value: 'home'},
    {label: 'Sports', value: 'sports'},
  ];

  return (
    <ExampleCard>
      <Text style={styles.description}>Multiple pickers in a form layout</Text>

      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Country:</Text>
        <View style={styles.formPickerContainer}>
          <RNCPicker
            items={countries}
            selectedIndex={countryIndex}
            onPickerSelect={(e: {nativeEvent: RNCPickerChangeEvent}) =>
              setCountryIndex(e.nativeEvent.itemIndex)
            }
            style={styles.picker}
          />
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Category:</Text>
        <View style={styles.formPickerContainer}>
          <RNCPicker
            items={categories}
            selectedIndex={categoryIndex}
            placeholder="Select category..."
            onPickerSelect={(e: {nativeEvent: RNCPickerChangeEvent}) =>
              setCategoryIndex(e.nativeEvent.itemIndex)
            }
            style={styles.picker}
          />
        </View>
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Selection:</Text>
        <Text style={styles.resultValue}>
          {countries[countryIndex]?.label} /{' '}
          {categoryIndex >= 0 ? categories[categoryIndex]?.label : 'None'}
        </Text>
      </View>
    </ExampleCard>
  );
}

// Example 7: Picker with Many Items
function ManyItemsPickerExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const items: RNCPickerItem[] = Array.from({length: 50}, (_, i) => ({
    label: `Item ${i + 1}`,
    value: `item_${i + 1}`,
  }));

  return (
    <ExampleCard>
      <Text style={styles.description}>Picker with 50 items (scrollable)</Text>
      <View style={styles.pickerContainer}>
        <RNCPicker
          items={items}
          selectedIndex={selectedIndex}
          onPickerSelect={(e: {nativeEvent: RNCPickerChangeEvent}) =>
            setSelectedIndex(e.nativeEvent.itemIndex)
          }
          style={styles.picker}
        />
      </View>
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Selected:</Text>
        <Text style={styles.resultValue}>{items[selectedIndex]?.label}</Text>
      </View>
    </ExampleCard>
  );
}

// Example 8: Dynamic Items
function DynamicItemsPickerExample() {
  const INITIAL_ITEMS: RNCPickerItem[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
    { label: 'Elderberry', value: 'elderberry' },
  ];

  const [items, setItems] = React.useState<RNCPickerItem[]>(INITIAL_ITEMS);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [addedItems, setAddedItems] = React.useState<string[]>([]);
  const [removedItems, setRemovedItems] = React.useState<string[]>([]);
  const [addCounters, setAddCounters] = React.useState<Record<string, number>>({});

  /* 🔍 Always log EXACT picker items */
  React.useEffect(() => {
    console.log(
      'Picker Items:',
      items.map(i => i.label)
    );
  }, [items]);

  /* ➕ ADD */
  const addSelectedItem = () => {
    if (selectedIndex < 0 || selectedIndex >= items.length) return;

    const baseItem = items[selectedIndex];

    setAddCounters(prevCounters => {
      const nextCount = (prevCounters[baseItem.label] || 0) + 1;

      const newItem: RNCPickerItem = {
        label: `${baseItem.label} ${nextCount}`,
        value: `${baseItem.value}-${nextCount}-${Date.now()}`, // unique
      };

      // add to picker items
      setItems(prevItems => [...prevItems, newItem]);

      // log
      setAddedItems(prev => [...prev, newItem.label]);

      return {
        ...prevCounters,
        [baseItem.label]: nextCount,
      };
    });

    setSelectedIndex(-1);
  };

  /* ➖ REMOVE (AFFECTS PICKER + LOG) */
  const removeSelectedItem = () => {
    if (
      selectedIndex < 0 ||
      selectedIndex >= items.length ||
      items.length <= 1
    ) {
      return;
    }

    const removedItem = items[selectedIndex];

    setRemovedItems(prev => [...prev, removedItem.label]);
    setItems(prev => prev.filter((_, i) => i !== selectedIndex));

    // Also remove from added list if present
    setAddedItems(prev =>
      prev.filter(label => label !== removedItem.label)
    );

    setSelectedIndex(-1);
  };

  /* 🔄 RESET EVERYTHING */
  const resetItems = () => {
    setItems(INITIAL_ITEMS);
    setSelectedIndex(-1);
    setAddedItems([]);
    setRemovedItems([]);
    setAddCounters({});
  };

  return (
    <ExampleCard>
      <Text style={styles.description}>
        Select an item, then Add (log only) or Remove (from picker)
      </Text>

      <View style={styles.pickerContainer}>
        <RNCPicker
          key={items.map(i => i.value).join('|')}
          items={items}
          selectedIndex={selectedIndex}
          placeholder="Select a fruit..."
          onPickerSelect={(e: { nativeEvent: RNCPickerChangeEvent }) =>
            setSelectedIndex(e.nativeEvent.itemIndex)
          }
          style={styles.picker}
        />
      </View>

      <View style={styles.buttonGroup}>
        <View style={styles.buttonWrapper}>
          <Button
            title="+ Add"
            onPress={addSelectedItem}
            disabled={selectedIndex < 0}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="- Remove"
            onPress={removeSelectedItem}
            disabled={selectedIndex < 0 || items.length <= 1}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Reset" onPress={resetItems} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>Picker Items: {items.length}</Text>
        <Text style={styles.statsText}>
          Selected:{' '}
          {selectedIndex >= 0 ? items[selectedIndex]?.label : 'None'}
        </Text>
      </View>

      <View style={styles.currentItemsBox}>
        <Text style={styles.currentItemsLabel}>Current Items:</Text>
        <Text style={styles.currentItemsText}>
          {items.map(item => item.label).join(', ')}
        </Text>
      </View>

      {addedItems.length > 0 && (
        <View style={styles.addedItemsBox}>
          <Text style={styles.addedItemsLabel}>Added Items (Log):</Text>
          <Text style={styles.addedItemsText}>
            {addedItems.join(', ')}
          </Text>
        </View>
      )}

      {removedItems.length > 0 && (
        <View style={styles.removedItemsBox}>
          <Text style={styles.removedItemsLabel}>Removed Items:</Text>
          <Text style={styles.removedItemsText}>
            {removedItems.join(', ')}
          </Text>
        </View>
      )}
    </ExampleCard>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  picker: {
    minHeight: 32,
  },
  pickerDisabled: {
    opacity: 0.5,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 2,
  },
  resultLabel: {
    fontSize: 13,
    color: '#666',
    marginRight: 8,
  },
  resultValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0078d4',
  },
  infoBox: {
    backgroundColor: '#fff8e1',
    padding: 10,
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#ffc107',
  },
  infoText: {
    fontSize: 12,
    color: '#6d4c00',
  },
  colorPreview: {
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPreviewText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  formLabel: {
    width: 80,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  formPickerContainer: {
    flex: 1,
  },
  calculatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  numberPickerWrapper: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  numberPicker: {
    width: 60,
    minHeight: 32,
  },
  calcLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  operatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 8,
  },
  resultDisplay: {
    backgroundColor: '#0078d4',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 2,
    minWidth: 50,
    alignItems: 'center',
  },
  resultNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonWrapper: {
    marginHorizontal: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
  currentItemsBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#2196f3',
  },
  currentItemsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 4,
  },
  currentItemsText: {
    fontSize: 13,
    color: '#333',
  },
  addedItemsBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#4caf50',
  },
  addedItemsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  addedItemsText: {
    fontSize: 13,
    color: '#333',
  },
  removedItemsBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#ffebee',
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#f44336',
  },
  removedItemsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 4,
  },
  removedItemsText: {
    fontSize: 13,
    color: '#333',
  },
  statusBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#e8f4fd',
    borderRadius: 2,
  },
  statusText: {
    fontSize: 12,
    color: '#0078d4',
    textAlign: 'center',
  },
});

export const examples = [
  {
    title: 'Placeholder Picker',
    render: PlaceholderPickerExample,
  },
  {
    title: 'Basic Picker',
    render: BasicPickerExample,
  },
  {
    title: 'Disabled Picker',
    render: DisabledPickerExample,
  },
  {
    title: 'Editable Picker',
    render: EditablePickerExample,
  },
  {
    title: 'Color Picker',
    render: ColorPickerExample,
  },
  {
    title: 'Form Layout',
    render: FormPickerExample,
  },
  {
    title: 'Many Items (50)',
    render: ManyItemsPickerExample,
  },
  {
    title: 'Dynamic Items',
    render: DynamicItemsPickerExample,
  },
];
