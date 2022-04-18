
import { LogBox, Alert, Text, View, StyleSheet, ScrollView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNBluetoothClassic, {BluetoothDevice} from 'react-native-bluetooth-classic';

import HomeStackScreen from './Home';
import ShoppingStackScreen from './Shopping';
import SettingsStackScreen from'./Settings';
import CreatePantryScreen from "./CreatePantry";

import React, {useState} from 'react';
import {Icon, Button} from 'react-native-elements';
import Amplify from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import { Auth } from "aws-amplify";

import Card from '../components/Card'
import { Heading, Box, Flex, useTheme } from 'native-base'
import { Searchbar } from 'react-native-paper'

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

  const {
    colors
  } = useTheme()

  const [searchQuery, setSearchQuery] = React.useState('')

  const onChangeSearch = query => setSearchQuery(query)
  


    return (
      <ScrollView backgroundColor={"#b5e48c"}>   

            <Heading style={styles.paddedHeading}>Expiring Soon</Heading>
            <Box alignItems='center'>
              <Card svg='clock' itemName='Cookie' itemMetric='50lb'/>
            </Box>
              <Heading style={styles.paddedHeading}>Running Low</Heading>
            <Box alignItems='center'>
                <Card svg='low' itemName='Cookie' itemMetric='50lb'/>
            </Box>
            <Flex flexDirection='row' py='5'>
              <Heading flex='1' style={styles.paddedHeading}>Items</Heading>
              <Box flex='3' alignItems='center' justifyContent='center' paddingRight='5'>
                  <Searchbar
                    style={styles.sBar}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                  />
              </Box>
              </Flex>
              <Box alignItems='center'>
              <Card svg='item' itemName='Cookie' itemMetric='50lb'/>
              </Box>
                
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  paddedHeading: {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingBottom: '5%',
  },
  sBar: {
    width: '100%',
  }
});

export default withAuthenticator(SmartPantry); // exports the app with Amplify's withAuthenticator for cognito
