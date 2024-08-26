import { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import ReportCard from '../components/ReportCard.jsx';
import axios from 'axios';
export default function ReviewReport({ navigation, route }) {
    const { data } = route.params;
    const [patient, setpatient] = useState(true);
    const [DOB, setDOB] = useState(null);
    const [reportdata, setreportdata] = useState(null);
    const [showprecautions, setshowprecautions] = useState(true);
    const [showpossiblediseases, setshowpossiblediseases] = useState(true);
    const [note, setnote] = useState('');
    const [showwarning, setshowwarnig] = useState(false);
    useEffect(() => {
        async function f1() {
            const response = await axios.get(
                `http://192.168.43.1:3000/en/getpatient?id=${data.patientId}`
            );
            setpatient(response.data);
            const response1 = await axios.get(
                `http://192.168.43.1:3000/en/getreport?id=${data._id}`
            );
            console.log(response1.data);
            setreportdata(response1.data);
            const D = new Date();
            const C = new Date(response.data.DOB);
            setDOB(D.getFullYear() - C.getFullYear());
        }
        f1();
    }, []);
    async function review() {
        if (note.strip == '') {
            setshowwarnig(true);
        } else {
            const response = await axios.post(
                `http://192.168.43.1:3000/en/reviewreport`,
                { id: reportdata._id, note: note }
            );
            if ((response.data = 'reviewed')) {
                navigation.navigate('Doctor');
            }
            else{
                console.log("lol")
            }
        }
    }
    return (
        patient &&
        reportdata && (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                className='w-screen pl-2'
            >
                <View className='w-full ml-5 mt-2'>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Doctor')}
                    >
                        <Image source={require('../assets/leftarrow.png')} />
                    </TouchableOpacity>
                </View>
                <View className='w-[75%] flex'>
                    <Text className='text-base'>Name:-</Text>
                    <Text className='text-xl'>{reportdata.patient}</Text>
                </View>
                <View className='w-[75%] flex-row mt-4 justify-between'>
                    <Text className='text-lg'>Age:- {DOB}</Text>
                    <Text className='text-lg'>
                        Blood Group:- {patient.bloodGroup}
                    </Text>
                </View>
                <View className='w-[75%] flex-row mt-4 justify-between'>
                    <Text className='text-lg'>Weight:-{patient.weight}Kg</Text>
                    <Text className='text-lg  font-medium'>
                        Gender:- {patient.gender}
                    </Text>
                </View>
                <View className='w-[75%] mt-4'>
                    <Text className='text-lg'>
                        Severity:- {reportdata.severity}
                    </Text>
                </View>
                <TouchableOpacity className="h-20 flex justify-center items-center bg-zinc-300 w-[80%] rounded-2xl" onPress={()=>navigation.navigate('Pdf',{fileId:reportdata.file})}>
                    <Text>Click here to view the Medical Report</Text>
                </TouchableOpacity>
                <View className='w-full mt-4 ml-24'>
                    <Text className='text-xl font-medium'>Summary</Text>
                </View>
                {reportdata && (
                    <View className='w-[75%] mt-3 px-2'>
                        <Text className='text-base'>{reportdata.summary}</Text>
                    </View>
                )}
                <View className='w-full flex-row items-center justify-around mt-4'>
                    <Text className='text-xl font-medium'>Precautions</Text>
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
                        {reportdata.precautions.map((precaution, index) => (
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
                        {reportdata.possibleDiseases.map((disease, index) => (
                            <Text key={index} className='text-base'>
                                {disease}
                            </Text>
                        ))}
                    </View>
                )}
                <View className='w-full mt-4 ml-24'>
                    <Text className='text-xl font-medium'>Doctor's Note</Text>
                </View>
                <View className='h-60 border border-black w-72'>
                    <TextInput
                        className='pl-2'
                        placeholder='Enter your review here'
                        onChange={(e) => {
                            e.persist();
                            setnote(e.nativeEvent.text);
                        }}
                    />
                </View>
                {showwarning && (
                    <Text className='text-red-500 font-bold'>
                        You must write review
                    </Text>
                )}
                <TouchableWithoutFeedback onPress={review}>
                    <Text className='bg-blue-600 p-2 mt-3 ml-52 h-10 mb-3 text-white text-xl'>
                        SUBMIT
                    </Text>
                </TouchableWithoutFeedback>
            </ScrollView>
        )
    );
}
