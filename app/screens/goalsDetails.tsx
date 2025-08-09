// GoalDetails.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams } from 'expo-router';
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';

const goalIcons: Record<string, React.ReactNode> = {
  'Buy a laptop': <MaterialIcons name="laptop" size={30} color="black" />,
  Travel: <Ionicons name="airplane-outline" size={30} color="black" />,
  'Fitness Equipment': <MaterialCommunityIcons name="dumbbell" size={30} color="black" />,
  'New Phone': <Feather name="smartphone" size={30} color="black" />,
  'Emergency Fund': <FontAwesome5 name="heartbeat" size={30} color="black" />,
  Others: <Entypo name="plus" size={30} color="black" />,
  Car: <FontAwesome5 name="car" size={30} color="black" />,
  Business: <MaterialIcons name="business-center" size={30} color="black" />,
  Wedding: <FontAwesome5 name="ring" size={30} color="black" />,
  Education: <Ionicons name="school-outline" size={30} color="black" />,
  'Own a house': <FontAwesome5 name="home" size={30} color="black" />,
  'Higher education': <Ionicons name="school-outline" size={30} color="black" />,
  Retirement: <MaterialCommunityIcons name="beach" size={30} color="black" />,
  'Children’s Education': <FontAwesome5 name="child" size={30} color="black" />,
  'Long-Term Investment': <FontAwesome name="line-chart" size={30} color="black" />,
};

export default function GoalDetails() {
  const params = useLocalSearchParams();
  const { name, amount, note, icon, currentAmount = 0 } = params;

  const goalName = String(name ?? 'Unknown Goal');
  const goalAmount = Number(amount ?? 0);
  const savedAmount = Number(currentAmount ?? 0);
  const remainingAmount = goalAmount - savedAmount;
  const progress = goalAmount > 0 ? savedAmount / goalAmount : 0;

  const [inputAmount, setInputAmount] = useState('');
  const [inputNote, setInputNote] = useState('');
  const [transactionType, setTransactionType] = useState<'saving' | 'withdraw'>('saving');
  const [showForm, setShowForm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTargetDate(selectedDate);
      const today = new Date();
      const timeDiff = selectedDate.getTime() - today.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysLeft(days);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          {goalIcons[goalName] ?? goalIcons['Others']}
        </View>
        <Text style={styles.goalTitle}>{goalName}</Text>

        <View style={styles.progressContainer}>
          <Svg width={120} height={120}>
            <Circle cx="60" cy="60" r="50" stroke="#e6e6e6" strokeWidth="10" fill="none" />
            <Circle
              cx="60"
              cy="60"
              r="50"
              stroke="#3b82f6"
              strokeWidth="10"
              fill="none"
              strokeDasharray={314}
              strokeDashoffset={314 - 314 * progress}
              strokeLinecap="round"
              rotation="-90"
              origin="60,60"
            />
          </Svg>
          <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>SAVED</Text>
            <Text style={styles.summaryValue}>₹{savedAmount}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>REMAINING</Text>
            <Text style={styles.summaryValue}>₹{remainingAmount}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>GOAL</Text>
            <Text style={styles.summaryValue}>₹{goalAmount}</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(!showForm)}>
            <Text style={styles.addButtonText}>+ ADD SAVING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>SET TARGET DATE</Text>
            {daysLeft !== null && <Text style={styles.daysLeft}>{daysLeft} days left</Text>}
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={targetDate || new Date()}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Add New Savings or Withdraw</Text>

          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={inputAmount}
            onChangeText={setInputAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Note"
            value={inputNote}
            onChangeText={setInputNote}
          />

          <View style={styles.typeRow}>
            <TouchableOpacity
              style={transactionType === 'saving' ? styles.selectedType : styles.typeOption}
              onPress={() => setTransactionType('saving')}
            >
              <View style={styles.dotGreen} />
              <Text style={styles.typeText}>Saving</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={transactionType === 'withdraw' ? styles.selectedType : styles.typeOption}
              onPress={() => setTransactionType('withdraw')}
            >
              <View style={styles.dotBrown} />
              <Text style={styles.typeText}>Withdraw</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneButtonText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  goalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#facc15',
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#bfdbfe',
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateButtonText: {
    fontWeight: '700',
    color: '#1d4ed8',
  },
  daysLeft: {
    fontSize: 12,
    color: '#6b7280',
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedType: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
    padding: 6,
  },
  dotGreen: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
    marginRight: 6,
  },
  dotBrown: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'brown',
    marginRight: 6,
  },
  typeText: {
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '700',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#facc15',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#000',
    fontWeight: '700',
  },
});
