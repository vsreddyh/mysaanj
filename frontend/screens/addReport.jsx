import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function NewReport({ navigation, route }) {
    const { info } = route.params;
    const [id, setid] = useState(info._id);
    const [name, setname] = useState(info.name);
    const [base64, setbase64] = useState(null);
    const [loading, setloading] = useState(false);

    const convertFileToBase64 = async (uri) => {
        if (!uri) {
            throw new Error('Invalid file URI provided');
        }
        console.log(uri);
        try {
            const base64String = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return base64String;
        } catch (error) {
            console.error('Error converting file to Base64:', error);
        }
    };

    const pickDocument = async () => {
        // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        // if (status !== 'granted') {
        //     alert('Sorry, we need storage permissions to access files');
        // }
        let result;
        const options = {
            type: 'application/pdf',
            copyToCacheDirectory: false,
        };

        try {
            result = await DocumentPicker.getDocumentAsync(options);
        } catch (err) {
            console.error('Error picking document:', err);
        }

        if (result.canceled === false) {
            const uri = result.assets[0].uri;
            try {
                const base64String = await convertFileToBase64(uri);
                setbase64(base64String);
            } catch (err) {
                console.error('Error converting file to Base64:', err);
            }
        }
    };
    const submitreport = async () => {
        setloading(true);
        const response = await axios.post(
            'http://192.168.29.80:3000/en/upload',
            {
                file: base64,
                filename: 'Report',
                patientId: id,
                name: name,
            }
        );
        setloading(false);
        if (response.data.data === true) {
            navigation.navigate('Patient', { info: info });
        } else {
            setbase64(null);
            ToastAndroid.showWithGravity(
                'Invalid File.Try again',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    };
    return (
        <View className='flex h-screen w-screen px-7 py-6'>
            <TouchableOpacity
                className='w-fit h-fit'
                onPress={() => navigation.navigate('Patient', { info: info })}
            >
                <Image source={require('../assets/leftarrow.png')} />
            </TouchableOpacity>
            <View className='flex items-center'>
                {loading ? (
                    <View className='h-56 flex items-center'>
                        {/* <BarIndicator /> */}
                        <WaveIndicator size={180} color='rgb(0,102,255)' />
                        <Text className='w-[80%]'>
                            Please wait while we upload your report
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text className='mt-10 '>
                            {base64 ? 'Click Submit' : 'Add your Report here'}
                        </Text>
                        <TouchableOpacity
                            className='w-[90%] h-36 bg-zinc-300 flex items-center justify-center'
                            onPress={pickDocument}
                        >
                            <Image
                                source={
                                    base64
                                        ? require('../assets/tick.png')
                                        : require('../assets/upload.png')
                                }
                                className='h-20 w-20'
                            />
                            <Text className='text-white text-2xl font-bold'>
                                {base64 ? 'File selected' : 'Click here'}
                            </Text>
                        </TouchableOpacity>
                        {base64 && (
                            <TouchableOpacity
                                className='bg-blue-600 mt-12 w-16 h-8 flex items-center justify-center'
                                onPress={submitreport}
                            >
                                <Text className='text-white text-lg'>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        </View>
    );
}
