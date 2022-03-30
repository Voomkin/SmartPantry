import { Text, StyleSheet } from 'react-native'
import React from 'react'

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const GlobalText = (props) => {

    let [fontsLoaded] = useFonts({
        'Lato-Black': require('../assets/fonts/Lato/Lato-Black.ttf'),
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
       return <Text style={styles.text}>{props.children}</Text>
      }
}

const styles = StyleSheet.create({
        text: {
            fontFamily: 'Lato-Black'
        }
})

export default GlobalText