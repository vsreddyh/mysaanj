import {Image,View, TouchableOpacity} from "react-native"

export default function Chatbot(){
    return (
        <View className="w-16 h-14 bg-blue-600 rounded-xl z-1 flex justify-center items-center absolute bottom-5 right-5">
            <Image source={require('../assets/chat.png')} className="w-[80%]] h-[80%] object-contain"/>
        </View>
    )
}