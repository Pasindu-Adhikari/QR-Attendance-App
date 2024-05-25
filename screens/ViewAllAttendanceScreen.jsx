import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseinit';

const ViewAllAttendanceScreen = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Attendance'));
        const records = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAttendanceRecords(records);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.studentName}</Text>
      <Text style={styles.tableCell}>{item.subject}</Text>
      <Text style={styles.tableCell}>{item.date}</Text>
      <Text style={styles.tableCell}>{item.status}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Attendance Records</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Student Name</Text>
        <Text style={styles.tableHeaderCell}>Subject</Text>
        <Text style={styles.tableHeaderCell}>Date</Text>
        <Text style={styles.tableHeaderCell}>Status</Text>
      </View>
      <FlatList
        data={attendanceRecords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewAllAttendanceScreen;
