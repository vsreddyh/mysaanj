import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
export default function Addkey({ setaddkey }) {
    const [key, setkey] = useState('');
    const [de,setde]=useState(false)
    async function addkey() {
        const response = await axios.post(
            'http://192.168.43.1:3000/en/addkey',
            { key: key }
        );
        if (response.data == 'success') {
            setaddkey(false);
        }
        if(response.data=="fail"){
            setde(true)
        }
    }
    return (
        <View className='flex items-center justify-center z-2 absolute w-full h-full bg-blue-600 opacity-80'>
            <View className='bg-white h-fit w-56 '>
                <View className='flex items-center'>
                    <Text className='text-base'>Add Old Age Home Key</Text>
                </View>
                {de && (
                    <View className="flex items-center">
                        <Text className="text-red-600">Invalid Key</Text>
                    </View>
                )}
                <TextInput
                    className='border border-black pl-1 rounded-lg mx- mb-2'
                    value={key}
                    placeholder='Enter key'
                    onChange={(e) => {
                        e.persist();
                        setkey(e.nativeEvent.text);
                    }}
                />
                <View className='flex-row'>
                    <TouchableOpacity
                        className='w-1/2 bg-red-500 flex items-center justify-center'
                        onPress={() => setaddkey(false)}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='w-1/2 flex items-center justify-center'
                        onPress={addkey}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
