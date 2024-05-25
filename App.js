import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';
import UserScreen from './screens/StudentScreen';
import LectureScreen from './screens/LectureScreen';
import StudentRegScreen from './screens/StudentRegScreen';
import QrCodeScanScreen from './screens/QrCodeScanScreen';
import StudentScreen from './screens/StudentScreen';
import GenerateQRCodeScreen from './screens/GenerateQRCodeScreen';
import LectureRegisterScreen from './screens/LectureRegisterScreen';
import ViewAttendanceScreen from './screens/ViewAttendanceScreen';
import LoginAdmin from './screens/LoginAdmin';
import LoginLec from './screens/LoginLec';
import ViewStudentDetailsScreen from './screens/ViewStudentDetailsScreen';
import ViewLecturerDetailsScreen from './screens/ViewLecturerDetailsScreen';
import MarkAttendanceScreen from './screens/MarkAttendanceScreen';
import ViewStudentAttendanceScreen from './screens/ViewStudentAttendanceScreen';
import ViewAllAttendanceScreen from './screens/ViewAllAttendanceScreen';
import GenerateAttendanceReportScreen from './screens/GenerateAttendanceReportScreen';



const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Admin" component={AdminScreen}/>
        <Stack.Screen name="Student" component={StudentScreen}/>
        <Stack.Screen name="Lecture" component={LectureScreen}/>
        <Stack.Screen name="Student_Reg" component={StudentRegScreen}/>
        <Stack.Screen name="Qr_Scan" component={QrCodeScanScreen}/>
        <Stack.Screen name="Qr_Generate" component={GenerateQRCodeScreen}/>
        <Stack.Screen name="Lecture_Reg" component={LectureRegisterScreen}/>
        <Stack.Screen name="Admin_Login" component={LoginAdmin}/>
        <Stack.Screen name="Lecturer_Login" component={LoginLec}/>
        <Stack.Screen name="ViewStudentDetails" component={ViewStudentDetailsScreen}/>
        <Stack.Screen name="ViewLecturerDetails" component={ViewLecturerDetailsScreen}/>
        <Stack.Screen name="MarkAttendanceScreen" component={MarkAttendanceScreen}/>
        <Stack.Screen name="ViewStudentAttendance" component={ViewStudentAttendanceScreen} />
        <Stack.Screen name="ViewAllAttendance" component={ViewAllAttendanceScreen} />
        <Stack.Screen name="GenerateAttendanceReport" component={GenerateAttendanceReportScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}