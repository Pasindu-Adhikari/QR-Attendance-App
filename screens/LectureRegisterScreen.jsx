import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
//import firestore from '@react-native-firebase/firestore';
import { db } from '../firebase/firebaseinit';
//import { collection, getDocs, query, where, firestore } from 'firebase/firestore';

const LectureRegisterScreen = () => {
  const [lecturerName, setLecturerName] = useState('');
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Validate inputs
    if (!lecturerName.trim() || !username.trim() || !department.trim() || !subject.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    

    try {
      // Save lecturer data to Firestore
      await addDoc(collection(db, 'Lecturer' ), {
        lecturerName,
        username,
        department,
        subject,
        password,
      });

      Alert.alert('Success', 'Lecturer registered successfully');
      // Clear input fields
      setLecturerName('');
      setUsername('');
      setDepartment('');
      setSubject('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', 'Failed to register lecturer');
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

        <Text style={styles.title}>Lecturer Registration</Text>
      {/* Lecturer Name */}
      <TextInput
        style={styles.input}
        placeholder="Lecturer Name"
        value={lecturerName}
        onChangeText={(text) => setLecturerName(text)}
      />

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* Department */}
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={(text) => setDepartment(text)}
      />

      {/* Subject */}
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={(text) => setSubject(text)}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default LectureRegisterScreen;
