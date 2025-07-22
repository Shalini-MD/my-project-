import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';

const goalIcons: Record<string, React.ReactElement> = {
  'Buy a laptop': <MaterialIcons name="laptop" size={40} color="black" />,
  'Travel': <Ionicons name="airplane-outline" size={40} color="black" />,
  'Fitness Equipment': <MaterialCommunityIcons name="dumbbell" size={40} color="black" />,
  'New Phone': <Feather name="smartphone" size={40} color="black" />,
  'Emergency Fund': <FontAwesome5 name="heartbeat" size={40} color="black" />,
  'Car': <FontAwesome5 name="car" size={40} color="black" />,
  'Business': <MaterialIcons name="business-center" size={40} color="black" />,
  'Wedding': <FontAwesome5 name="ring" size={40} color="black" />,
  'Education': <Ionicons name="school-outline" size={40} color="black" />,
  'Own a house': <FontAwesome5 name="home" size={40} color="black" />,
  'Higher education': <Ionicons name="school-outline" size={40} color="black" />,
  'Retirement': <MaterialCommunityIcons name="beach" size={40} color="black" />,
  'Children’s Education': <FontAwesome5 name="child" size={40} color="black" />,
  'Long-Term Investment': <FontAwesome name="line-chart" size={40} color="black" />,
  'Others': <Entypo name="plus" size={40} color="gray" />,
};

export default function AddGoal() {
  const router = useRouter();
  const { goalName, type } = useLocalSearchParams();

  const [name, setName] = useState(typeof goalName === 'string' ? goalName : '');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [currency] = useState('₹');

  const getIcon = (text: string) => {
    return goalIcons[text] || goalIcons['Others'];
  };

  const handleDone = () => {
    if (!name.trim() || !amount.trim()) {
      alert('Goal name and amount are required!');
      return;
    }

    const newGoal = {
      name,
      amount: Number(amount),
      note,
      icon: name,
      currentAmount: 0,
      type: type || 'Short Term',
    };

    const encoded = JSON.stringify(newGoal);

    router.replace({
      pathname: '/screens/goals',
      params: { newGoal: encoded },
    });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>Create New Goal</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Goal Image</Text>
            <View style={styles.iconCircle}>{getIcon(name)}</View>

            <TextInput
              style={styles.input}
              placeholder="Goal name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Goal Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Note (optional)"
              value={note}
              onChangeText={setNote}
            />

            <View style={styles.currencyRow}>
              <Text style={styles.currencyLabel}>Currency:</Text>
              <View style={styles.currencyBox}>
                <Text style={styles.currencyText}>{currency}</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.buttonText}>DONE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#f0f4f7',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f9c400',
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  iconCircle: {
    alignSelf: 'center',
    backgroundColor: '#e0e0e0',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currencyLabel: {
    fontSize: 16,
    flex: 1,
  },
  currencyBox: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  doneButton: {
    backgroundColor: '#f9c400',
    flex: 1,
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
});
