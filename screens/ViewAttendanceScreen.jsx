import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
//import database from '@react-native-firebase/database';

const ViewAttendanceScreen = ({ route }) => {
  const { studentId } = route.params;
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch attendance data for the student from Firebase database
    const fetchData = async () => {
      try {
        const snapshot = await database()
          .ref(`attendance/${studentId}`)
          .once('value');
        const attendance = snapshot.val();
        if (attendance) {
          // Convert attendance object to array of objects with date and attendance count
          const attendanceArray = Object.keys(attendance).map((date) => ({
            date,
            count: attendance[date],
          }));
          setAttendanceData(attendanceArray);
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Perform any cleanup tasks if needed
    };
  }, [studentId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Chart</Text>
      <LineChart
        data={{
          labels: attendanceData.map((data) => data.date),
          datasets: [
            {
              data: attendanceData.map((data) => data.count),
            },
          ],
        }}
        width={400}
        height={220}
        yAxisSuffix="%"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#007AFF',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ViewAttendanceScreen;
