import {
    ScrollView,
    DrawerLayoutAndroid,
    Dimensions,
    View,
    RefreshControl,
    Text,
} from 'react-native';
import { useEffect, useRef, useState, useCallback } from 'react';
import Searchbar1 from '../components/Searchbar1';
import PatientCard from '../components/PatientCard';
import Chatbot from '../components/Chatbot';
import CSidebar from '../components/Sidebar';
const { width, height } = Dimensions.get('window');
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
export default function Caretaker({ navigation, route }) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    const isFocused = useIsFocused();
    const drawer = useRef(null);
    const [list, setlist] = useState(null);
    useEffect(() => {
        async function getcurr() {
            const response1 = await axios.get(
                'http://192.168.29.80:3000/en/getpatients'
            );
            setlist(response1.data);
        }
        getcurr();
    }, [isFocused, refreshing]);
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition={'left'}
            renderNavigationView={() => (
                <CSidebar drawer={drawer} navigation={navigation} />
            )}
        >
            <Searchbar1 drawer={drawer} navigation={navigation} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                className='w-screen'
                scrollEnabled={true}
                nestedScrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {list && list.length > 0 ? (
                    list.map((patientinfo, index) => (
                        <PatientCard
                            key={index}
                            patientinfo={patientinfo}
                            navigation={navigation}
                        />
                    ))
                ) : (
                    <View className='h-[80vh] w-[100vh] flex justify-center items-center'>
                        <Text>No Patients.</Text>
                        <Text>Click + to add a Patient</Text>
                    </View>
                )}
            </ScrollView>
            <Chatbot />
        </DrawerLayoutAndroid>
    );
}
