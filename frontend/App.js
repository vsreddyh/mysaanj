import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Home from './screens/Home';
import DiagonalRender from './screens/DiagonalRender';
import { NavigationContainer,  } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeWindStyleSheet } from "nativewind";

import {useAuth0, Auth0Provider} from 'react-native-auth0';
NativeWindStyleSheet.setOutput({
  default: "native",
});
const LogoutButton = () => {
  const {clearSession} = useAuth0();

  const onPress = async () => {
      try {
          await clearSession();
      } catch (e) {
          console.log(e);
      }
  };

  return <Button onPress={onPress} title="Log out" />
}
const LoginButton = () => {
  const {authorize} = useAuth0();

  const onPress = async () => {
      try {
          await authorize();
      } catch (e) {
          console.log(e);
      }
  };

  return <Button onPress={onPress} title="Log in" />
}
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
    <Auth0Provider domain={"dev-vsreddyh.jp.auth0.com"} clientId={"Co6kqYoNCRl83Py4vrvZ86dVGxpPQ0tZ"}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={DiagonalRender}/>
          <Stack.Screen name="Home" component={LoginButton}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Auth0Provider>
      
  );
}
