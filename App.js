
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { NativeBaseProvider } from 'native-base'
import React from 'react';
import {Icon, Button} from 'react-native-elements';
import Amplify from 'aws-amplify';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

import { getPantry } from "./queries.js";
import { updatePantry } from "./mutations.js";

import Home from './screens/Home'
import Profile from './screens/Profile'
import ShoppingList from './screens/Shopping'
import Help from './screens/Help'
import Settings from './screens/Settings'
import customTheme from './screens/Theme'
import SmartPantry from './screens/SmartPantry'

import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

const Drawer = createDrawerNavigator();

const HeaderDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        drawerStyle: {
          backgroundColor: '#b5c99a',
          width: 240,
        },
      }}>
        <Drawer.Screen name="My Pantry" component={Home} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="My Profile" component={Profile} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="Shopping List" component={ShoppingList} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="Settings" component={Settings} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="Help" component={Help} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="Logout"  component={Home} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
  
const updateNotifFreq = async ( new_pref ) => {
  const user = await Auth.currentAuthenticatedUser();

  const pantryData = await API.graphql(
    graphqlOperation(getPantry, { id: user.username.toString() })
  );

  const update = {
    id: user.username.toString(),
    notiffreq: new_pref,
  }

  const u = await API.graphql(graphqlOperation(updatePantry, {input: update}));
  
}

const notificationUpdate = async () => {
  const user = await Auth.currentAuthenticatedUser();

  const pantryData = await API.graphql(
    graphqlOperation(getPantry, { id: user.username.toString() })
  );

  if(pantryData == null) {
    Alert.alert("Notifications", "You must create a pantry before you can change your notification preferences.");
  }
  else {
    const current_preference = pantryData.data.getPantry.notiffreq;
    let preference_response = "";

    if(current_preference == 60) {
      preference_response = "once a minute";
    }
    else if(current_preference == 86400 / 24) {
      preference_response = "once an hour";
    }
    else if(current_preference == 86400 / 12) {
      preference_response = "every two hours";
    }
    else if(current_preference == 86400 / 3) {
      preference_response = "every eight hours";
    }
    else if(current_preference == 86400 / 2) {
      preference_response = "every twelve hours";
    }
    else if(current_preference == 86400) {
      preference_response = "every day";
    }
    else if(current_preference == 86400 * 2) {
      preference_response = "every two days";
    }
    else if(current_preference == 86400 * 7) {
      preference_response = "every week";
    }
    else if(current_preference == 86400 * 14) {
      preference_response = "every two weeks";
    }
    else if(current_preference == 86400 * 30) {
      preference_response = "every month";
    }
    else if(current_preference == 86400 * 90) {
      preference_response = "every 3 months";
    }

    Alert.alert(
      "Notifications",
      "You will receive a notification " + preference_response + ". Would you like to change your notification preference?",
      [
        {
          text: "Yes",
          onPress: () => {
            Alert.alert("Notifications",
            "What would you like to change your notification preference to? (You will have more options in the notification page in Settings)",
            [
              {
                text: "Hourly",
                onPress: () => {
                  updateNotifFreq(86400 / 24);
                  Alert.alert("Notifications", "You will now recieve notifications at most every hour.")
                }
              },
              {
                text: "Daily",
                onPress: () => {
                  updateNotifFreq(86400);
                  Alert.alert("Notifications", "You will now recieve notifications at most every day.")
                }
              },
              {
                text: "Weekly",
                onPress: () => {
                  updateNotifFreq(86400 * 7);
                  Alert.alert("Notifications", "You will now recieve notifications at most every week.")
                }
              }
            ]);

          }
        },
        {
          text: "No",
          style: "cancel"
        }
      ]
    );
  }
}


// Main App function
const App = () => {
  let [areFontsLoaded] = useFonts({
    'Lato-Black': require('./assets/fonts/Lato/Lato-Black.ttf'),
    'Lato-BlackItalic': require('./assets/fonts/Lato/Lato-BlackItalic.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('./assets/fonts/Lato/Lato-BoldItalic.ttf'),
    'Lato-Italic': require('./assets/fonts/Lato/Lato-Italic.ttf'),
    'Lato-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),
    'Lato-LightItalic': require('./assets/fonts/Lato/Lato-LightItalic.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Thin': require('./assets/fonts/Lato/Lato-Thin.ttf'),
    'Lato-ThinItalic': require('./assets/fonts/Lato/Lato-ThinItalic.ttf')
  });

  if (!areFontsLoaded) {
    return <AppLoading />
  }

  return (
    <NativeBaseProvider theme={customTheme}>
      <HeaderDrawer />
    </NativeBaseProvider>
  )

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
                  <Icon name="circle-notifications" size={25} color="#000000" />}
                  onPress={notificationUpdate}
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
        <Tab.Screen
          name="Shopping"
          component={ShoppingStackScreen}
          options={{
            tabBarIcon: () => {
              return <Icon name="store" />;
            },
            headerShown: true,
          }}
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

export default withAuthenticator(App)