import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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

// Icon mapping
const goalIcons: Record<string, React.ReactNode> = {
  'Buy a laptop': <MaterialIcons name="laptop" size={24} color="black" />,
  'Travel': <Ionicons name="airplane-outline" size={24} color="black" />,
  'Fitness Equipment': <MaterialCommunityIcons name="dumbbell" size={24} color="black" />,
  'New Phone': <Feather name="smartphone" size={24} color="black" />,
  'Emergency Fund': <FontAwesome5 name="heartbeat" size={24} color="black" />,
  'Others': <Entypo name="plus" size={24} color="black" />,

  'Car': <FontAwesome5 name="car" size={24} color="black" />,
  'Business': <MaterialIcons name="business-center" size={24} color="black" />,
  'Wedding': <FontAwesome5 name="ring" size={24} color="black" />,
  'Education': <Ionicons name="school-outline" size={24} color="black" />,
  'Home Renovation': <MaterialCommunityIcons name="home-modern" size={24} color="black" />,

  'Own a house': <FontAwesome5 name="home" size={24} color="black" />,
  'Higher education': <Ionicons name="school-outline" size={24} color="black" />,
  'Retirement': <MaterialCommunityIcons name="beach" size={24} color="black" />,
  'Children’s Education': <FontAwesome5 name="child" size={24} color="black" />,
  'Long-Term Investment': <FontAwesome name="line-chart" size={24} color="black" />,
};

const SetGoals = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const goalType = typeof type === 'string' ? type : 'Goal';

  const getGoalsForType = () => {
    if (goalType === 'Short Term') {
      return [
        'Buy a laptop',
        'Travel',
        'Fitness Equipment',
        'New Phone',
        'Emergency Fund',
        'Others',
      ];
    } else if (goalType === 'Mid Term') {
      return ['Car', 'Business', 'Wedding', 'Education', 'Home Renovation', 'Others'];
    } else {
      return [
        'Own a house',
        'Higher education',
        'Retirement',
        'Children’s Education',
        'Long-Term Investment',
        'Others',
      ];
    }
  };

  const handleGoalPress = (goal: string) => {
    if (goal === 'Others') {
      router.push({ pathname: '/screens/Addgoals', params: { goalName: '', isOthers: 'true', type: goalType } });
    } else {
      router.push({ pathname: '/screens/Addgoals', params: { goalName: goal, isOthers: 'false', type: goalType } });
    }
  };

  const goals = getGoalsForType();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Set {goalType} Goal</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Goal Grid */}
      <View style={styles.whiteBox}>
        <ScrollView contentContainerStyle={styles.goalGrid}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={styles.goalItem}
              onPress={() => handleGoalPress(goal)}
            >
              <View style={styles.iconCircle}>{goalIcons[goal]}</View>
              <Text style={styles.goalText}>{goal}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SetGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e8ff',
  },
  header: {
    backgroundColor: '#d0e8ff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  whiteBox: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  goalItem: {
    width: '40%',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconCircle: {
    backgroundColor: '#e0e0e0',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },
});
