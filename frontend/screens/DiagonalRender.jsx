import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Dimensions } from 'react-native';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

function DiagonalRender({ navigation }) {
    let usrdata = { type: 'Home' };
    const imageRef = useRef(null);
    const positionY = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0)).current;
    const fadeValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        async function find() {
            try {
                const response = await axios.get(
                    'http://192.168.29.80:3000/en/checksession'
                );
                if (response.data && response.data.type !== 'Home') {
                    usrdata = response.data;
                }
            } catch (error) {
                console.error(error);
            }
        }
        const zoomIn = Animated.sequence([
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeValue, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(400),
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 0.5,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(positionY, {
                    toValue: -0.76 * height,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ]);
        async function start() {
            await find();
            zoomIn.start(() => {
                navigation.navigate(usrdata.type);
            });
        }
        start();
    }, []);

    return (
        <View className='flex justify-center items-center w-screen h-screen'>
            <Animated.Image
                ref={imageRef}
                source={require('../assets/loader.png')}
                style={[
                    {
                        width: '70%',
                        height: '70%',
                        resizeMode: 'contain',
                        opacity: fadeValue,
                        transform: [
                            { scale: scaleValue },
                            { translateY: positionY },
                        ],
                    },
                ]}
            />
        </View>
    );
}

export default DiagonalRender;
