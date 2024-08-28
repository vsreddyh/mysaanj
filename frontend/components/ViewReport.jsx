import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import ReportCard from './ReportCard';
import axios from 'axios';
export default function ViewReport({ navigation, route }) {
    const { data } = route.params;
    const [patient, setpatient] = useState(null);
    const [DOB, setDOB] = useState(null);
    const [showprecautions, setshowprecautions] = useState(false);
    const [showprescription, setprescription] = useState(false);
    const [showpossiblediseases, setshowpossiblediseases] = useState(false);
    useEffect(() => {
        async function f1() {
            const response = await axios.get(
                `http://192.168.43.1:3000/en/getpatient?id=${data.patientId}`
            );
            setpatient(response.data);
            const D = new Date();
            const C = new Date(response.data.DOB);
            setDOB(D.getFullYear() - C.getFullYear());
        }
        f1();
    }, []);
    return (
        patient &&
        data && (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                className='w-screen pl-2'
            >
                <View className='w-full ml-5 mt-2'>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Patient', { info: patient })
                        }
                    >
                        <Image source={require('../assets/leftarrow.png')} />
                    </TouchableOpacity>
                </View>
                <View className='w-[75%] flex'>
                    <Text className='text-base'>Name:-</Text>
                    <Text className='text-xl'>{data.patient}</Text>
                </View>
                <View className='w-[75%] flex-row mt-4 justify-between'>
                    <Text className='text-lg'>Age:- {DOB}</Text>
                    <Text className='text-lg'>
                        Blood Group:- {patient.bloodGroup}
                    </Text>
                </View>
                <View className='w-[75%] flex-row mt-4 justify-between'>
                    <Text className='text-lg'>Weight:-{patient.weight}Kg</Text>
                    <Text className='text-lg'>Gender:- {patient.gender}</Text>
                </View>
                <View className='w-[75%] mt-4'>
                    <Text className='text-lg'>Severity:- {data.severity}</Text>
                </View>
                <TouchableOpacity className="h-20 flex justify-center items-center bg-zinc-300 w-[80%] rounded-2xl" onPress={()=>navigation.navigate('Pdf',{fileId:data.file})}>
                    <Text>Click here to view the Medical Report</Text>
                </TouchableOpacity>
                <View className='w-full mt-4 ml-24'>
                    <Text className='text-xl font-medium'>Summary</Text>
                </View>
                {data && (
                    <View className='w-[75%] mt-3 px-2'>
                        <Text className='text-base'>{data.summary}</Text>
                    </View>
                )}
                <View className='w-full flex-row items-center justify-around mt-4'>
                    <Text className='text-xl'>Precautions</Text>
                    <TouchableOpacity
                        className='h-fit w-fit'
                        onPress={() => setshowprecautions(!showprecautions)}
                    >
                        <Image
                            source={
                                showprecautions
                                    ? require('../assets/b_arrow_up.png')
                                    : require('../assets/b_arrow_down.png')
                            }
                        />
                    </TouchableOpacity>
                </View>
                {showprecautions && (
                    <View className='w-[75%] mt-3 px-2'>
                        {data.precautions.map((precaution, index) => (
                            <Text key={index} className='text-base'>
                                {precaution}
                            </Text>
                        ))}
                    </View>
                )}
                <View className='w-full flex-row items-center justify-around mt-4'>
                    <Text className='text-xl font-medium'>
                        Possible Diseases
                    </Text>
                    <TouchableOpacity
                        className='h-fit w-fit'
                        onPress={() =>
                            setshowpossiblediseases(!showpossiblediseases)
                        }
                    >
                        <Image
                            source={
                                showpossiblediseases
                                    ? require('../assets/b_arrow_up.png')
                                    : require('../assets/b_arrow_down.png')
                            }
                        />
                    </TouchableOpacity>
                </View>
                {showpossiblediseases && (
                    <View className='w-[75%] mt-3 px-2'>
                        {data.possibleDiseases.map((disease, index) => (
                            <Text key={index} className='text-base'>
                                {disease}
                            </Text>
                        ))}
                    </View>
                )}
                {data.doctorNotes!=="" && (
                    <>
                        <View className='w-full flex-row items-center justify-around mt-4'>
                            <Text className='text-xl'>Prescription</Text>
                            <TouchableOpacity
                                className='h-fit w-fit'
                                onPress={() =>
                                    setprescription(!showprescription)
                                }
                            >
                                <Image
                                    source={
                                        showprescription
                                            ? require('../assets/b_arrow_up.png')
                                            : require('../assets/b_arrow_down.png')
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        {showprescription && (
                            <View className='w-[75%] mt-3 px-2'>
                                <Text className='text-base'>
                                    {data.doctorNotes}
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>
        )
    );
}
