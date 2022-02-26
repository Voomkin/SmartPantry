import { LogBox, Alert, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNBluetoothClassic, {BluetoothDevice} from 'react-native-bluetooth-classic';

import PantryStackScreen from './screens/Pantry';
import HomeStackScreen from './screens/Home';
import SettingsStackScreen from './screens/Settings';
import ProfileScreen from './screens/Profile';

import React from 'react';
import {Icon, Button} from 'react-native-elements';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth } from "aws-amplify";


// Initializes Amplify
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

// Ignore certain logs
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

// Creates a new Bottom Tab Navigator object
const Tab = createBottomTabNavigator();

// Function that signs a user out of the app with an alert box
const signOutAlert = () => {
  Alert.alert(
    "Sign Out",
    "Do you want to sign out?",
    [
      {
        text: "Yes",
        onPress: () => Auth.signOut() // Uses amplify Auth library and signOut() method
      },
      {
        text: "No",
        style: "cancel"
      }
    ]
  )
}


// Main App function
function App() {

  return (

    // Entire app wrapped in a NavigationContainer and uses the bottom tab navigator for screens
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#769353",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={({ navigation }) => ({
            title: "Home",
            // Sets up header buttons for notifications and sign out
            headerRight: () => (
              <Button
                icon={
                  <Icon name="circle-notifications" size={25} color="#000000" />
                }
                type="clear"
              ></Button>
            ),
            headerLeft: () => (
              <View>
                <Button
                  icon={<Icon name="logout" size={25} color="#000000" />}
                  onPress={signOutAlert}
                  type="clear"
                ></Button>
              </View>
            ),
            // sets the icon for the home bottom tab screen
            tabBarIcon: () => {
              return <Icon name="home" />;
            },
            headerShown: true,
          })}
        />
        {/* <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            tabBarIcon: () => {
              return <Icon name="account-box" />;
            },
            headerShown: true,
          }}
        /> */}
        {/* <Tab.Screen
          name="Pantry"
          component={PantryStackScreen}
          options={{
            tabBarIcon: () => {
              return <Icon name="store" />;
            },
            headerShown: true,
          }}
        /> */}
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarIcon: () => {
              return <Icon name="settings" />;
            },
            headerShown: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App); // exports the app with Amplify's withAuthenticator for cognito
