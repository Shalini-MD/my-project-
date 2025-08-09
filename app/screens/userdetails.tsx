import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function UserDetails() {
  const router = useRouter();

  const [familyMembers, setFamilyMembers] = useState('');
  const [age, setAge] = useState('');
  const [incomeSource, setIncomeSource] = useState('single');
  const [totalIncome, setTotalIncome] = useState('');
  const [fixedExpenses, setFixedExpenses] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (
      familyMembers.trim() === '' ||
      age.trim() === '' ||
      incomeSource.trim() === '' ||
      totalIncome.trim() === '' ||
      fixedExpenses.trim() === ''
    ) {
      setErrorMessage('All fields are required');
      return;
    }

    const userDetails = {
      familyMembers,
      age,
      incomeSource,
      totalIncome,
      fixedExpenses,
    };

    console.log('User Details:', userDetails);
    setErrorMessage('');

    router.replace('/screens/Dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formBox}>
          <Text style={styles.heading}>Enter User Details</Text>

          <Text style={styles.label}>Number of Family Members</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={familyMembers}
            onChangeText={setFamilyMembers}
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          <Text style={styles.label}>Income Source</Text>
          <View style={styles.radioGroup}>
            {['single', 'dual', 'multi'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.radioButton}
                onPress={() => setIncomeSource(type)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    incomeSource === type && styles.radioSelected,
                  ]}
                />
                <Text style={styles.radioLabel}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Total Family Income</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={totalIncome}
            onChangeText={setTotalIncome}
          />

          <Text style={styles.label}>Fixed Family Expenses</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={fixedExpenses}
            onChangeText={setFixedExpenses}
          />

          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d0e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  formBox: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#555',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#333',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
