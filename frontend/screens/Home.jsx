import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import Count from '../components/Count';
import {
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

export default function Home({navigation}) {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const getCount = async () => {
            try {
                const response = await axios.get('http://192.168.43.1:3000/en/count');
                setCount(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCount();
    }, []);
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            className='w-screen'
        >
            <Image
                className='h-[23vh] w-[35%] relative top-[1.5%]'
                source={require('../assets/loader.png')}
                style={[
                    {
                        resizeMode: 'contain',
                    },
                ]}
            />
            <Text className='text-2xl my-8'>Choose Your Role?</Text>
            <TouchableOpacity className='w-[77%] h-[20vh] flex-row bg-zinc-300 mb-8 rounded-2xl' onPress={() => navigation.navigate('Caretaker')} >
                <View className=' w-full h-full flex-row bg-zinc-300 rounded-2xl'>
                    <View className='flex items-center w-[35%]'>
                        <Image
                            className='w-[80%] h-full'
                            source={require('../assets/oldAgeHome.png')}
                            style={[
                                {
                                    resizeMode: 'contain',
                                },
                            ]}
                        />
                    </View>
                    <View className='flex w-[65%] items-center mt-1'>
                        <Text className='text-2xl font-medium'>Caretaker</Text>
                        <Text>
                            {' '}
                            I provide companionship, assistance, and ensure the
                            well-being of our valued residents.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className='w-[77%] h-[20vh] flex-row bg-zinc-300 mb-16 rounded-2xl'>
                <View className='w-full h-full flex-row bg-zinc-300 rounded-2xl'>
                    <View className='flex items-center w-[35%]'>
                        <Image
                            className='w-[80%] h-full'
                            source={require('../assets/Doctor.png')}
                            style={[
                                {
                                    resizeMode: 'contain',
                                },
                            ]}
                        />
                    </View>
                    <View className='flex w-[65%] items-center mt-1'>
                        <Text className='text-2xl font-medium'>Doctor</Text>
                        <Text>
                            I specialize in geriatric care, focusing on the
                            unique needs of our senior community.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {count && <Count count={count}/>}            
        </ScrollView>
    );
}
