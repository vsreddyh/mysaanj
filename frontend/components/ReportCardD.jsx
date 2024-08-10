import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
export default function ReportCardD({ navigation, report }) {
    const [data, setdata] = useState(report);
    const [date, setdate] = useState(null);
    const[severitycolour,setsc]=useState('text-yellow-500');
    useEffect(() => {
        async function f1(report) {
            function formatDate(dat) {
                const date = new Date(dat);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                const year = date.getFullYear();
                const x=report.severity
                if(x>7){
                    setsc('text-red-500')
                }
                // You can replace '-' with any separator you like
                return `${day}/${month}/${year}`;
            }
            setdate(formatDate(report.dateOfReport));
        }
        f1(report);
    }, []);
    return (
        data && (
            <TouchableOpacity
                className='flex justify-around mt-2 items-center bg-zinc-300 rounded-3xl w-[85%] h-fit'
                onPress={() =>
                    navigation.navigate('Report', { data: data })
                }
            >
                <View className='flex-row w-[95%] h-fit ml-7 mt-2 mb-1'>
                    <Text className='text-base'>Patient:- {data.patient}</Text>
                </View>
                <View className='flex-row w-[95%] h-fit justify-around mt-1 mb-1'>
                    <Text className={'text-base '+severitycolour}>Severity:-{data.severity}</Text>
                    <Text className='text-base'>Date:-{date}</Text>
                </View>
                <View className='flex-row w-[95%] h-fit justify-around mt-1 mb-2'>
                    <Text className='text-base text-green-600'>
                        From:- {data.oldAgeHomeName}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    );
}
