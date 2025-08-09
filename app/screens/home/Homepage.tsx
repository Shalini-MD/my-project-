// app/screens/home/Homepage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { testApi } from '../../utils/api/api'; // go up 2 folders to utils

const Homepage = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = await testApi();
        setMessage(data);
      } catch (error) {
        setMessage('Failed to load message');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Text style={styles.text}>Message from API: {message}</Text>
      )}
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
