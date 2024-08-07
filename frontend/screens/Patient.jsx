import { ScrollView, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import CSidebar from "../components/Sidebar"
import Searchbar3 from '../components/Searchbar3';
import PatientInfo from '../components/PatientInfo';
const { width, height } = Dimensions.get('window');
export default function Patient({navigation,route}){
    const drawer = useRef(null);
    const {info} = route.params
    return(
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition={'left'}
            renderNavigationView={() => <CSidebar drawer={drawer} navigation={navigation}/>}
        >
            <Searchbar3
                drawer={drawer}
                navigation={navigation}
                info={info}
            />
            <PatientInfo navigation={navigation} info={info}/>
        </DrawerLayoutAndroid>
    )
}