import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView>
      
      <Text style={styles.default}>Powered by hardware and software, the Smart Pantry will allow its users to track food items stored in their kitchen pantry. The principal component of the Smart Pantry will be this phone application, which will:</Text> 
      <View style={{ marginLeft: 20, offset: 20}}>
        <Text style={styles.bullets}>-Track items stored in a pantry at any given time</Text>
        <Text style={styles.bullets}>-Notify users when a food item is running low (based on the weight of that food item)</Text>
        <Text style={styles.bullets}>-Allow a user to add an item to the pantry by scanning its barcode or manually adding the information</Text>
        <Text style={styles.bullets}>-Remove a food item from the pantry on the app (when it has run out or is no longer wanted)</Text>
      </View>
    </ScrollView>
  );
};

const styles= StyleSheet.create({
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
