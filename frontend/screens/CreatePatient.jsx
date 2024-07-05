import { ScrollView, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { useRef } from 'react';
import Chatbot from '../components/Chatbot';
import Searchbar2 from '../components/Searchbar2';
import CSidebar from '../components/Sidebar';
import PatientForm from '../components/PatientForm';
const { width, height } = Dimensions.get('window');

export default function CreatePatient({ navigation }) {
    const drawer = useRef(null);
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition={'left'}
            renderNavigationView={() => <CSidebar drawer={drawer} />}
        >
            <Searchbar2 drawer={drawer} navigation={navigation} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                className='w-screen'
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                <PatientForm />
            </ScrollView>
            <Chatbot />
        </DrawerLayoutAndroid>
    );
}
