import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseinit'; // Adjust the path to your firebaseinit file

const ViewLecturerDetailsScreen = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDepartment, setUpdatedDepartment] = useState('');
  const [updatedSubject, setUpdatedSubject] = useState('');

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Lecturer'));
        const lecturerData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLecturers(lecturerData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Lecturer', id));
      setLecturers(lecturers.filter(lecturer => lecturer.id !== id));
      Alert.alert('Success', 'Lecturer deleted successfully');
    } catch (error) {
      console.error('Error deleting lecturer:', error);
      Alert.alert('Error', 'Failed to delete lecturer');
    }
  };

  const handleUpdate = async () => {
    if (!updatedName.trim() || !updatedDepartment.trim() || !updatedSubject.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      await updateDoc(doc(db, 'Lecturer', selectedLecturer.id), {
        lecturerName: updatedName,
        department: updatedDepartment,
        subject: updatedSubject,
      });

      setLecturers(lecturers.map(lecturer => 
        lecturer.id === selectedLecturer.id 
          ? { ...lecturer, lecturerName: updatedName, department: updatedDepartment, subject: updatedSubject } 
          : lecturer
      ));
      setModalVisible(false);
      Alert.alert('Success', 'Lecturer updated successfully');
    } catch (error) {
      console.error('Error updating lecturer:', error);
      Alert.alert('Error', 'Failed to update lecturer');
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
      <Text style={styles.title}>Lecturer Details</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Name</Text>
        <Text style={styles.tableHeaderText}>Username</Text>
        <Text style={styles.tableHeaderText}>Department</Text>
        <Text style={styles.tableHeaderText}>Subject</Text>
        <Text style={styles.tableHeaderText}>Actions</Text>
      </View>
      <FlatList
        data={lecturers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>{item.lecturerName}</Text>
            <Text style={styles.tableRowText}>{item.username}</Text>
            <Text style={styles.tableRowText}>{item.department}</Text>
            <Text style={styles.tableRowText}>{item.subject}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => { setSelectedLecturer(item); setUpdatedName(item.lecturerName); setUpdatedDepartment(item.department); setUpdatedSubject(item.subject); setModalVisible(true); }}>
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
      {selectedLecturer && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update Lecturer</Text>
              <TextInput
                style={styles.input}
                placeholder="Lecturer Name"
                value={updatedName}
                onChangeText={(text) => setUpdatedName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Department"
                value={updatedDepartment}
                onChangeText={(text) => setUpdatedDepartment(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Subject"
                value={updatedSubject}
                onChangeText={(text) => setUpdatedSubject(text)}
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
  actionText1: {
    color: '#FF3B30',
    marginHorizontal: RFValue(5),
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

export default ViewLecturerDetailsScreen;
