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
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getPantry } from "../queries";
import { deletePantry, updatePantry } from "../mutations";
// import * as Permissions from 'expo-permissions';

const deleteAPantry = async (deleteId) => {
  try {
    const id = {
      id: deleteId
    }
    const d = await API.graphql(graphqlOperation(deletePantry,{input: id} ));
    fetchItems();
  } catch (err) { 
    console.log(err);
  }
}

const updateFrequency = async ( new_frequency ) => {
    try {
      alert("Your notification frequency will be set to: " + new_frequency);

      const user = await Auth.currentAuthenticatedUser(); // returns cognito user JSON

      const pantryData = await API.graphql(
        graphqlOperation(getPantry, { id: user.username.toString() })
      );

      const pantryInput = {
        notiffreq: new_frequency,
      }

      // const p = await API.graphql(graphqlOperation(updatePantry, {input: pantryInput}))
      const update = {
        id: user.username.toString(),
        notiffreq: new_frequency,
        // name: nameText ? nameText : item.name,
        // currWeight: weightText ? parseFloat(weightText) : item.weight,
        // quantity: quantityText ? parseInt(quantityText) : item.quantity
      }

      const u = await API.graphql(graphqlOperation(updatePantry, {input: update}));

    //   const pantryInput = {
    //     id: user.username.toString(),
    //     name: pantryData.data.getPantry.name,
    //     owner: user.username.toString(),
    //     notiffreq: new_frequency,
    // };

    // const p = await API.graphql(graphqlOperation(createPantry, {input: pantryInput}))

    // alert(user.username.toString())
    // Performs the getPantry query based on the id, which is the user's username

    const pantryData2 = await API.graphql(
      graphqlOperation(getPantry, { id: user.username.toString() })
    );

    console.log(pantryData2.data.getPantry.notiffreq);
  } catch (err) {
    console.log(err);
  }
}

const NotificationsScreen = () => {
  // fetchItems();

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
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(1);
        }}
        title="1 Hour"
        color="#431005"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(2);
        }}
        title="2 Hours"
        color="#571607"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(3);
        }}
        title="5 Hours"
        color="#671B0B"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(4);
        }}
        title="12 Hours"
        color="#79220F"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(5);
        }}
        title="1 Day"
        color="#8E2913"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(6);
        }}
        title="2 Days"
        color="#A32E15"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(7);
        }}
        title="1 Week"
        color="#B33216"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(8);
        }}
        title="2 Weeks"
        color="#DA330F"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(9);
        }}
        title="1 Month"
        color="#F3330A"
        accessibilityLabel="Click here to confirm your notification preference"
      />
      <Button
        onPress={() => {
            // UpdatePreference(outer_y);
            // Alert.alert("New preference: " + notification_preference);
            updateFrequency(10);
        }}
        title="3 Months"
        color="#FF4C26"
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
