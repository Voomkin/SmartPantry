import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
} from 'react-native';

const NotificationsScreen = () => {
  const [sliderDimensions, setSliderDimensions] = useState({
    height: null,
    top: null,
    bottom: null,
  });

  const stepperAnim = useRef(new Animated.Value(0)).current;
  const railFillAnim = useRef(new Animated.Value(0)).current;

  const stepperResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      stepperAnim.setOffset(stepperAnim._value);
      railFillAnim.setOffset(railFillAnim._value);
    },
    onPanResponderMove: (evt, {dy, moveY}) => {
      if (moveY > sliderDimensions.top && moveY < sliderDimensions.bottom) {
        stepperAnim.setValue(dy);
        railFillAnim.setValue(-dy);
      }
    },
    onPanResponderRelease: () => {
      stepperAnim.flattenOffset();
      railFillAnim.flattenOffset();
    },
  });

  return (
    <SafeAreaView>
      <Text style={styles.title}>How often would you like to receive notifications?</Text>
      <View
        style={styles.slider}
        onLayout={(evt) => {
          const {height, y} = evt.nativeEvent.layout;
          setSliderDimensions({
            height: height,
            top: y,
            bottom: y + height,
          });
        }}>
        <View style={styles.rail}>
          <Animated.View style={[styles.railFill, {height: railFillAnim}]}>
            {sliderDimensions.height
              ? Array.apply(
                  null,
                  Array(Math.floor(sliderDimensions.height / 10)),
                ).map((item, index) => (
                  <View
                    key={index}
                    style={[styles.railFillSpace, {bottom: index * 10}]}
                  />
                ))
              : null}
          </Animated.View>
        </View>
        <Animated.View
          {...stepperResponder.panHandlers}
          style={[
            styles.stepper,
            {
              transform: [{translateY: stepperAnim}],
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 50,
  },
  slider: {
    width: 50,
    height: '120%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    marginBottom: 50,
  },
  rail: {
    width: 20,
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#DBDBDB',
  },
  stepper: {
    width: '100%',
    height: 5,
    backgroundColor: 'black',
  },
  railFill: {
    width: '100%',
    backgroundColor: '#CBAA71',
    position: 'absolute',
    bottom: 0,
  },
  railFillSpace: {
    height: 5,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
  },
});

export default NotificationsScreen;
