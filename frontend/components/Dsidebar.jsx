import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
export default function Dsidebar({ drawer, navigation,isFocused,refreshing }) {
    const [dropdown, setDropdown] = useState(false);
    const [doctor, setdoctor] = useState(null);
    const [ddetails, setddetails] = useState(null);
    useEffect(() => {
        async function x() {
            const response1 = await axios.get(
                'http://192.168.29.80:3000/en/checksession'
            );
            setddetails(response1.data);
            const response = await axios.get(
                `http://192.168.29.80:3000/en/getdoctorinfo?id=${response1.data.oldageid}`
            );
            setdoctor(response.data);
        }
        x();
    }, [isFocused,refreshing]);
    async function getcaretaker(c) {
        const response = await axios.get(
            `http://192.168.29.80:3000/en/getoldagehomeinfo?id=${c}`
        );
        return response.data.name;
    }
    async function logout() {
        response = await axios.post(
            'http://192.168.29.80:3000/en/deletesession'
        );
        if (response.data === true) {
            navigation.navigate('Home');
        }
    }
    return (
        doctor &&
        ddetails && (
            <View>
                <View className='w-full h-screen bg-white'>
                    <View className='w-full h-[20%]'>
                        <TouchableOpacity
                            onPress={() => drawer.current?.closeDrawer()}
                            className='w-[25%] h-[25%] m-2 mt-4'
                        >
                            <Image
                                source={require('../assets/leftarrow.png')}
                                className='w-full h-full object-contain'
                            />
                        </TouchableOpacity>
                        <View className='flex justify-center items-center h-[75%]'>
                            <Text className='text-xl font-semibold'>
                                {ddetails.name}
                            </Text>
                        </View>
                    </View>
                    <View className='flex w-full h-[80%] bg-blue-600'>
                        <View className='flex-row items-center p-2 h-[7%] w-full'>
                            <View className='h-[100%] w-[10%]'>
                                <Image
                                    source={require('../assets/home.png')}
                                    className='object-contain h-full w-full'
                                />
                            </View>
                            <Text className='text-base pl-1 text-white'>
                                Home
                            </Text>
                        </View>
                        <View className='flex-row p-2 h-[7%] w-full items-center'>
                            <TouchableWithoutFeedback
                                className='flex w-full h-full'
                                onPress={() => setDropdown(!dropdown)}
                            >
                                <View className='flex-row items-center w-full h-full'>
                                    <View className='h-[100%] w-[10%]'>
                                        <Image
                                            source={require('../assets/keys.png')}
                                            className='object-contain h-full w-full'
                                        />
                                    </View>
                                    <Text className='text-base pl-1 text-white'>
                                        Manage Doctors
                                    </Text>
                                    <View className='flex items-center justify-center h-full w-[20%]'>
                                        {dropdown ? (
                                            <Image
                                                source={require('../assets/arrow_up.png')}
                                                className='object-contain h-[60%] w-[60%]'
                                            />
                                        ) : (
                                            <Image
                                                source={require('../assets/arrow_down.png')}
                                                className='object-contain h-[60%] w-[60%]'
                                            />
                                        )}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {dropdown && doctor && (
                            <View className='flex h-fit ml-6 w-full'>
                                {doctor.caretaker.map((c,index) => (
                                    <View
                                        key={index}
                                        className='flex-row items-center h-fit w-[90%]'
                                    >
                                        <Text className='text-base text-white'>
                                            {getcaretaker(c)}
                                        </Text>
                                        <Image
                                            source={require('../assets/delete.png')}
                                            className='absolute right-6  h-5 w-5'
                                        />
                                    </View>
                                ))}
                            </View>
                        )}
                        <View className='flex-row p-2 items-center h-[7%] w-full'>
                            <View className='h-[100%] w-[10%]'>
                                <Image
                                    source={require('../assets/info.png')}
                                    className='object-contain h-full w-full'
                                />
                            </View>
                            <Text className='text-base pl-1 text-white'>
                                About us
                            </Text>
                        </View>
                        <View className='flex-row p-2 items-center h-[7%] w-full'>
                            <View className='h-[100%] w-[10%]'>
                                <Image
                                    source={require('../assets/feedback.png')}
                                    className='object-contain h-full w-full'
                                />
                            </View>
                            <Text className='text-base pl-1 text-white'>
                                Feedback
                            </Text>
                        </View>
                        <TouchableOpacity
                            className='flex-row p-2 items-center h-[7%] w-full'
                            onPress={logout}
                        >
                            <View className='h-[100%] w-[10%]'>
                                <Image
                                    source={require('../assets/logout.png')}
                                    className='object-contain h-full w-full'
                                />
                            </View>
                            <Text className='text-base pl-1 text-white'>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    );
}
