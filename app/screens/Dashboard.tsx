import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();
  const pulseAnim = useState(new Animated.Value(1))[0];

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowPicker(false);
  };

  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    return {
      day: String(date.getDate()).padStart(2, '0'),
      month,
      year: String(date.getFullYear()),
    };
  };

  const { day, month, year } = formatDate(selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="menu" size={24} />
        <Text style={styles.headerText}>Fin Track</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Feather name="calendar" size={22} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoBar}>
        <View>
          <Text style={styles.dateSmall}>{day}</Text>
          <Text style={styles.dateSmall}>{month}</Text>
          <Text style={styles.dateSmall}>{year}</Text>
        </View>
        <Text style={styles.infoText}>Expenses</Text>
        <Text style={styles.infoText}>Income</Text>
        <Text style={styles.infoText}>Balance</Text>
      </View>

      {showPicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleChange}
        />
      )}
      {showPicker && Platform.OS === 'web' && (
        <View style={styles.webCalendar}>
          <input
            type="date"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setSelectedDate(date);
              setShowPicker(false);
            }}
          />
        </View>
      )}

      <View style={styles.noRecordsContainer}>
        <View style={styles.noRecords}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={60}
            color="gray"
          />
          <Text style={styles.noRecordText}>No records</Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={24}
            color="#f9c400"
          />
          <Text style={styles.navLabelActive}>Records</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/screens/charts')}
        >
          <Ionicons name="pie-chart-outline" size={24} color="gray" />
          <Text style={styles.navLabel}>Charts</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.addButtonContainer, { transform: [{ scale: pulseAnim }] }]}>
          <TouchableOpacity
            onPress={() => router.push('/screens/AddEntry')}
            style={styles.addButton}
          >
            <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="file-text" size={24} color="gray" />
          <Text style={styles.navLabel}>Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/screens/goals')}
        >
          <Ionicons name="flag" size={24} color="gray" />
          <Text style={styles.navLabel}>Goals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e8ff',
  },
  header: {
    backgroundColor: '#d0e8ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  infoBar: {
    backgroundColor: '#d0e8ff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  dateSmall: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    textAlign: 'left',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  noRecordsContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  noRecords: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noRecordText: {
    color: 'gray',
    marginTop: 8,
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingBottom: 20,
    position: 'relative',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: 'gray',
  },
  navLabelActive: {
    fontSize: 12,
    color: '#f9c400',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -28,
    zIndex: 10,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f9c400',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  webCalendar: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
