import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function PatientCard({ patientinfo, navigation }) {
    const [totinfo, settotinfo] = useState(null);
    const [age, setage] = useState(null);
    const [a, seta] = useState(new Date());
    useEffect(() => {
        async function x() {
            const response = await axios.get(
                `http://192.168.43.1:3000/en/getpatientcard?id=${patientinfo}`
            );
            settotinfo(response.data);
            const f = new Date(response.data.DOB);
            setage(a.getFullYear() - f.getFullYear());
        }
        x();
    }, []);
    return (
        totinfo && (
            <TouchableOpacity
                className='flex justify-around mt-2 items-center bg-zinc-300 rounded-3xl w-[85%] h-fit'
                onPress={() =>
                    navigation.navigate('Patient', { info: totinfo })
                }
            >
                <View className='flex-row w-[95%] h-fit ml-7 mt-2 mb-1'>
                    <Text className='text-xs'>Name:- {totinfo.name}</Text>
                </View>
                <View className='flex-row w-[95%] h-fit justify-around mt-1 mb-1'>
                    <Text className='text-xs'>Age:- {age}</Text>
                    <Text className='text-xs'>Gender:- {totinfo.gender}</Text>
                    <Text className='text-xs'>
                        Blood Group:- {totinfo.bloodGroup}
                    </Text>
                </View>
                <View className='flex-row w-[95%] h-fit justify-around mt-1 mb-2'>
                    <Text className='text-xs text-green-600'>
                        Verified Reports:-{totinfo.verifiedreports.length}
                    </Text>
                    <Text className='text-xs text-red-600'>
                        Unverified Reports:-{totinfo.unverifiedreports.length}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    );
}
