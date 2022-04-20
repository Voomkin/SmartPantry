import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";

/**
 * @author Shannon Biega
 * @param navigation - Used for navigating the Settings stack. 
 * @returns Displays the credits information to the screen for the user to view, including styling.
 */
const CreditsScreen = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor: '#b5e48c'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>Meet the Developers of Your App</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>Over the course of the 2021-2022 school year, the below team members of Group 3 designed and implemented a Smart Pantry application.{'\n'}</Text>

      <View style={styles1.container}>
        <Image source={require("../assets/images/Ryan.png")} style={styles1.logo}/>
      </View>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Ryan Mraz</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>Computer Science (B.S.){'\n'}</Text>

      <View style={styles1.container}>
        <Image source={require("../assets/images/Matt.png")} style={styles1.logo}/>
      </View>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Matthew Winston</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>Computer Science (B.S.){'\n'}</Text>
      
      <View style={styles1.container}>
        <Image source={require("../assets/images/Kollin.png")} style={styles1.logo}/>
      </View>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Kollin Labowski</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>Computer Science (B.S.) with a minor in Mathematics and Area of Emphasis in Cybersecurity{'\n'}</Text>
    
      <View style={styles1.container}>
        <Image source={require("../assets/images/Jon.png")} style={styles1.logo}/>
      </View>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Jonathan Malcomb</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>Computer Science (B.S.){'\n'}</Text>
      
      <View style={styles1.container}>
        <Image source={require("../assets/images/Shannon.png")} style={styles1.logo}/>
      </View>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Shannon Biega</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>Computer Science (B.S.) and Spanish (B.A.) with an Area of Emphasis in Cybersecurity{'\n'}</Text>

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

const styles1 = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 200 / 2,  
    borderWidth: 2
  },
});

export default CreditsScreen;