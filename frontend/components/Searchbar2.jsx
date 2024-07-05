import {View,Image, TouchableOpacity,Text} from "react-native";
export default function Searchbar2({drawer,navigation}) {
    return (
        <View className="w-full h-16 flex-row items-center bg-blue-600 fixed pl-2">
            <TouchableOpacity className="h-[50%] w-[11%]" onPress={() => drawer.current?.openDrawer()}>
                <Image source={require('../assets/Menubar.png')} className="h-full w-full"/>
            </TouchableOpacity>
            <View className="w-[39%]">
            </View>
            <TouchableOpacity className="h-full w-[25%] flex justify-center items-center" onPress={() => navigation.goBack()}>
                <Text className="text-white text-xl ">DISCARD</Text>
            </TouchableOpacity>
            <TouchableOpacity className="h-full w-[25%] flex justify-center items-center">
                <Text className="text-white text-xl font-bold">SAVE</Text>
            </TouchableOpacity>
        </View>
    )
}