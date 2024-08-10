import {View,Image, TouchableOpacity, TextInput} from "react-native";
export default function Searchbar4({drawer,navigation,setaddkey}) {
    return (
        <View className="w-full h-16 flex-row items-center bg-blue-600 fixed">
            <TouchableOpacity className="h-[50%] w-[11%] m-2" onPress={() => drawer.current?.openDrawer()}>
                <Image source={require('../assets/Menubar.png')} className="h-full w-full"/>
            </TouchableOpacity>
            <View className="h-[50%] items-center w-[50%] rounded-3xl flex-row bg-white m-2">
                <TextInput className="m-1.5 h-[100%] w-[73%] text-xl" placeholder={"Search"}/>
                <Image source={require('../assets/Search.png')} className="object-contain h-[90%] w-[17%]"/>
            </View>
            <TouchableOpacity className="h-[50%] w-[11%] m-2">
                <Image source={require('../assets/Bell.png')} className="object-contain h-full w-full"/>
            </TouchableOpacity>
            <TouchableOpacity className="h-[50%] w-[11%] m-2" onPress={() => setaddkey(true) }>
                <Image source={require('../assets/addkey.png')} className="object-contain h-full w-full"/>
            </TouchableOpacity>
        </View>
    );
}