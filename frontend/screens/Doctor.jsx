import {
    ScrollView,
    DrawerLayoutAndroid,
    Dimensions,
    View,
    RefreshControl,
    Text,
} from 'react-native';
import { useEffect, useRef, useState, useCallback } from 'react';
import Searchbar4 from '../components/Searchbar4';
import ReportCardD from '../components/ReportCardD';
import Chatbot from '../components/Chatbot';
import Dsidebar from '../components/Dsidebar';
const { width, height } = Dimensions.get('window');
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import Addkey from '../components/addkey';
export default function Doctor({ navigation, route }) {
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
    const [addkey,setaddkey]=useState(false);
    useEffect(() => {
        async function getcurr() {
            const response1 = await axios.get(
                'http://192.168.29.80:3000/en/getreports'
            );
            setlist(response1.data);
        }
        getcurr();
    }, [isFocused, refreshing]);
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition="left"
            renderNavigationView={() => (
                <Dsidebar drawer={drawer} navigation={navigation} isFocused={isFocused} refreshing={refreshing}/>
            )}
        >
            
            <Searchbar4 drawer={drawer} navigation={navigation} setaddkey={setaddkey} />
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
                    list.map((report, index) => (
                        <ReportCardD
                            key={index}
                            report={report}
                            navigation={navigation}
                        />
                    ))
                ) : (
                    <View className='h-[80vh] w-[100vh] flex justify-center items-center'>
                        <Text>No Reports. Try Refreshing</Text>
                        <Text>Click + to add a key of Old Age Home</Text>
                    </View>
                )}
            </ScrollView>
            <Chatbot />
            {addkey && <Addkey setaddkey={setaddkey}/>}
        </DrawerLayoutAndroid>
    );
}
