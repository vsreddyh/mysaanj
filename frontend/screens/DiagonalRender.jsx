import React, { useRef, useEffect } from 'react';
import { Animated,View,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

function DiagonalRender({ navigation }) {
  const imageRef = useRef(null);
  const positionY = useRef(new Animated.Value(0)).current;
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
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(positionY, {
          toValue: -0.76*height,
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
            transform: [{ scale: scaleValue },
              { translateY: positionY }
            ],
          },
        ]}
      />
    </View>
  );
}

export default DiagonalRender;

