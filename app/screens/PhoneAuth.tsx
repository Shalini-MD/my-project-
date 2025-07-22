import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const handlePhoneNumberChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleanedText);

    if (cleanedText.length > 10) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      Alert.alert('OTP Sent', 'A one-time password has been sent to your phone number.');
      router.push('/screens/OTPVerification');
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Number Verification</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="number-pad"
        value={phoneNumber}
        maxLength={11}
        onChangeText={handlePhoneNumberChange}
      />

      {showError && (
        <Text style={styles.errorText}>❌ Please enter only 10 digits</Text>
      )}

      <TouchableOpacity
        style={[
          styles.sendOtpButton,
          phoneNumber.length === 10 ? null : styles.disabledButton,
        ]}
        onPress={handleSendOTP}
        disabled={phoneNumber.length !== 10}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, // spacing from top
    paddingHorizontal: 20, // spacing from left
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    textAlign: 'left',
  },
  errorText: {
    fontSize: 14,
    color: '#F44336',
    marginBottom: 10,
    textAlign: 'left',
  },
  sendOtpButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PhoneAuthScreen;
