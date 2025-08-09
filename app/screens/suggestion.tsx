// app/screens/suggestion.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SuggestionScreen = () => {
  const [suggestion, setSuggestion] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (suggestion.trim() === '') {
      Alert.alert('Please enter a feedback.');
      return;
    }

    // You can handle submission here (e.g., send to backend)
    Alert.alert('Thank you for your feedback!');
    setSuggestion('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>User Feedback Form:</Text>
        </View>

        {/* Instructions */}
        <Text style={styles.instructions}>
          We value your input. Please let us know how we can improve!
        </Text>

        {/* Suggestion Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Write your feedback here..."
          value={suggestion}
          onChangeText={setSuggestion}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SuggestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    flexGrow: 1,
    
  },
  header: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4B7BEC',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
