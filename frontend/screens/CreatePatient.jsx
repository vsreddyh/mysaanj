import { ScrollView, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import Chatbot from '../components/Chatbot';
import Searchbar2 from '../components/Searchbar2';
import CSidebar from '../components/Sidebar';
import PatientForm from '../components/PatientForm';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

export default function CreatePatient({ navigation }) {
    const drawer = useRef(null);
    const [save, setsave] = useState(false);
    const [ok, setok] = useState(false);
    const [info, setinfo] = useState({
        name: '',
        DOB: new Date(),
        chronics: '',
        bloodGroup: 'AB+',
        gender: 'M',
        Medications: '',
        weight: '',
    });
    useEffect(() => {
        if (save && ok) {
            try {
                const savepatient = async () => {
                    const response = await axios.post(
                        'http://192.168.43.1:3000/en/setPatient',
                        info
                    );
                    return response.data;
                };
                setsave(false);
                setok(false);
                let a = savepatient();
            } catch (error) {
                console.log(error);
            }
            navigation.navigate('Caretaker');
        }
    }, [save, ok]);
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition={'left'}
            renderNavigationView={() => (
                <CSidebar drawer={drawer} navigation={navigation} />
            )}
        >
            <Searchbar2
                drawer={drawer}
                navigation={navigation}
                setsave={setsave}
            />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                className='w-screen'
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                <PatientForm
                    info={info}
                    setinfo={setinfo}
                    save={save}
                    setsave={setsave}
                    setok={setok}
                />
            </ScrollView>
            <Chatbot />
        </DrawerLayoutAndroid>
    );
}
