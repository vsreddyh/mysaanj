import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
export default function CSidebar({ drawer, navigation,
    isFocused,
    refreshing,
    onRefresh }) {
    const [dropdown, setDropdown] = useState(false);
    const [caretaker, setcaretaker] = useState(null);
    const [cdetails, setcdetails] = useState(null);
    const [refresh,setrefresh]=useState(false);
    useEffect(() => {
        async function x() {
            const response1 = await axios.get(
                'http://192.168.43.1:3000/en/checksession'
            );
            setcdetails(response1.data);
            const response = await axios.get(
                `http://192.168.43.1:3000/en/getoldagehomeinfo?id=${response1.data.oldageid}`
            );
            console.log(response.data);
            setcaretaker(response.data);
        }
        x();
    }, [refresh,isFocused,refreshing]);
    async function deletekey(x){
        response=await axios.post("http://192.168.43.1:3000/en/deletekey",{id:x});
        if(response.data="done"){
            setrefresh(!refresh)
            onRefresh();
        }
    }
    async function logout() {
        response = await axios.post(
            'http://192.168.43.1:3000/en/deletesession'
        );
        if (response.data === true) {
            navigation.navigate('Home');
        }
    }
    return (
        caretaker &&
        cdetails && (
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
                                {cdetails.name}
                            </Text>
                            <Text className=''>Key:- {caretaker.key}</Text>
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
                        {dropdown && caretaker && (
                            <View className='flex h-fit ml-6 w-full'>
                                {caretaker.doctors.map((doctor, index) => (
                                    <View
                                        key={index}
                                        className='flex-row items-center h-fit w-[90%]'
                                    >
                                        <Text className='text-base text-white'>
                                            Dr.{doctor.name}
                                        </Text>
                                        <TouchableWithoutFeedback onPress={()=>deletekey(doctor.id)}>
                                        <Image
                                            source={require('../assets/delete.png')}
                                            className='absolute right-6  h-5 w-5'
                                        />
                                        </TouchableWithoutFeedback>
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
