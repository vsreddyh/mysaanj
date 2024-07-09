import { View, Text } from 'react-native';
import React,{useEffect, useState} from 'react';
export default function PatientCard({patientinfo}){
    const [totinfo,settotinfo]=useState(null);
    const [age,setage]=useState(null)
    const a= new Date();
    useEffect(()=>{
        async function x(){
            const response = await axios.get(`https://mysaanj.vercel.app/en/getpatient/id=${patientinfo}`)
            settotinfo(response.data)
            setage(a.getFullYear()-response.data.DOB.getFullYear());
        }
        x()
    },[])
    return (
        totinfo && (
            <View className="flex justify-around mt-2 items-center bg-zinc-300 rounded-3xl w-[85%] h-fit">
            <View className="flex-row w-[95%] h-fit ml-7 mt-2 mb-1">
                <Text className="text-xs">Name:- {totinfo.name}</Text>
                
            </View>
            <View className="flex-row w-[95%] h-fit justify-around mt-1 mb-1">
                <Text className="text-xs">Age:- {age}</Text>
                <Text className="text-xs">Gender:- {totinfo.gender}</Text>
                <Text className="text-xs">Blood Group:- {totinfo.bloodGroup}</Text>
            </View>
            <View className="flex-row w-[95%] h-fit justify-around mt-1 mb-2">
                <Text className="text-xs text-green-600">Verified Reports:-{totinfo.verifiedreports.length}</Text>
                <Text className="text-xs text-red-600">Unverified Reports:-{totinfo.unverifiedreports.length}</Text>
            </View>
        </View>
        )
    )
}