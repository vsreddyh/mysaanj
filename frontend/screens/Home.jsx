import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput,BackHandler,Alert } from "react-native";

export default function Home() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return
  })
  return (
    <View classname="w-screen h-screen">

    </View>
  );
}