import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native';
import axios from "axios"

GoogleSignin.configure({
    webClientId: '1071950162762-k366e77dtb7h90cn4as9ctma37bd4j20.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
}
export default function GoogleSignIn({navigation,role,disabled,name}) {
    async function signin(){
        const uid=onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!')
        )
        if(role=="Caretaker"){
            const response= await axios.post("http://192.168.43.1:3000/en/loginCaretaker",{id:uid,name:name})

        }
        else{
            const response= await axios.post("http://192.168.43.1:3000/en/loginDoctor",{id:uid,name:name})
        }
        if(response.data){
            navigation.navigate(role)
        }
    }
    return (
        <Button
            title='Sign in with Google'
            onPress={() =>
                signin()
            }
            disabled={disabled}
        />
    );
}
