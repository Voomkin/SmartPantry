import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor: '#DDE5B6', }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>What is The Smart Pantry app?</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 20}}>Powered by hardware and software, The Smart Pantry app allows users to track food items stored in their kitchen pantry.</Text>


      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>What does The Smart Pantry app do?</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      <Text style={{fontSize: 30, textAlign: 'center', marginHorizontal: 10}}>①</Text>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Food Tracking</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>Allows a user to create a pantry and track food items stored in their pantry</Text>

      <Text style={{fontSize: 30, textAlign: 'center', margin: 10}}>②</Text>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Add Items</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 50}}>Allows a user to add an item to the pantry by scanning its barcode or manually adding the information</Text>
      
      <Text style={{fontSize: 30, textAlign: 'center', margin: 10}}>③</Text>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Remove Items</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 30}}>Allows a user to remove an item from the pantry (when it has run out or is no longer wanted)</Text>

      <Text style={{fontSize: 30, textAlign: 'center', margin: 10}}>④</Text>
      <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'center', marginHorizontal: 15}}>Notifications</Text>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 35}}>Notify users when an item's quantity is running low or expiration date is near</Text>
      
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
  bullets: {
    paddingVertical: 20,
    fontSize: 18
  },
  default: {
    flex: 1, 
    alignItems: "flex-start", 
    justifyContent: "flex-start", 
    marginTop: 15, 
    marginLeft: 25, 
    marginRight: 25,
    fontSize: 18
  }
});

export default AboutScreen;
