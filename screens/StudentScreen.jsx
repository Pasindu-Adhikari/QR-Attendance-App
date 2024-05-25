import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StudentScreen = ({ route, navigation }) => {
  const { username, studentId } = route.params;

  const handleScanQRCode = () => navigation.navigate('Qr_Scan');

  const handleViewPreviousAttendance = () => {
    () => navigation.navigate('ViewStudentAttendance', { username });
  };

  const handleLogout = () => navigation.navigate('Home');

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {username}</Text>

      <TouchableOpacity style={styles.option} onPress={handleScanQRCode}>
        <Text style={styles.optionText}>Scan QR Code and Mark Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleViewPreviousAttendance}>
        <Text style={styles.optionText}>View Previous Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.optionText, styles.logoutButtonText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#007AFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    color: '#ffffff',
  },
});

export default StudentScreen;
