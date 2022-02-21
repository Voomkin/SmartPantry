import { LogBox, Alert, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNBluetoothClassic, {BluetoothDevice} from 'react-native-bluetooth-classic';

import PantryScreen from './screens/Pantry';
import HomeStackScreen from './screens/Home';
import SettingsStackScreen from './screens/Settings';
import ProfileScreen from './screens/Profile';

import React from 'react';
import {Icon, Button} from 'react-native-elements';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth, API, graphqlOperation } from "aws-amplify";
import {listItems} from './queries.js';
import { useEffect, useState } from 'react';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Tab = createBottomTabNavigator();

const signOutAlert = () => {
  Alert.alert(
    "Sign Out",
    "Do you want to sign out?",
    [
      {
        text: "Yes",
        onPress: () => Auth.signOut()
      },
      {
        text: "No",
        style: "cancel"
      }
    ]
  )
}

function App() {

  return (
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
            headerRight: () => (
              <Button
                icon={<Icon name="circle-notifications" size={25} color="#000000" />}
                type="clear"
              >
              </Button>
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
            tabBarIcon: () => {
              return <Icon name="home" />;
            },
            headerShown: true,
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            tabBarIcon: () => {
              return <Icon name="account-box" />;
            },
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="Pantry"
          component={PantryScreen}
          options={{
            tabBarIcon: () => {
              return <Icon name="store" />;
            },
            headerShown: true,
          }}
        />
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

export default withAuthenticator(App);
