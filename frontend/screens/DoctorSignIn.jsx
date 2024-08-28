// import React, { useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import { CheckBox } from 'rn-inkpad';
// import GoogleSignIn from '../components/GoogleSignIn';
// export default function DoctorSignIn({ navigation, router }) {
//     const [Checked, Check] = useState(false);
//     return (
//         <View>
//             <View className='w-full h-full flex-row bg-zinc-300 rounded-2xl'>
//                 <View className='flex items-center w-[35%]'>
//                     <Image
//                         className='w-[80%] h-full'
//                         source={require('../assets/Doctor.png')}
//                         style={[
//                             {
//                                 resizeMode: 'contain',
//                             },
//                         ]}
//                     />
//                 </View>
//                 <View className='flex w-[65%] items-center mt-1'>
//                     <Text className='text-2xl font-medium'>Doctor</Text>
//                     <Text>
//                         I specialize in geriatric care, focusing on the unique
//                         needs of our senior community.
//                     </Text>
//                 </View>
//             </View>
//             <View className='h-60'>
//                 <Text>Terms and Conditions</Text>
//                 <ScrollView
//                     contentContainerStyle={{
//                         flexGrow: 1,
//                         alignItems: 'center',
//                     }}
//                     scrollEnabled={true}
//                     nestedScrollEnabled={true}
//                 >
//                     <Text>
//                         1. The doctor agrees to use the app solely for the
//                         purpose of reviewing and managing medical reports for
//                         old age home residents linked through the app.
//                     </Text>
//                     <Text>
//                         2. The doctor acknowledges that the app provides a key
//                         to link with old age homes, but is not responsible for
//                         establishing or enforcing any contractual relationships
//                         between the doctor and the old age homes.
//                     </Text>
//                     <Text>
//                         3. The doctor is responsible for ensuring that any
//                         medical advice or actions taken based on the reports and
//                         analyses provided by the app are in line with
//                         professional medical standards and practices.
//                     </Text>
//                     <Text>
//                         4. The doctor agrees that the app's analysis of medical
//                         reports is based on automated processes and should not
//                         replace professional medical judgment.
//                     </Text>
//                     <Text>
//                         5. The doctor understands that it is their
//                         responsibility to review the reports and provide
//                         necessary medical advice or action within a reasonable
//                         time frame.
//                     </Text>
//                     <Text>
//                         6. The app is not liable for any consequences resulting
//                         from the failure of the doctor or the old age home to
//                         follow the analysis or recommendations provided by the
//                         app.
//                     </Text>
//                     <Text>
//                         7. The doctor agrees to comply with all applicable
//                         privacy and data protection laws when using the app,
//                         including ensuring that patient information is kept
//                         confidential and secure.
//                     </Text>
//                     <Text>
//                         8. The app reserves the right to modify or terminate its
//                         services at any time, with or without notice to the
//                         doctor.
//                     </Text>
//                     <Text>
//                         9. The doctor is responsible for maintaining all
//                         necessary licenses and qualifications to provide medical
//                         care to the residents of the old age homes linked
//                         through the app.
//                     </Text>
//                     <Text>
//                         10. The app is not responsible for any disputes or
//                         disagreements between the doctor and the old age homes,
//                         including but not limited to issues related to the
//                         quality of care or payment for services.
//                     </Text>
//                     <Text>
//                         11. By using the app, the doctor agrees to indemnify and
//                         hold harmless the app's developers and operators from
//                         any claims, damages, or liabilities arising out of their
//                         use of the app.
//                     </Text>
//                     <Text>
//                         12. The doctor agrees to review reports and analyses
//                         provided by the app in a timely manner to ensure the
//                         well-being of the residents under their care.
//                     </Text>
//                 </ScrollView>
//             </View>
//             <TextInput placeholder='Enter Your Name(no prefixes)'/>
//             <CheckBox
//                 checked={Checked}
//                 iconColor={'#2563eb'}
//                 iconSize={25}
//                 textStyle={{ fontSize: 20 }}
//                 onChange={Check}
//                 title={'I accept above Terms and Conditions'}
//             />
//             <GoogleSignIn
//                 role={'Doctor'}
//                 navigation={navigation}
//                 disabled={!Check}
//             />
//         </View>
//     );
// }
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { CheckBox } from 'rn-inkpad';
import GoogleSignIn from '../components/GoogleSignIn';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { NativeSearchBar } from 'react-native-screens';
export default function DoctorSigIn({ navigation, router }) {
    const [Checked, Check] = useState(false);
    const [name, setname] = useState(null);
    useEffect(() => {
        async function checkcurrentuser() {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const response = await axios.post(
                    'http://192.168.43.1:3000/en/loginDoctor',
                    { id: currentUser.uid, name: name }
                );
                if (response.data) {
                    navigation.navigate('Doctor');
                }
                return <ActivityIndicator size={'large'} />;
            } else {
                const response = await axios.post(
                    'http://192.168.43.1:3000/en/deletesession'
                );
                return (
                    <View>
                        <View className='w-full h-full flex-row bg-zinc-300 rounded-2xl'>
                            <View className='flex items-center w-[35%]'>
                                <Image
                                    className='w-[80%] h-full'
                                    source={require('../assets/Doctor.png')}
                                    style={[
                                        {
                                            resizeMode: 'contain',
                                        },
                                    ]}
                                />
                            </View>
                            <View className='flex w-[65%] items-center mt-1'>
                                <Text className='text-2xl font-medium'>
                                    Doctor
                                </Text>
                                <Text>
                                    I specialize in geriatric care, focusing on
                                    the unique needs of our senior community.
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
                                    1. The doctor agrees to use the app solely
                                    for the purpose of reviewing and managing
                                    medical reports for old age home residents
                                    linked through the app.
                                </Text>
                                <Text>
                                    2. The doctor acknowledges that the app
                                    provides a key to link with old age homes,
                                    but is not responsible for establishing or
                                    enforcing any contractual relationships
                                    between the doctor and the old age homes.
                                </Text>
                                <Text>
                                    3. The doctor is responsible for ensuring
                                    that any medical advice or actions taken
                                    based on the reports and analyses provided
                                    by the app are in line with professional
                                    medical standards and practices.
                                </Text>
                                <Text>
                                    4. The doctor agrees that the app's analysis
                                    of medical reports is based on automated
                                    processes and should not replace
                                    professional medical judgment.
                                </Text>
                                <Text>
                                    5. The doctor understands that it is their
                                    responsibility to review the reports and
                                    provide necessary medical advice or action
                                    within a reasonable time frame.
                                </Text>
                                <Text>
                                    6. The app is not liable for any
                                    consequences resulting from the failure of
                                    the doctor or the old age home to follow the
                                    analysis or recommendations provided by the
                                    app.
                                </Text>
                                <Text>
                                    7. The doctor agrees to comply with all
                                    applicable privacy and data protection laws
                                    when using the app, including ensuring that
                                    patient information is kept confidential and
                                    secure.
                                </Text>
                                <Text>
                                    8. The app reserves the right to modify or
                                    terminate its services at any time, with or
                                    without notice to the doctor.
                                </Text>
                                <Text>
                                    9. The doctor is responsible for maintaining
                                    all necessary licenses and qualifications to
                                    provide medical care to the residents of the
                                    old age homes linked through the app.
                                </Text>
                                <Text>
                                    10. The app is not responsible for any
                                    disputes or disagreements between the doctor
                                    and the old age homes, including but not
                                    limited to issues related to the quality of
                                    care or payment for services.
                                </Text>
                                <Text>
                                    11. By using the app, the doctor agrees to
                                    indemnify and hold harmless the app's
                                    developers and operators from any claims,
                                    damages, or liabilities arising out of their
                                    use of the app.
                                </Text>
                                <Text>
                                    12. The doctor agrees to review reports and
                                    analyses provided by the app in a timely
                                    manner to ensure the well-being of the
                                    residents under their care.
                                </Text>
                            </ScrollView>
                        </View>
                        <TextInput
                            placeholder='Enter Your Name(no prefixes)'
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
                            role={'Doctor'}
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
