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
        gender: 'Male',
        Medications: '',
        weight: '',
    });
    useEffect(() => {
        if (save && ok) {
            try {
                const savepatient = async () => {
                    console.log('running');
                    const response = await axios.post(
                        'https://mysaanj.vercel.app/en/setPatient',
                        info
                    );
                    console.log(response.data);
                    return response.data;
                };
                setsave(false);
                setok(false);
                let a = savepatient();
                console.log(a);
            } catch (error) {
                console.log(error);
            }
            navigation.navigate('Caretaker');
        }
    }, [save, ok]);
    console.log(save, ok, 4);
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition={'left'}
            renderNavigationView={() => <CSidebar drawer={drawer} />}
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
