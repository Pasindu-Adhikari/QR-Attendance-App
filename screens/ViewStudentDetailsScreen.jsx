import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseinit'; // Adjust the path to your firebaseinit file

const ViewStudentDetailsScreen = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDepartment, setUpdatedDepartment] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Student'));
        const studentData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(studentData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Student', id));
      setStudents(students.filter(student => student.id !== id));
      Alert.alert('Success', 'Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
      Alert.alert('Error', 'Failed to delete student');
    }
  };

  const handleUpdate = async () => {
    if (!updatedName.trim() || !updatedDepartment.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      await updateDoc(doc(db, 'Student', selectedStudent.id), {
        studentName: updatedName,
        department: updatedDepartment,
      });

      setStudents(students.map(student => 
        student.id === selectedStudent.id 
          ? { ...student, studentName: updatedName, department: updatedDepartment } 
          : student
      ));
      setModalVisible(false);
      Alert.alert('Success', 'Student updated successfully');
    } catch (error) {
      console.error('Error updating student:', error);
      Alert.alert('Error', 'Failed to update student');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Details</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Name</Text>
        <Text style={styles.tableHeaderText}>ID</Text>
        <Text style={styles.tableHeaderText}>Department</Text>
        <Text style={styles.tableHeaderText}>Actions</Text>
      </View>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>{item.studentName}</Text>
            <Text style={styles.tableRowText}>{item.studentId}</Text>
            <Text style={styles.tableRowText}>{item.department}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => { setSelectedStudent(item); setUpdatedName(item.studentName); setUpdatedDepartment(item.department); setModalVisible(true); }}>
                <Text style={styles.actionText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.actionText1}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Update Modal */}
      {selectedStudent && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update Student</Text>
              <TextInput
                style={styles.input}
                placeholder="Student Name"
                value={updatedName}
                onChangeText={(text) => setUpdatedName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Department"
                value={updatedDepartment}
                onChangeText={(text) => setUpdatedDepartment(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(20),
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: RFValue(20),
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RFValue(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RFValue(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableRowText: {
    fontSize: RFValue(14),
    flex: 1,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionText: {
    color: '#007AFF',
    marginHorizontal: RFValue(5),
  },
  actionText1: {
    color: '#FF3B30',
    marginHorizontal: RFValue(5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: RFValue(20),
    borderRadius: RFValue(10),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginBottom: RFValue(20),
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
  cancelButton: {
    backgroundColor: '#FF3B30',
    marginTop: RFValue(10),
  },
});

export default ViewStudentDetailsScreen;
