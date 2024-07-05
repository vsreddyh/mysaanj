import { View, Text } from 'react-native';

export default function Count({count}) {
    return (
        <View className='w-[77%] h-24 rounded-md flex justify-around bg-zinc-300 mb-16'>
            <View className='flex-row justify-around'>
                <Text>No of doctors:-{count.dcount}</Text>
                <Text>No of caretakers:-{count.ccount}</Text>
            </View>
            <View className='flex-row justify-around'>
                <Text>No of patients:-{count.pcount}</Text>
            </View>
            <View className='flex-row justify-around'>
                <Text>No of reports:-{count.rcount}</Text>
            </View>
        </View>
    );
}