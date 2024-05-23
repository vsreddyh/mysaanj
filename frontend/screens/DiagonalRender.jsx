import React, { useRef, useEffect } from 'react';
import { Animated, Image, View, Text } from 'react-native';

function DiagonalRender({ navigation }) {
  const imageRef = useRef(null);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      Animated.delay(800),
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]);

    zoomIn.start(() => {
      navigation.navigate('Home');
    });
  }, []);

  return (
    <View className="flex justify-center items-center w-screen h-screen">
      <Animated.Image
        ref={imageRef}
        source={require('../assets/loader.png')}
        style={[
          {
            width: '70%',
            height: '70%',
            resizeMode: 'contain',
            opacity: fadeValue,
            transform: [{ scale: scaleValue }],
          },
        ]}
      />
    </View>
  );
}

export default DiagonalRender;

