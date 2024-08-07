import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
export default function ReportCard({ navigation, reportid }) {
    const [data, setdata] = useState(null);
    const [date, setdate] = useState(null);
    useEffect(() => {
        async function f1(reportid) {
            const response = await axios.get(
                `http://192.168.29.80:3000/en/getreport?id=${reportid}`
            );
            setdata(response.data);
            function formatDate(dat) {
                const date = new Date(dat);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                const year = date.getFullYear();
                console.log(day, month, year, 'uiyu');
                // You can replace '-' with any separator you like
                return `${day}/${month}/${year}`;
            }
            setdate(formatDate(response.data.dateOfReport));
        }
        f1(reportid);
    }, []);
    return (
        data && (
            <TouchableOpacity
                className='w-full h-fit bg-zinc-300 flex py-4 rounded-2xl'
                onPress={() => navigation.navigate('Report', { data: data })}
            >
                <View className='flex-row justify-around mb-2'>
                    <Text>Severity:-{data.severity}</Text>
                    <Text>Date:-{date}</Text>
                </View>
                {data.doctor && (
                    <Text className='pl-5'>Reviewed by:- {data.doctor}</Text>
                )}
            </TouchableOpacity>
        )
    );
}
