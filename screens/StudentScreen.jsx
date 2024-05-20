import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StudentScreen = ({navigation}) => {
    // Function to handle scanning QR code
    const handleScanQRCode = () => navigation.navigate("Qr_Scan");

   
    // Function to handle viewing previous attendance
    const handleViewPreviousAttendance = () => {
        console.log('View Previous Attendance');
    };

    // Function to handle logging out
    const handleLogout = () => navigation.navigate("Home");

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to SLIATE QR Student Attendance System</Text>

            {/* Scan QR Code */}
            <TouchableOpacity style={styles.option} onPress={handleScanQRCode}>
                <Text style={styles.optionText}>Scan QR Code and Mark Attendance</Text>
            </TouchableOpacity>

           

            {/* View Previous Attendance */}
            <TouchableOpacity style={styles.option} onPress={handleViewPreviousAttendance}>
                <Text style={styles.optionText}>View Previous Attendance</Text>
            </TouchableOpacity>

            {/* Logout */}
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
        backgroundColor: '#ffffff', // Set your desired background color
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    option: {
        backgroundColor: '#007AFF', // Set your desired button color
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    optionText: {
        color: '#ffffff', // Set your desired text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#FF3B30', // Red color for logout button
    },
    logoutButtonText: {
        color: '#ffffff', // White color for logout button text
    },
});

export default StudentScreen;
