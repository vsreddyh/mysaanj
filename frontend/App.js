import { StatusBar } from 'expo-status-bar';
import { Text, View,BackHandler,Alert} from 'react-native';
import Home from './screens/Home';
import { useEffect } from 'react';
import Frontpage from './screens/Frontpage';
import DiagonalRender from './screens/DiagonalRender';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeWindStyleSheet } from 'nativewind';
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
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name='SplashScreen' component={DiagonalRender}/>
                <Stack.Screen name="Home" component={Home} options={{ animation: 'none' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
