
import React, {useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Button,
  Alert,
  Platform,
} from 'react-native';
// import { Notifications } from 'expo';
import PushNotification from 'react-native-push-notification';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getPantry } from "../queries";
import { deletePantry, updatePantry } from "../mutations";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

const updateFrequency = async ( new_frequency ) => {
    try {
      

      const user = await Auth.currentAuthenticatedUser(); // returns cognito user JSON

      const pantryData = await API.graphql(
        graphqlOperation(getPantry, { id: user.username.toString() })
      );

      if (pantryData.data.getPantry == null) {
        Alert.alert("Notifications", "You must have a pantry to select a notification frequency");
        return null;
      } else {

        const pantryInput = {
          notiffreq: new_frequency,
        }

        const update = {
          id: user.username.toString(),
          notiffreq: new_frequency,
        }

        const u = await API.graphql(graphqlOperation(updatePantry, {input: update}));

      const pantryData2 = await API.graphql(
        graphqlOperation(getPantry, { id: user.username.toString() })
      );

      Alert.alert("Notifications", "Your notification frequency will be set to: " + new_frequency);
    }
  } catch (err) {
    console.log(err);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsScreen = () => {
  // fetchItems();
  // ReceiveNotification();
  try {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect( () => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  } catch(err) {
    console.log(err);
  }

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
    // The following code was used for the slider, which at the moment we are no longer using
    // <SafeAreaView>
    //   <Text style={styles.title}>How often would you like to receive notifications?</Text>
    //   <View
    //     style={styles.slider}
    //     onLayout={(evt) => {
    //       let {height, y} = evt.nativeEvent.layout;
    //       outer_y = y;

    //       setSliderDimensions({
    //         height: height,
    //         top: y,
    //         bottom: y + height,
    //       });

    //     //   UpdatePreference(y);
    //     }}>
    //     <View style={styles.rail}>
    //       <Animated.View style={[styles.railFill, {height: railFillAnim}]}>
    //         {sliderDimensions.height
    //           ? Array.apply(
    //               null,
    //               Array(Math.floor(sliderDimensions.height / 10)),
    //             ).map((item, index) => (
    //               <View
    //                 key={index}
    //                 style={[styles.railFillSpace, {bottom: index * 10}]}
    //               />
    //             ))
    //           : null}
    //       </Animated.View>
    //     </View>
    //     <Animated.View
    //       {...stepperResponder.panHandlers}
    //       style={[
    //         styles.stepper,
    //         {
    //           transform: [{translateY: stepperAnim}],
    //         },
    //       ]}

    //     //   { ...outer_y += 10 }
    //     />
    //   </View>
    <SafeAreaView>
      <Text>Please select how often you would like to receive notifications about your pantry:</Text>
      <Button
        onPress={() => {
            updateFrequency(86400 / 24);
        }}
        title="1 Hour"
        color="#431005"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400 / 12);
        }}
        title="2 Hours"
        color="#571607"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400 / 3);
        }}
        title="8 Hours"
        color="#671B0B"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400 / 2);
        }}
        title="12 Hours"
        color="#79220F"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400);
        }}
        title="1 Day"
        color="#8E2913"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400 * 2);
        }}
        title="2 Days"
        color="#A32E15"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400 * 7);
        }}
        title="1 Week"
        color="#B33216"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400 * 14);
        }}
        title="2 Weeks"
        color="#DA330F"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400 * 30);
        }}
        title="1 Month"
        color="#F3330A"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            updateFrequency(86400 * 90);
        }}
        title="3 Months"
        color="#FF4C26"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={ async () => {
            alert("You will receive a notification in a few seconds")
            await schedulePushNotification();
        }}
        title="Click here to test notifications"
        color="blue"
        accessibilityLabel="Click here to test notifications"
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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "SMART PANTRY",
      body: 'Don\'t forget to keep your pantry up to date!',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 20 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default NotificationsScreen;
