
import { LogBox, Alert, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNBluetoothClassic, {BluetoothDevice} from 'react-native-bluetooth-classic';

import HomeStackScreen from './Home';
import ShoppingStackScreen from './Shopping';
import SettingsStackScreen from './Settings';

import React from 'react';
import {Icon, Button} from 'react-native-elements';
import Amplify from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import { Auth } from "aws-amplify";

import Header from '../components/Header'

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
const SmartPantry = () => {

    return (
      <Header />
    );
}

export default withAuthenticator(SmartPantry); // exports the app with Amplify's withAuthenticator for cognito
