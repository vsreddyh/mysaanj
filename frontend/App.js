import { BackHandler, Alert, StatusBar } from 'react-native';
import Home from './screens/Home';
import { useEffect } from 'react';
import DiagonalRender from './screens/DiagonalRender';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Caretaker from './screens/Caretaker';
import { NativeWindStyleSheet } from 'nativewind';
import CreatePatient from './screens/CreatePatient';
import Patient from './screens/Patient';
import NewReport from './screens/addReport';
import Report from './screens/Report';
import Doctor from './screens/Doctor';
import ReviewReport from './screens/ReviewReport';
import PDF from './components/Pdf';
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
                CreatePatient: '/createpatient',
                Patient: '/patient',
                NewReport: '/newreport',
                Report: '/report',
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
            <StatusBar barStyle='light-content' backgroundColor='#000' />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={DiagonalRender} />
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen
                    name='Caretaker'
                    component={Caretaker}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen
                    name='CreatePatient'
                    component={CreatePatient}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen
                    name='Patient'
                    component={Patient}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen
                    name='NewReport'
                    component={NewReport}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen
                    name='Doctor'
                    component={Doctor}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen name='Report' component={Report} />
                <Stack.Screen name='DReport' component={ReviewReport} />
                <Stack.Screen name='Pdf' component={PDF} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
