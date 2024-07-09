import { ScrollView, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Searchbar1 from '../components/Searchbar1';
import PatientCard from '../components/PatientCard';
import Chatbot from '../components/Chatbot';
import CSidebar from '../components/Sidebar';
const { width, height } = Dimensions.get('window');
import axios from "axios"
export default function Caretaker({ navigation }) {
    const drawer = useRef(null);
    const [cdetails,setcdetails]=useState(null)
    const [list,setlist]=useState(null)
    // useEffect(()=>{
    //     async function getcurr(){
    //         const response=await axios.get("https://mysaanj.vercel.app/en/checksession");
    //         setcdetails(response.data);
    //         const response1=await axios.get(`https://mysaanj.vercel.app/en/getpatients/id=${response.data}`);
    //         setlist(response1.data); 
    //     }
    //     getcurr()
    // },[])
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition={'left'}
            renderNavigationView={() => <CSidebar drawer={drawer} cdetails={cdetails}/>}
        >
            <Searchbar1 drawer={drawer} navigation={navigation} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                className='w-screen'
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
            {
                list && list.map((patientinfo,index)=>{
                    <PatientCard patientinfo={patientinfo} />
                })
            }
            </ScrollView>
            <Chatbot />
        </DrawerLayoutAndroid>
    );
}
