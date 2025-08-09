import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to Fin Track!',
    description: 'Track your income smartly',
    image: require('@/assets/Onboarding/slide1.png'),
  },
  {
    key: '2',
    title: 'Visualize Your Spending',
    description: 'Get a clear picture of your financial habits.',
    image: require('@/assets/Onboarding/slide2.png'),
  },
  {
    key: '3',
    title: 'Your Security, Our Priority',
    description: 'Your data is safe and secure with us.',
    image: require('@/assets/Onboarding/slide3.png'),
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleGetStarted = () => {
    router.replace('/screens/PhoneAuth');
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {currentIndex === slides.length - 1 && (
        <TouchableOpacity onPress={handleGetStarted} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Sticky Policy Box with Extra Height */}
      {currentIndex === slides.length - 1 && (
        <View style={styles.policyWrapper}>
          <View style={styles.bottomPolicyBox}>
            <Text style={styles.legalText}>
              Before using this app, you can review{' '}
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL('https://yourdomain.com/privacy')}
              >
                Privacy Policy
              </Text>{' '}
              and{' '}
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL('https://yourdomain.com/terms')}
              >
                Terms of Service
              </Text>.
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
    height: height,
  },
  image: {
    width: '80%',
    height: height * 0.35,
    marginTop: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
  policyWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#eee',
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'android' ? 25 : 20,
    paddingHorizontal: 20,
  },
  bottomPolicyBox: {
    width: '100%',
  },
  legalText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default Onboarding;
