import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import Pdf from 'react-native-pdf';
import axios from 'axios';
import { BarIndicator } from 'react-native-indicators';
export default function PDF({ navigation, route }) {
    const { fileId } = route.params;
    const [pdf, setpdf] = useState(null);
    useEffect(() => {
        async function f1() {
            const response = await axios.get(
                `http://192.168.43.1:3000/en/getpdf?id=${fileId}`,
                { responseType: 'arraybuffer' }
            );
            console.log(response.data);
            const arrayBufferToBase64 = (buffer) => {
                let binary = '';
                const bytes = new Uint8Array(buffer);
                for (let i = 0; i < bytes.byteLength; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return `data:application/pdf;base64,${btoa(binary)}`;
            };
            const x = arrayBufferToBase64(response.data);
            setpdf(x);
        }
        f1();
    });
    const source = { uri: pdf, cache: true };
    console.log(fileId);
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/leftarrow.png')} />
                </TouchableOpacity>
            </View>
            {pdf ?
            <Pdf
                source={source}
                trustAllCerts={false}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
            />
            :
            <BarIndicator size={80} count= {7} color='rgb(0,102,255)' />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
