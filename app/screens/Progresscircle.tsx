import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.5;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressCircle() {
  const { goal } = useLocalSearchParams();
  const parsedGoal = goal ? JSON.parse(goal as string) : null;

  if (!parsedGoal) {
    return (
      <View style={styles.centered}>
        <Text>Invalid Goal</Text>
      </View>
    );
  }

  const { name, amount, currentAmount } = parsedGoal;
  const percentage = Math.min((currentAmount / amount) * 100, 100);
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Goal Progress</Text>

      <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={styles.svg}>
        <Circle
          stroke="#e0e0e0"
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        <Circle
          stroke="#f9c400"
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={CIRCLE_SIZE / 2}
          originY={CIRCLE_SIZE / 2}
        />
      </Svg>

      <View style={styles.amountInfo}>
        <Text style={styles.goalName}>{name}</Text>
        <Text style={styles.goalValue}>Target: ₹{amount}</Text>
        <Text style={styles.goalValue}>Saved: ₹{currentAmount}</Text>
        <Text style={styles.goalValue}>Remaining: ₹{amount - currentAmount}</Text>
        <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e8ff',
    alignItems: 'center',
    paddingTop: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  svg: {
    marginBottom: 30,
  },
  amountInfo: {
    alignItems: 'center',
  },
  goalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  goalValue: {
    fontSize: 16,
    marginVertical: 2,
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9c400',
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
