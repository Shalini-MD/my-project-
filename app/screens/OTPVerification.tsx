import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);
  const router = useRouter();

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Auto verify OTP
  useEffect(() => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length === 6) {
      if (enteredOTP === '123456') {
        setIsVerified(true);
        Alert.alert('✔️ OTP Verified Successfully!');
      } else {
        Alert.alert('❌ Invalid OTP');
      }
    }
  }, [otp]);

  const handleChange = (text: string, index: number) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) inputRefs.current[index + 1]?.focus();
      if (!text && index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    setCanResend(false);
    setIsVerified(false);
    Alert.alert('OTP Resent', 'New OTP sent to your number.');
    inputRefs.current[0]?.focus();
  };

  const handleNext = () => {
    router.push('/screens/Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter The OTP</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <Text style={styles.timerText}>
        {canResend ? 'Didn’t receive the code?' : `Resend in ${timer}s`}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={handleResend}
          disabled={!canResend}
          style={[
            styles.resendButton,
            !canResend && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>Regenerate OTP</Text>
        </TouchableOpacity>

        {isVerified && (
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'left',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 10,
    marginBottom: 15,
  },
  otpInput: {
    width: 40,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 6,
    fontSize: 18,
  },
  timerText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  resendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
