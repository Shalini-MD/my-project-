import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const goalIcons: Record<string, React.ReactElement> = {
  'Buy a laptop': <FontAwesome name="laptop" size={24} color="black" />,
  'Travel': <Ionicons name="airplane-outline" size={24} color="black" />,
  'Fitness Equipment': <FontAwesome name="heart" size={24} color="black" />,
  'New Phone': <FontAwesome name="mobile" size={24} color="black" />,
  'Emergency Fund': <FontAwesome name="medkit" size={24} color="black" />,
  'Car': <FontAwesome name="car" size={24} color="black" />,
  'Business': <FontAwesome name="briefcase" size={24} color="black" />,
  'Wedding': <FontAwesome name="diamond" size={24} color="black" />,
  'Education': <FontAwesome name="graduation-cap" size={24} color="black" />,
  'Home Renovation': <FontAwesome name="home" size={24} color="black" />,
  'Own a house': <FontAwesome name="building" size={24} color="black" />,
  'Higher education': <FontAwesome name="graduation-cap" size={24} color="black" />,
  'Retirement': <FontAwesome name="umbrella" size={24} color="black" />,
  'Children’s Education': <FontAwesome name="child" size={24} color="black" />,
  'Long-Term Investment': <FontAwesome name="line-chart" size={24} color="black" />,
  'Others': <FontAwesome name="ellipsis-h" size={24} color="black" />,
};

const Goals = () => {
  const router = useRouter();
  const { newGoal } = useLocalSearchParams();

  const [goals, setGoals] = useState<Record<string, any[]>>({
    'Short Term': [],
    'Mid Term': [],
    'Long Term': [],
  });

  const [selectedGoalType, setSelectedGoalType] = useState('Short Term');
  const goalTypes = ['Short Term', 'Mid Term', 'Long Term'];

  useEffect(() => {
    if (newGoal) {
      try {
        const parsedGoal = JSON.parse(newGoal as string);
        const type = parsedGoal.type || 'Short Term';

        setGoals((prev) => ({
          ...prev,
          [type]: [...(prev[type] || []), parsedGoal],
        }));
        setSelectedGoalType(type);
      } catch (error) {
        console.log('Failed to parse newGoal:', error);
      }
    }
  }, [newGoal]);

  const selectedGoals = goals[selectedGoalType] || [];

  const handleGoalPress = (goal: any) => {
    router.replace({
      pathname: '/screens/Progresscircle',
      params: {
        goal: JSON.stringify(goal),
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Goals</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Goal Type Tabs */}
      <View style={styles.goalTypeSelector}>
        {goalTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.goalTypeButton,
              selectedGoalType === type ? styles.selectedType : styles.unselectedType,
            ]}
            onPress={() => setSelectedGoalType(type)}
          >
            <Text
              style={[
                styles.goalTypeText,
                selectedGoalType === type ? styles.selectedText : styles.unselectedText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Goal Content */}
      <View style={styles.contentBox}>
        {selectedGoals.length === 0 ? (
          <View style={styles.centeredBox}>
            <Text style={styles.noRecordText}>No records</Text>
          </View>
        ) : (
          <ScrollView>
            {selectedGoals.map((goal, index) => (
              <TouchableOpacity
                key={index}
                style={styles.goalCard}
                onPress={() => handleGoalPress(goal)}
              >
                <View style={styles.goalHeader}>
                  <View style={styles.iconBox}>
                    {goalIcons[goal.icon] || (
                      <FontAwesome name="bullseye" size={24} color="black" />
                    )}
                  </View>
                  <Text style={styles.goalTitle}>{goal.name}</Text>
                  <Text style={styles.goalAmount}>
                    ₹ {goal.amount.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progress,
                      {
                        width: `${(goal.currentAmount / goal.amount) * 100}%`,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '/screens/SetGoals',
              params: { type: selectedGoalType },
            })
          }
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e8ff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalTypeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  goalTypeButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: 'black',
  },
  unselectedType: {
    backgroundColor: '#a0cfff',
  },
  goalTypeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: 'black',
  },
  contentBox: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
  },
  centeredBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    fontSize: 16,
    color: 'gray',
  },
  goalCard: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: '#d0e8ff',
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  goalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  goalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9c400',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progress: {
    height: 8,
    backgroundColor: '#f9c400',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  addButton: {
    backgroundColor: '#f9c400',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
