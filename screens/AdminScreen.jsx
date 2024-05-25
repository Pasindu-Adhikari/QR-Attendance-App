import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* Add Student */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Student_Reg")}>
                <Text style={styles.optionText}>Add Student</Text>
            </TouchableOpacity>

            {/* Add Lecturer */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Lecture_Reg")}>
                <Text style={styles.optionText}>Add Lecturer</Text>
            </TouchableOpacity>

            {/* View Student Details */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ViewStudentDetails')}>
                <Text style={styles.optionText}>View Student Details</Text>
            </TouchableOpacity>

            {/* View Lecturer Details */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ViewLecturerDetails')}>
                <Text style={styles.optionText}>View Lecturer Details</Text>
            </TouchableOpacity>

            {/* View Student Attendance */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ViewAllAttendance')}>
                <Text style={styles.optionText}>View Student Attendance</Text>
            </TouchableOpacity>

           

            <TouchableOpacity style={[styles.option, styles.logoutButton]} onPress={() => navigation.navigate("Home")}>
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
});

export default AdminScreen;
