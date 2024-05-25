import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { db } from '../firebase/firebaseinit';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getUser = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'Student'), where('studentId', '==', username)));
      if (querySnapshot.size === 1) {
        const userDoc = querySnapshot.docs[0].data();
        if (userDoc.password === password) {
          navigation.navigate('Student', { username });
        } else {
          Alert.alert('Error', 'Invalid username or password.');
        }
      } else {
        Alert.alert('Error', 'Cannot find Student!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to retrieve student data.');
      console.error(error);
    }
  };

  const handleLogin = () => {
    getUser();
    // Check if username and password match for admin
    if (username === 'Admin' && password === 'Admin123') {
      // Navigate to admin page
      navigation.navigate('Admin');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: RFValue(20),
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
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

export default LoginScreen;
