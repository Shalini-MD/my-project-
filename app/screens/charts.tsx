import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function StatsScreen() {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [periodModalVisible, setPeriodModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ month: 7, year: 2025 });

  const periods = ['Monthly', 'Weekly', 'Periodically', 'Annually'];
  const chartData: any[] = []; // replace with dynamic data
  const router = useRouter();

  const renderMonthItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      style={styles.monthItem}
      onPress={() => {
        setSelectedDate({ ...selectedDate, month: index });
        setShowDatePicker(false);
      }}
    >
      <Text style={styles.monthText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
     <TouchableOpacity onPress={() => router.push('./Dashboard')}>
  <Ionicons name="arrow-back" size={24} color="black" />
</TouchableOpacity>


        <View style={styles.datePeriodContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{`< ${months[selectedDate.month]} ${selectedDate.year} >`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPeriodModalVisible(true)}
            style={styles.periodButton}
          >
            <Text style={styles.periodText}>Monthly</Text>
            <Feather name="chevron-down" size={16} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Toggle Buttons */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, type === 'expense' && styles.activeButton]}
          onPress={() => setType('expense')}
        >
          <Text style={type === 'expense' ? styles.activeText : styles.inactiveText}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, type === 'income' && styles.activeButtonBlue]}
          onPress={() => setType('income')}
        >
          <Text style={type === 'income' ? styles.activeText : styles.inactiveText}>Income</Text>
        </TouchableOpacity>
      </View>

      {/* Chart / No Data */}
      <View style={styles.whiteBox}>
        {chartData.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data available</Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Charts</Text>
            <PieChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: () => `#000`,
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              hasLegend={true}
              center={[0, 0]}
            />
          </>
        )}
      </View>

      {/* Period Modal */}
      <Modal visible={periodModalVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setPeriodModalVisible(false)}>
          <View style={styles.modalContent}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPeriodModalVisible(false)}
                style={styles.modalItem}
              >
                <Text style={{ fontSize: 16 }}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Month Picker Modal */}
      <Modal visible={showDatePicker} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.yearContainer}>
              <TouchableOpacity onPress={() => setSelectedDate({ ...selectedDate, year: selectedDate.year - 1 })}>
                <Ionicons name="chevron-back" size={20} />
              </TouchableOpacity>
              <Text style={styles.yearText}>{selectedDate.year}</Text>
              <TouchableOpacity onPress={() => setSelectedDate({ ...selectedDate, year: selectedDate.year + 1 })}>
                <Ionicons name="chevron-forward" size={20} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={months}
              keyExtractor={(item) => item}
              numColumns={3}
              renderItem={renderMonthItem}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0e8ff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16,
  },
  datePeriodContainer: { alignItems: 'center' },
  dateText: { fontWeight: 'bold', fontSize: 16 },
  periodButton: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  periodText: { marginRight: 4 },
  switchContainer: {
    flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, justifyContent: 'space-between',
  },
  switchButton: {
    flex: 1, padding: 12, borderRadius: 10, marginHorizontal: 5, alignItems: 'center', borderWidth: 1, borderColor: '#ccc',
  },
  activeButton: { backgroundColor: 'black' },
  activeButtonBlue: { backgroundColor: 'black' },
  activeText: { color: 'white', fontWeight: '600' },
  inactiveText: { color: 'black', fontWeight: '600' },

  whiteBox: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16, fontWeight: '600', marginBottom: 10, textAlign: 'center',
  },
  noDataContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  noDataText: { fontSize: 16, color: '#999' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white', padding: 20, borderTopLeftRadius: 12, borderTopRightRadius: 12,
  },
  modalItem: { paddingVertical: 10 },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  yearContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  yearText: {
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  monthItem: {
    width: '30%',
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 14,
    color: '#333',
  },
});
