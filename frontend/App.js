import { Text, View, BackHandler, Alert,StatusBar } from 'react-native';
import Home from './screens/Home';
import { useEffect } from 'react';
import DiagonalRender from './screens/DiagonalRender';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Caretaker from './screens/Caretaker';
import { NativeWindStyleSheet } from 'nativewind';
import CreatePatient from './screens/CreatePatient';
NativeWindStyleSheet.setOutput({
    default: 'native',
});
export default function App() {
    const Stack = createNativeStackNavigator();
    const linking = {
        prefixes: ['localhost:8081'],
        config: {
            screens: {
                SplashScreen: '',
                Home: '/home',
                Caretaker: '/caretaker',
                CreatePatient:"/createpatient"
            },
        },
    };
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return;
    });
    return (
        <NavigationContainer linking={linking}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={DiagonalRender} />
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen name='Caretaker' component={Caretaker} options={{animation:'none'}}/>
                <Stack.Screen name='CreatePatient' component={CreatePatient} options={{animation:'none'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
