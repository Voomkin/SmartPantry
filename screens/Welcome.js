import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';



/**
 * @author Shannon Biega
 * @param navigate - Used for navigating from the drawer. 
 * @returns Displays a welcome message to the user's screen.
 */
const WelcomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor: '#b5e48c'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>Smart Pantry Application</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      <Text style={{fontSize: 17, textAlign: 'center'}}>Version 1{'\n'}</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>This Smart Pantry application will help you track the food items stored in your pantry.{'\n'}Click on the three lines above to browse the app.{'\n'}</Text>
      <ImageBackground source={require('../assets/images/food.png')} style={{width: '100%', height: '170%', position: 'absolute', bottom: -700}}></ImageBackground>   
      <ImageBackground source={require('../assets/images/wvu.png')} style={{width: '70%', height: '155%', position: 'absolute', bottom:-285, right: 35}}></ImageBackground>   

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paddedHeading : {
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    margin: 20
  },
});

export default WelcomeScreen;