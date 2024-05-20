import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LectureScreen = ({navigation}) => {
    // Function to handle generating QR code
    const handleGenerateQRCode = () => navigation.navigate("Qr_Generate");

    // Function to handle viewing student's attendance
    const handleViewAttendance = () => {
        console.log('View Student\'s Attendance');
    };

    // Function to handle viewing exam eligibility
    const handleViewExamEligibility = () => {
        console.log('View Exam Eligibility');
    };

    // Function to handle generating attendance report
    const handleGenerateAttendanceReport = () => {
        console.log('Generate Attendance Report');
    };

    // Function to handle logging out
    const handleLogout =  () => navigation.navigate("Home");

    return (
        <View style={styles.container}>
            {/* Generate QR Code */}
            <TouchableOpacity style={styles.option} onPress={handleGenerateQRCode}>
                <Text style={styles.optionText}>Generate QR Code</Text>
            </TouchableOpacity>

            {/* View Student's Attendance */}
            <TouchableOpacity style={styles.option} onPress={handleViewAttendance}>
                <Text style={styles.optionText}>View Student's Attendance</Text>
            </TouchableOpacity>

            {/* View Exam Eligibility */}
            <TouchableOpacity style={styles.option} onPress={handleViewExamEligibility}>
                <Text style={styles.optionText}>View Exam Eligibility</Text>
            </TouchableOpacity>

            {/* Generate Attendance Report */}
            <TouchableOpacity style={styles.option} onPress={handleGenerateAttendanceReport}>
                <Text style={styles.optionText}>Generate Attendance Report</Text>
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

export default LectureScreen;
