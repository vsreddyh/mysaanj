import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { CheckBox } from 'rn-inkpad';
import GoogleSignIn from '../components/GoogleSignIn';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { NativeSearchBar } from 'react-native-screens';
export default function CaretakerSigIn({ navigation, router }) {
    const [Checked, Check] = useState(false);
    const [name,setname]=useState(null)
    useEffect(() => {
        async function checkcurrentuser() {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const response = await axios.post(
                    'http://192.168.43.1:3000/en/loginCaretaker',
                    { id: currentUser.uid,name:name }
                );
                if(response.data){
                    navigation.navigate('Caretaker');
                }
                return(
                    <ActivityIndicator size={"large"}/>
                )
            } else {
                const response = await axios.post(
                    'http://192.168.43.1:3000/en/deletesession'
                );
                return (
                    <View>
                        <View className=' w-full h-full flex-row bg-zinc-300 rounded-2xl'>
                            <View className='flex items-center w-[35%]'>
                                <Image
                                    className='w-[80%] h-full'
                                    source={require('../assets/oldAgeHome.png')}
                                    style={[
                                        {
                                            resizeMode: 'contain',
                                        },
                                    ]}
                                />
                            </View>
                            <View className='flex w-[65%] items-center mt-1'>
                                <Text className='text-2xl font-medium'>
                                    Caretaker
                                </Text>
                                <Text>
                                    I provide companionship, assistance, and
                                    ensure the well-being of our valued
                                    residents.
                                </Text>
                            </View>
                        </View>
                        <View className='h-60'>
                            <Text>Terms and Conditions</Text>
                            <ScrollView
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    alignItems: 'center',
                                }}
                                scrollEnabled={true}
                                nestedScrollEnabled={true}
                            >
                                <Text>
                                    1. The old age home agrees to use the app
                                    solely for the purpose of uploading and
                                    managing medical reports for its residents.
                                </Text>
                                <Text>
                                    2. The old age home acknowledges that the
                                    app provides a key to link with doctors, but
                                    is not responsible for establishing or
                                    enforcing any contractual relationships
                                    between the old age home and the doctors.
                                </Text>
                                <Text>
                                    3. The old age home is responsible for
                                    ensuring that all medical reports uploaded
                                    to the app are accurate, complete, and
                                    updated as necessary.
                                </Text>
                                <Text>
                                    4. The old age home agrees that the app's
                                    analysis of medical reports is based on
                                    automated processes and should not replace
                                    professional medical judgment.
                                </Text>
                                <Text>
                                    5. The old age home understands that it is
                                    the responsibility of the linked doctors to
                                    review the reports and provide any necessary
                                    medical advice or action.
                                </Text>
                                <Text>
                                    6. The app is not liable for any
                                    consequences resulting from the failure of
                                    the old age home or the doctor to follow the
                                    analysis or recommendations provided by the
                                    app.
                                </Text>
                                <Text>
                                    7. The old age home agrees to comply with
                                    all applicable privacy and data protection
                                    laws when using the app, including obtaining
                                    consent from residents or their legal
                                    representatives to share medical
                                    information.
                                </Text>
                                <Text>
                                    8. The app reserves the right to modify or
                                    terminate its services at any time, with or
                                    without notice to the old age home.
                                </Text>
                                <Text>
                                    9. The old age home is responsible for
                                    ensuring that any linked doctors are
                                    licensed and qualified to provide medical
                                    care to its residents.
                                </Text>
                                <Text>
                                    10. The app is not responsible for any
                                    disputes or disagreements between the old
                                    age home and the doctors, including but not
                                    limited to issues related to the quality of
                                    care or payment for services.
                                </Text>
                                <Text>
                                    11. By using the app, the old age home
                                    agrees to indemnify and hold harmless the
                                    app's developers and operators from any
                                    claims, damages, or liabilities arising out
                                    of its use of the app.
                                </Text>
                            </ScrollView>
                        </View>
                        <TextInput placeholder='Enter Old Age Home Name'
                        onChange={(e) => {
                            e.persist();
                            setname(e.nativeEvent.text);
                        }}
                        />
                        <CheckBox
                            checked={Checked}
                            iconColor={'#2563eb'}
                            iconSize={25}
                            textStyle={{ fontSize: 20 }}
                            onChange={Check}
                            title={'I accept above Terms and Conditions'}
                        />
                        <GoogleSignIn
                            role={'Caretaker'}
                            name={name}
                            navigation={navigation}
                            disabled={!(Check && name)}
                        />
                    </View>
                );
            }
        }
        checkcurrentuser();
    }, []);
}
