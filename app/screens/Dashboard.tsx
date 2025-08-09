import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
  Dimensions,
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
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const pulseAnim = useState(new Animated.Value(1))[0];
  const drawerAnim = useState(new Animated.Value(-300))[0];

  const router = useRouter();

  useEffect(() => {
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

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -300,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setDrawerVisible(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Feather name="menu" size={24} />
        </TouchableOpacity>
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

  {/* Placeholder for space under the "+" button */}
  <View style={{ width: 56 }} />
  <Animated.View
  style={[
    styles.addButtonContainer,
    { transform: [{ scale: pulseAnim }] },
  ]}
>
  <TouchableOpacity
    onPress={() => router.push('/screens/AddEntry')}
    style={styles.addButton}
  >
    <FontAwesome name="plus" size={24} color="white" />
  </TouchableOpacity>
</Animated.View>


  <TouchableOpacity
    style={styles.navItem}
    onPress={() => router.push('/screens/Reports')}
  >
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


      {/* Drawer Modal */}
      {isDrawerVisible && (
        <TouchableOpacity
          style={styles.drawerOverlay}
          activeOpacity={1}
          onPress={closeDrawer}
        >
          <Animated.View style={[styles.drawerContainer, { left: drawerAnim }]}>
            <View style={styles.drawerHeader}>
              <View style={styles.logoCircle}>
                <Text style={{ fontSize: 20, color: 'black' }}>FT</Text>
              </View>
              <Text style={styles.drawerHi}>Hi, Username</Text>
            </View>

           <View style={styles.drawerContent}>
  <TouchableOpacity
    style={styles.drawerItem}
    onPress={() => {
      closeDrawer();
      router.push('/screens/security'); // <-- Add this screen
    }}
  >
    <Feather name="shield" size={20} color="#333" />
    <Text style={styles.drawerText}>Security</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.drawerItem}
    onPress={() => {
      closeDrawer();
      router.push('/screens/backup'); // <-- Add this screen
    }}
  >
    <Feather name="cloud" size={20} color="#333" />
    <Text style={styles.drawerText}>Backup</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.drawerItem}
    onPress={() => {
      closeDrawer();
      router.push('/screens/suggestion');
    }}
  >
    <Feather name="message-square" size={20} color="#333" />
    <Text style={styles.drawerText}>Feedback</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.drawerItem}
    onPress={() => {
      closeDrawer();
      router.push('/screens/ratings'); // <-- Add this screen
    }}
  >
    <Feather name="star" size={20} color="#333" />
    <Text style={styles.drawerText}>Ratings</Text>
  </TouchableOpacity>
</View>

          </Animated.View>
        </TouchableOpacity>
      )}
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
    
    marginVertical: 20,
    borderRadius: 1,
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
    paddingBottom: 50,
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
    bottom: 50,
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
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 20,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: 'white',
    zIndex: 30,
  },
  drawerHeader: {
    backgroundColor: '#d0e8ff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 2,
  },
  drawerHi: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  drawerContent: {
    padding: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  drawerText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});
