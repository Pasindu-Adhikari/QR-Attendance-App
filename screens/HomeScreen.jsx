import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* SLIATE logo */}
            <Image
                source={require('../assets/img/Logo.png')}
                style={styles.logo}
            />

            {/* Welcome message */}
            <Text style={styles.welcomeText}>Welcome to SLIATE QR Student Attendance System</Text>

            {/* Login button */}
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginButtonText}>Student Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Lecturer_Login")}>
                <Text style={styles.loginButtonText}>Lecturer Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Admin_Login")}>
                <Text style={styles.loginButtonText}>Admin Login</Text>
            </TouchableOpacity>

           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#ffffff', // Set your desired background color
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain', // Adjust the image size and resizeMode as needed
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#007AFF', // Set your desired button color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#ffffff', // Set your desired text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    optionButton: {
        backgroundColor: '#EFEFEF', // Set your desired option button color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '48%', // Adjust the width as needed for multiple options
    },
    optionButtonText: {
        color: '#000000', // Set your desired option text color
        fontSize: 16,
    },
});

export default HomeScreen;
