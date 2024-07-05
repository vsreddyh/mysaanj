import { View, Text } from 'react-native';
import React from 'react';
export default function PatientCard(){
    return (
        <View className="flex justify-around mt-2 items-center bg-zinc-300 rounded-3xl w-[85%] h-fit">
            <View className="flex-row w-[95%] h-fit ml-7 mt-2 mb-1">
                <Text className="text-xs">Name:- H. Vishnu Shouryan Reddy</Text>
                
            </View>
            <View className="flex-row w-[95%] h-fit justify-around mt-1 mb-1">
                <Text className="text-xs">Age:- 20</Text>
                <Text className="text-xs">Gender:- M</Text>
                <Text className="text-xs">Blood Group:- B+</Text>
            </View>
            <View className="flex-row w-[95%] h-fit justify-around mt-1 mb-2">
                <Text className="text-xs text-green-600">Verified Reports:-2</Text>
                <Text className="text-xs text-red-600">Unverified Reports:-0</Text>
            </View>
        </View>
    )
}