import {View,Image, TouchableOpacity,Text} from "react-native";
export default function Searchbar3({drawer,navigation,info}) {
    return (
        <View className="w-full h-16 flex-row items-center bg-blue-600 fixed pl-2">
            <TouchableOpacity className="h-[50%] w-[11%]" onPress={() => drawer.current?.openDrawer()}>
                <Image source={require('../assets/Menubar.png')} className="h-full w-full"/>
            </TouchableOpacity>
            <View className="w-[69%]">
            </View>
            <TouchableOpacity className="h-full w-[20%] justify-center items-center" onPress={()=>navigation.navigate("NewReport",{info:info})}>
                <Image source={require("../assets/addfile.png")}/>
            </TouchableOpacity>
        </View>
    )
}