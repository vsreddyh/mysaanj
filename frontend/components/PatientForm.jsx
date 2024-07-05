import {
    View,
    TextInput,
    Button,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
export default function PatientForm() {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [formatDate, setFormatDate] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectbg, setSelectbg] = useState('');
    useEffect(() => {
        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();

            // You can replace '-' with any separator you like
            return `${day}/${month}/${year}`;
        }
        setFormatDate(formatDate(date));
    }, [date]);

    return (
        <View className='w-full h-fit flex items-center mt-10'>
            <View className='w-[75%] h-[7vh] bg-zinc-300 pl-2 rounded-3xl flex justify-center items-center'>
                <TextInput className='w-full h-full' placeholder='Name' />
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
                                const currentDate = selectedDate || date;
                                setOpen(false);
                                setDate(currentDate);
                            }}
                        />
                    )}
                </TouchableOpacity>
                <View className='bg-zinc-300 w-[45%] h-full flex rounded-3xl ml-7'>
                    <Picker
                        selectedValue={selectedGender}
                        onValueChange={(itemValue) =>
                            setSelectedGender(itemValue)
                        }
                    >
                        <Picker.Item label='Male' value='male' />
                        <Picker.Item label='Female' value='female' />
                        <Picker.Item label='Other' value='other' />
                    </Picker>
                </View>
            </View>
            <View className='w-[75%] h-[7vh] bg-zinc-300 mt-3 rounded-3xl flex justify-center'>
                <Picker
                    selectedValue={selectbg}
                    onValueChange={(itemValue) => setSelectbg(itemValue)}
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
            <View className='h-[20vh] w-[75%] bg-zinc-300 mt-3 rounded-3xl p-2'>
                <TextInput
                    className='w-full h-fit'
                    placeholder='Chronic Conditions like Low Diabetes, Asthama, etc.'
                    multiline={true}
                />
            </View>
            <View className='h-[20vh] w-[75%] bg-zinc-300 mt-3 rounded-3xl p-2'>
                <TextInput
                    className='w-full h-fit'
                    placeholder='Current Medications like Asprin, Tylenol, etc.'
                    multiline={true}
                />
            </View>
        </View>
    );
}
