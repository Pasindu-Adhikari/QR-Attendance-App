import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
//import firestore from '@react-native-firebase/firestore';
import { db } from '../firebase/firebaseinit';

const StudentRegScreen = () => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Validate inputs
    if (!studentName.trim() || !studentId.trim() || !department.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      // Save Student data to Firestore
      await addDoc(collection(db, 'Student'), {
        studentName,
        studentId,
        department,
        password,
      });

      Alert.alert('Success', 'Student registered successfully');
      // Clear input fields
      setStudentName('');
      setStudentId('');
      setDepartment('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', 'Failed to register Student');
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      

       {/* SLIATE logo */}
       <Image
                source={require('../assets/img/Logo.png')}
                style={styles.logo}
            />
      <Text style={styles.title}>Student Registration</Text>
      {/* Student Name */}
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={(text) => setStudentName(text)}
      />

      {/* Student ID */}
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={studentId}
        onChangeText={(text) => setStudentId(text)}
      />

      {/* Department */}
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={(text) => setDepartment(text)}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Confirm Password */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(20),
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain', // Adjust the image size and resizeMode as needed
    marginBottom: 20,
},
  input: {
    width: '100%',
    height: RFValue(40),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(10),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: RFValue(40),
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(5),
    marginTop: RFValue(20),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
});

export default StudentRegScreen;
