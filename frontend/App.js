import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Login from './screens/Home';
import DiagonalRender from './screens/DiagonalRender';
import { NavigationContainer,  } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
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
  return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={DiagonalRender}/>
          <Stack.Screen name="Home" component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
