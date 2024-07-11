import { ScrollView, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import CSidebar from "../components/Sidebar"
import Searchbar3 from '../components/Searchbar3';
const { width, height } = Dimensions.get('window');
export default function Patient(){
    const drawer = useRef(null);
    return(
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={(2 * width) / 3}
            drawerPosition={'left'}
            renderNavigationView={() => <CSidebar drawer={drawer} />}
        >
            <Searchbar3
                drawer={drawer}
            />
        </DrawerLayoutAndroid>
    )
}