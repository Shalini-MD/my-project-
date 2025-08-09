// AddEntry.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Platform
} from 'react-native';
import {
  Feather, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome5
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddEntry() {
  const [selectedType, setSelectedType] = useState<'expense' | 'income'>('expense');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  const router = useRouter();

  const openModal = (category: string) => {
    setSelectedCategory(category);
    setAmount('');
    setNote('');
    setDate(new Date());
    setDateSelected(false);
    setModalVisible(true);
  };

  const handleKeyPress = (val: string) => {
    if (val === 'del') {
      setAmount((prev) => prev.slice(0, -1));
    } else if (val === 'ok') {
      if (!amount) {
  Alert.alert('Error', 'Please enter amount');
  return;
}
Alert.alert(
  'Success',
  `Saved ${selectedCategory}: ₹${amount} on ${date.toLocaleDateString()}${note ? ` (Note: ${note})` : ''}`
);
setModalVisible(false);

    } else if (val === '+') {
      setAmount((prev) => (prev ? (parseFloat(prev) + 1).toFixed(2) : '1'));
    } else if (val === '-') {
      setAmount((prev) => {
        const num = parseFloat(prev || '0');
        return num > 1 ? (num - 1).toFixed(2) : '0';
      });
    } else if (val === 'calendar') {
      setShowCalendar(true);
    } else {
      setAmount((prev) => prev + val);
    }
  };

  const renderKey = (label: string, icon?: React.ReactNode) => (
    <TouchableOpacity key={label} style={styles.key} onPress={() => handleKeyPress(label)}>
      {icon || <Text style={styles.keyText}>{label}</Text>}
    </TouchableOpacity>
  );

  const expenseCategories = [
    { name: 'Shopping', icon: () => <FontAwesome name="shopping-bag" size={24} color="#333" /> },
    { name: 'Food', icon: () => <Ionicons name="fast-food-outline" size={24} color="#333" /> },
    { name: 'Phone', icon: () => <Feather name="phone" size={24} color="#333" /> },
    { name: 'Entertainment', icon: () => <MaterialIcons name="movie" size={24} color="#333" /> },
    { name: 'Education', icon: () => <Ionicons name="school-outline" size={24} color="#333" /> },
    { name: 'Beauty', icon: () => <Ionicons name="rose-outline" size={24} color="#333" /> },
    { name: 'Transport', icon: () => <Feather name="truck" size={24} color="#333" /> },
    { name: 'Alcohol', icon: () => <MaterialCommunityIcons name="glass-wine" size={24} color="#333" /> },
    { name: 'Pets', icon: () => <FontAwesome5 name="dog" size={24} color="#333" /> },
    { name: 'Snacks', icon: () => <MaterialCommunityIcons name="food" size={24} color="#333" /> },
    { name: 'Fruits', icon: () => <MaterialCommunityIcons name="fruit-cherries" size={24} color="#333" /> },
    { name: 'Clothing', icon: () => <Ionicons name="shirt-outline" size={24} color="#333" /> },
    { name: 'Electronics', icon: () => <FontAwesome5 name="tv" size={24} color="#333" /> },
    { name: 'Repairs', icon: () => <Feather name="tool" size={24} color="#333" /> },
    { name: 'Kids', icon: () => <Ionicons name="happy-outline" size={24} color="#333" /> },
    { name: 'Car', icon: () => <FontAwesome name="car" size={24} color="#333" /> },
    { name: 'Travel', icon: () => <Entypo name="map" size={24} color="#333" /> },
    { name: 'Housing', icon: () => <Ionicons name="home-outline" size={24} color="#333" /> },
    { name: 'Vegetables', icon: () => <MaterialCommunityIcons name="food-apple" size={24} color="#333" /> },
    { name: 'Others', icon: () => <Feather name="grid" size={24} color="#333" /> },
  ];

  const incomeCategories = [
    { name: 'Salary', icon: () => <FontAwesome name="money" size={24} color="#333" /> },
    { name: 'Rent', icon: () => <MaterialIcons name="house-siding" size={24} color="#333" /> },
    { name: 'Part Time', icon: () => <Ionicons name="briefcase-outline" size={24} color="#333" /> },
    { name: 'Lottery', icon: () => <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="#333" /> },
    { name: 'Bonus', icon: () => <Feather name="gift" size={24} color="#333" /> },
    { name: 'Others', icon: () => <Feather name="grid" size={24} color="#333" /> },
  ];

  const currentCategories = selectedType === 'expense' ? expenseCategories : incomeCategories;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Entry</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Switch Type */}
      <View style={styles.switchContainer}>
        {['expense', 'income'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.switchButton, selectedType === type && styles.activeButton]}
            onPress={() => setSelectedType(type as 'expense' | 'income')}
          >
            <Text style={selectedType === type ? styles.activeText : styles.inactiveText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category Grid */}
      <ScrollView style={styles.whiteBox} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.grid}>
          {currentCategories.map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridItem} onPress={() => openModal(item.name)}>
              <View style={styles.iconCircle}>{item.icon()}</View>
              <Text style={styles.iconLabel}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <TouchableOpacity activeOpacity={1} onPressOut={() => setModalVisible(false)} style={styles.modalOverlay}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Enter Amount for {selectedCategory}</Text>
            <Text style={styles.amountText}>{amount || '0'}</Text>

            <TextInput
              style={styles.noteInput}
              placeholder="Note (optional)..."
              value={note}
              onChangeText={setNote}
            />

            <View style={styles.keypadWrapper}>
              <View style={styles.numpad}>
                {[
                  ['7', '8', '9'],
                  ['4', '5', '6'],
                  ['1', '2', '3'],
                  ['.', '0', 'del']
                ].map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map((key) =>
                      key === 'del'
                        ? renderKey('del', <Feather name="delete" size={20} />)
                        : renderKey(key)
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.actionPad}>
                <TouchableOpacity style={styles.key} onPress={() => handleKeyPress('calendar')}>
                  {dateSelected ? (
                    <Text style={{ fontSize: 12, textAlign: 'center' }}>
                      {date.toLocaleDateString()}
                    </Text>
                  ) : (
                    <Feather name="calendar" size={20} />
                  )}
                </TouchableOpacity>
                {renderKey('+')}
                {renderKey('-')}
                {renderKey('ok', <Text style={{ color: 'white', fontWeight: 'bold' }}>Done</Text>)}
              </View>
            </View>

            {showCalendar && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setShowCalendar(false);
                  setDate(currentDate);
                  setDateSelected(true);
                }}
              />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0e8ff' },
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 15, justifyContent: 'space-between',
  },
  headerText: { fontSize: 18, fontWeight: 'bold' },
  switchContainer: {
    flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, justifyContent: 'space-between',
  },
  switchButton: {
    flex: 1, padding: 12, borderRadius: 10, marginHorizontal: 5, alignItems: 'center', borderWidth: 1, borderColor: '#ccc',
  },
  activeButton: { backgroundColor: 'black' },
  activeText: { color: 'white', fontWeight: '600' },
  inactiveText: { color: 'black', fontWeight: '600' },
  whiteBox: { backgroundColor: 'white', flex: 1, paddingHorizontal: 10, paddingTop: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '33.33%', alignItems: 'center', marginVertical: 15 },
  iconCircle: { backgroundColor: '#eee', padding: 15, borderRadius: 50, marginBottom: 5 },
  iconLabel: { textAlign: 'center', fontSize: 12, color: '#333' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderTopRightRadius: 16, borderTopLeftRadius: 16 },
  cancelButton: { alignSelf: 'flex-end', padding: 4, marginBottom: 4 },
  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, textAlign: 'center' },
  amountText: { fontSize: 28, fontWeight: 'bold', textAlign: 'right', marginBottom: 10 },
  noteInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  keypadWrapper: { flexDirection: 'row' },
  numpad: { flex: 3 },
  actionPad: { flex: 1, justifyContent: 'space-between' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  key: {
    flex: 1, backgroundColor: '#ccc', height: 60,
    borderRadius: 10, justifyContent: 'center', alignItems: 'center', margin: 5,
  },
  keyText: { fontSize: 20, fontWeight: '500' },
});
