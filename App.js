import React from 'react'

import { NativeBaseProvider } from 'native-base'

import SmartPantry from './screens/SmartPantry'
import customTheme from './screens/Theme'

import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

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
      <SmartPantry />
    </NativeBaseProvider>
  )
}

export default App