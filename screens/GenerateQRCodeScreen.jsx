import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
//import RNFS from 'react-native-fs';

const GenerateQRCodeScreen = () => {
    const [qrCodeContent, setQRCodeContent] = useState('');

    const handleDownloadQRCode = async () => {
        try {
            // Check if QR code content is empty
            if (!qrCodeContent.trim()) {
                Alert.alert('Error', 'QR code content cannot be empty');
                return;
            }

            // Generate QR code SVG
            const svgData = QRCode.generate(qrCodeContent, {
                width: 200,
                height: 200,
            });

            // Create file path
           //const path = RNFS.PicturesDirectoryPath + '/QRCode.png';

            // Write SVG data to file
           // await RNFS.writeFile(path, svgData, 'utf8');

            // Alert and console log for success
            Alert.alert('Success', 'QR code has been downloaded');
            console.log('QR code saved at:', path);
        } catch (error) {
            console.error('Error saving QR code:', error);
            Alert.alert('Error', 'Failed to download QR code');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {/* Render QR code */}
            {qrCodeContent.trim() ? (
                <QRCode
                    value={qrCodeContent}
                    size={200}
                    color="black"
                    backgroundColor="white"
                    style={{ marginTop: 20 }}
                />
            ) : null}
            {/* Text input for QR code content */}
            <TextInput
                style={{ width: '80%', marginBottom: 20, padding: 10, borderWidth: 1, marginTop:20 }}
                placeholder="Enter content for QR code"
                value={qrCodeContent}
                onChangeText={(text) => setQRCodeContent(text)}
            />

            {/* Button to download QR code */}
            <Button title="Download QR Code" onPress={handleDownloadQRCode} />

            
        </View>
    );
};

export default GenerateQRCodeScreen;
