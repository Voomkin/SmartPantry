
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { NativeBaseProvider } from 'native-base'

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
        <Drawer.Screen name="My Pantry" component={SmartPantry} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="My Profile" component={Profile} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="Shopping List" component={ShoppingList} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="Settings" component={Settings} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="Help" component={Help} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
        <Drawer.Screen name="Logout"  component={Home} options={{ headerStyle: {backgroundColor: '#b5c99a'} }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

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
}

export default App