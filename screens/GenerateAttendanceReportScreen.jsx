import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseinit';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
//import RNFS from 'react-native-fs';

const GenerateAttendanceReportScreen = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Attendance'));
        const records = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAttendanceRecords(records);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const generatePDF = async () => {
    setGenerating(true);
    const htmlContent = `
      <html>
        <head>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Attendance Report</h1>
          <table>
            <tr>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            ${attendanceRecords.map(record => `
              <tr>
                <td>${record.studentName}</td>
                <td>${record.subject}</td>
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${record.status}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: 'AttendanceReport',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF generated at ${file.filePath}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Attendance Report</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Student Name</Text>
        <Text style={styles.tableHeaderCell}>Subject</Text>
        <Text style={styles.tableHeaderCell}>Date</Text>
        <Text style={styles.tableHeaderCell}>Status</Text>
      </View>
      {attendanceRecords.map(record => (
        <View key={record.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{record.studentName}</Text>
          <Text style={styles.tableCell}>{record.subject}</Text>
          <Text style={styles.tableCell}>{new Date(record.date).toLocaleDateString()}</Text>
          <Text style={styles.tableCell}>{record.status}</Text>
        </View>
      ))}
      <Button title="Generate PDF Report" onPress={generatePDF} disabled={generating} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GenerateAttendanceReportScreen;
