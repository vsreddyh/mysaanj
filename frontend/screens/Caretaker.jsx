import { ScrollView, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { useRef, useState } from 'react';
import Searchbar1 from '../components/Searchbar1';
import PatientCard from '../components/PatientCard';
import Chatbot from '../components/Chatbot';
import CSidebar from '../components/Sidebar';
const { width, height } = Dimensions.get('window');
import axios from "axios"
export default function Caretaker({ navigation }) {
    const drawer = useRef(null);
    const [list,setlist]=useState(null)
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition={'left'}
            renderNavigationView={() => <CSidebar drawer={drawer} />}
        >
            <Searchbar1 drawer={drawer} navigation={navigation} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                className='w-screen'
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                <PatientCard />
            </ScrollView>
            <Chatbot />
        </DrawerLayoutAndroid>
    );
}
