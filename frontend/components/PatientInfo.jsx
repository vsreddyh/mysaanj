import { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ReportCard from './ReportCard';
import axios from 'axios';
export default function PatientInfo({ navigation, info }) {
    const [data, setdata] = useState(info);
    const [editcontact, seteditcontact] = useState(false);
    const [date, setdate] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    useEffect(() => {
        async function function1() {
            const response = await axios.get(
                `http://192.168.29.80:3000/en/getpatient?id=${info._id}`
            );
            setdata(response.data);
            const x = new Date();
            const y = new Date(response.data.DOB);
            setdate(x.getFullYear() - y.getFullYear());
        }
        function1();
    }, [refreshing, isFocused]);
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className='w-screen pl-2'
        >
            <View className='w-full ml-5 mt-2'>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Caretaker')}
                >
                    <Image source={require('../assets/leftarrow.png')} />
                </TouchableOpacity>
            </View>
            <View className='w-[75%] flex'>
                <Text className='text-base'>Name:-</Text>
                <Text className='text-xl'>{data.name}</Text>
            </View>
            <View className='w-[75%] flex-row mt-4 justify-between'>
                <Text className='text-lg'>Age:- {date}</Text>
                <Text className='text-lg'>Blood Group:- {data.bloodGroup}</Text>
            </View>
            <View className='w-[75%] flex-row mt-4 justify-between'>
                <Text className='text-lg'>Weight:-{data.weight}Kg</Text>
                <Text className='text-lg'>Gender:- {data.gender}</Text>
            </View>
            <View className='w-[75%] flex-row mt-4 justify-between items-center'>
                <Text className='text-lg'>Phone:-{data.phone}</Text>
            </View>
            <View className='w-[75%] flex-row mt-4 justify-between'>
                <Text className='text-lg'>Known Health Conditions:-</Text>
                <TouchableOpacity>
                    <Image source={require('../assets/edit.png')} />
                </TouchableOpacity>
            </View>
            <View className='flex w-[75%] ml-8'>
                <Text className='text-base'>{data.chronics}</Text>
            </View>
            <View className='w-[75%] flex-row mt-4 justify-between'>
                <Text className='text-lg'>Current Medications:-</Text>
                <TouchableOpacity>
                    <Image source={require('../assets/edit.png')} />
                </TouchableOpacity>
            </View>
            <View className='flex w-[75%] ml-8'>
                <Text className='text-base'>{data.Medications}</Text>
            </View>
            <View className='flex w-[75%] mt-6'>
                <Text className='text-lg'>Unverified Reports</Text>
                {data.unverifiedreports &&
                data.unverifiedreports.length !== 0 ? (
                    <View className='w-full'>
                        {data.unverifiedreports.map((reportid, index) => (
                            <ReportCard
                                key={index}
                                reportid={reportid}
                                navigation={navigation}
                            />
                        ))}
                    </View>
                ) : (
                    <View className='w-full flex justify-center h-20 border items-center'>
                        <Text>None</Text>
                    </View>
                )}
            </View>
            <View className='flex w-[75%] mb-6'>
                <Text className='text-lg'>Verified Reports</Text>
                {data.verifiedreports && data.verifiedreports.length !== 0 ? (
                    <View className='w-full'>
                        {data.verifiedreports.map((reportid, index) => (
                            <ReportCard
                                key={index}
                                reportid={reportid}
                                navigation={navigation}
                            />
                        ))}
                    </View>
                ) : (
                    <View className='w-full flex justify-center h-20 border items-center'>
                        <Text>None</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
