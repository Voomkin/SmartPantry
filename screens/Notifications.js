/*
Note: As of 3/23/2022, initial layout of page complete. In progress: Saving the notification preference of the user based on the scroll input.
TODO: Send push notifications regularly, and at a frequency based on the user's preference (probably from hourly to never)
*/

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Button,
  Alert,
} from 'react-native';
import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';



let notification_preference = 5;

const UpdatePreference = ( new_preference ) => {
    // alert(new_preference);
    notification_preference = new_preference;
}

const GetPreference = () => {
    return notification_preference;
}

const TestFunction = ( test_value ) => {
    if(test_value > 10)
        alert("GREATER");
    else
        alert("LESS");
};

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

  let outer_y = 200;

  return (
    <SafeAreaView>
      <Text style={styles.title}>How often would you like to receive notifications?</Text>
      <View
        style={styles.slider}
        onLayout={(evt) => {
          let {height, y} = evt.nativeEvent.layout;
          outer_y = y;

          setSliderDimensions({
            height: height,
            top: y,
            bottom: y + height,
          });

        //   UpdatePreference(y);
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

        //   { ...outer_y += 10 }
        />
      </View>
      <Button
        onPress={() => {
            UpdatePreference(outer_y);
            Alert.alert("New preference: " + notification_preference);
        }}
        title="Confirm"
        color="blue"
        accessibilityLabel="Click here to confirm your notification preference"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 50,
    marginBottom: 100,
  },
  slider: {
    marginVertical: 50,
    width: 50,
    height: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    marginBottom: 0,
  },
  rail: {
    width: 20,
    height: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#DBDBDB',
  },
  stepper: {
    width: '100%',
    height: 15,
    backgroundColor: 'gray',
  },
  railFill: {
    width: '100%',
    backgroundColor: 'lightgreen',
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

// const useNotifications = (notificationListener) => {
//     useEffect(() => {
//       registerForPushNotifications();
  
//       if (notificationListener) Notifications.addListener(notificationListener);
//     }, []);

export default NotificationsScreen;
