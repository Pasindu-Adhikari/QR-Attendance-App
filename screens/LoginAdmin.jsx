import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { db } from '../firebase/firebaseinit';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getUser = () => {
    getDocs(query(collection(db,'Student')
    ,where('Student_ID','==',username))).then(ds =>{
      if(ds.size == 1){
        const dt = ds.docs[0].data();
        //Alert.alert(dt.Password);
        if (dt.Password == password){
          navigation.navigate('Student');
        }else{
          Alert.alert('Error', 'Invalid username or password.');
        }
      }else{
        Alert.alert('Error', 'Can\'t find Student !');
      }
    })
  }

  const handleLogin = () => {
    //getUser();
    // Check if username and password match for admin
    if (username === 'Admin' && password === 'Admin123') {
      // Navigate to admin page
      navigation.navigate('Admin');
    }else {
        // Display error message if authentication fails
        Alert.alert('Error', 'Invalid username or password.');
    }

  };

  

  return (
    <View style={styles.container}>
      <Image
                source={require('../assets/img/Logo.png')}
                style={styles.logo}
            />
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

export default LoginScreen ;
