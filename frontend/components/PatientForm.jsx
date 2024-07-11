import {
    View,
    TextInput,
    Button,
    Text,
    Image,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
export default function PatientForm({ setinfo, save, setsave, info, setok }) {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [formatDate, setFormatDate] = useState('');
    useEffect(() => {
        if (save) {
            if (info.name && info.name.length > 3) {
                if (date.getFullYear() - info.DOB.getFullYear() > 40) {
                    if (info.chronics == null) {
                        setinfo((prevData) => ({
                            ...prevData,
                            chronics: 'None',
                        }));
                    }
                    if (info.Medications == null) {
                        setinfo((prevData) => ({
                            ...prevData,
                            Medications: 'None',
                        }));
                    }
                    if (
                        info.weight &&
                        !isNaN(info.weight) &&
                        parseInt(info.weight) > 15
                    ) {
                        setok(true);
                    } else {
                        ToastAndroid.show(
                            'Weight should be a number and greater than 15',
                            ToastAndroid.SHORT
                        );
                        setsave(false);
                    }
                } else {
                    ToastAndroid.show(
                        'Age should be greater than 40',
                        ToastAndroid.SHORT
                    );
                    setsave(false);
                }
            } else {
                ToastAndroid.show(
                    'Name should be greater than 3 characters',
                    ToastAndroid.SHORT
                );
                setsave(false);
            }
        }
    }, [save]);
    useEffect(() => {
        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();
            // You can replace '-' with any separator you like
            return `${day}/${month}/${year}`;
        }
        setFormatDate(formatDate(info.DOB));
    }, [info]);

    return (
        <View className='w-full h-fit flex items-center mt-10'>
            <View className='w-[75%] h-[7vh] bg-zinc-300 pl-2 rounded-3xl flex justify-center items-center'>
                <TextInput
                    className='w-full h-full'
                    placeholder='Name'
                    value={info.name}
                    onChange={(e) =>
                    {
                        e.persist();
                        setinfo((prevData) => ({
                            ...prevData,
                            name: e.nativeEvent.text,
                        }))
                    }
                }
                />
            </View>
            <View className='w-[75%] h-[7vh] flex-row items-center mt-3'>
                <TouchableOpacity
                    className='bg-zinc-300 w-[45%] h-full flex-row items-center rounded-3xl pl-2'
                    onPress={() => setOpen(true)}
                >
                    <TextInput
                        className='text-black'
                        value={formatDate}
                        readOnly={true}
                    />
                    <Image
                        source={require('../assets/calendar.png')}
                        className='absolute right-3'
                    />
                    {open && (
                        <DateTimePicker
                            mode='date'
                            display='calender'
                            value={date}
                            onChange={(event, selectedDate) => {
                                console.log(selectedDate,typeof(new Date(selectedDate)))
                                setOpen(false);
                                setinfo((prevData) => ({
                                    ...prevData,
                                    DOB: selectedDate,
                                }));
                            }}
                        />
                    )}
                </TouchableOpacity>
                <View className='bg-zinc-300 w-[45%] h-full flex rounded-3xl ml-7'>
                    <Picker
                        selectedValue={info.gender}
                        onValueChange={(itemValue) =>
                            setinfo((prevData) => ({
                                ...prevData,
                                gender: itemValue,
                            }))
                        }
                    >
                        <Picker.Item label='Male' value='male' />
                        <Picker.Item label='Female' value='female' />
                        <Picker.Item label='Other' value='other' />
                    </Picker>
                </View>
            </View>
            <View className='w-[75%] h-[7vh] mt-3 flex-row'>
                <View className='bg-zinc-300 w-[45%] rounded-3xl'>
                    <Picker
                        selectedValue={info.bloodGroup}
                        onValueChange={(itemValue) =>
                            setinfo((prevData) => ({
                                ...prevData,
                                bloodGroup: itemValue,
                            }))
                        }
                    >
                        <Picker.Item label='AB+' value='AB+' />
                        <Picker.Item label='AB-' value='AB-' />
                        <Picker.Item label='A+' value='A+' />
                        <Picker.Item label='A-' value='A-' />
                        <Picker.Item label='B+' value='B+' />
                        <Picker.Item label='B-' value='B-' />
                        <Picker.Item label='O+' value='O+' />
                        <Picker.Item label='O-' value='O-' />
                    </Picker>
                </View>
                <TextInput
                    className='w-[45%] h-full bg-zinc-300 rounded-3xl ml-7 pl-2'
                    placeholder='weight'
                    value={info.weight}
                    onChange={(e) => {
                        {
                            e.persist();
                            setinfo((prevData) => ({
                                ...prevData,
                                weight: e.nativeEvent.text,
                            }));
                        }
                    }}
                />
            </View>
            <View className='h-[20vh] w-[75%] bg-zinc-300 mt-3 rounded-3xl p-2'>
                <TextInput
                    className='w-full h-fit'
                    placeholder='Chronic Conditions like Low Diabetes, Asthama, etc.'
                    multiline={true}
                    value={info.chronics}
                    onChange={(e) =>{
                        e.persist();
                        setinfo((prevData) => ({
                            ...prevData,
                            chronics: e.nativeEvent.text,
                        }))
                    }
                    }
                />
            </View>
            <View className='h-[20vh] w-[75%] bg-zinc-300 mt-3 rounded-3xl p-2'>
                <TextInput
                    className='w-full h-fit'
                    placeholder='Current Medications like Asprin, Tylenol, etc.'
                    multiline={true}
                    value={info.Medications}
                    onChange={(e) =>
                    {
                        e.persist();
                        setinfo((prevData) => ({
                            ...prevData,
                            Medications: e.nativeEvent.text,
                        }))
                    }
                    }
                />
            </View>
        </View>
    );
}
