import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseinit';

const MarkAttendanceScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { qrData } = route.params; // The QR code data passed from the scanner screen
  const [studentName, setStudentName] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch student data using QR code data (e.g., student ID)
        const docRef = doc(db, 'Students', qrData); // Assuming qrData is the student ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const studentData = docSnap.data();
          setStudentName(studentData.name);
          setSubject(studentData.subject);
        } else {
          Alert.alert('Error', 'No such student found!');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        Alert.alert('Error', 'Failed to fetch student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [qrData]);

  const handleMarkAttendance = async () => {
    try {
      const attendanceRef = collection(db, 'Attendance');
      await addDoc(attendanceRef, {
        studentId: qrData,
        studentName,
        subject,
        date: new Date().toISOString(),
        status: 'Present',
      });

      Alert.alert('Success', 'Attendance marked successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error marking attendance:', error);
      Alert.alert('Error', 'Failed to mark attendance');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Student Name: {studentName}</Text>
      <Text style={styles.text}>Subject: {subject}</Text>
      <Button title="Mark Attendance" onPress={handleMarkAttendance} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MarkAttendanceScreen;
