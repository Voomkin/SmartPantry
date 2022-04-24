import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Heading } from 'native-base'

/**
 * @author Shannon Biega
 * @param navigation - Used for navigation from the Settings stack. 
 * @returns Displays the help information to the screen, including how the user can complete various tasks on the Smart Pantry app.
 */
const HelpScreen = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor: '#b5e48c'}}>
    
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>Tips and Tricks</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
  
    <Text style={{fontSize: 17, paddingTop: '3%', textAlign: 'center', marginHorizontal: 40}}>See below tutorials for assistance with common Smart Pantry app functionality.{'\n'}</Text>    
    
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>How To Create a Pantry</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
    <Text>
      <Text style={styles.body}>➀{'\n'}Navigate to</Text>
      <Text style={[styles.body, {fontStyle: 'italic'}]}> My Pantry</Text>
      <Text style={styles.body}>{'\n'}➁{'\n'}Click "Create Pantry"</Text> 
      <Text style={styles.body}>{'\n'}➂{'\n'}Type the name of your pantry</Text>
      <Text style={styles.body}>{'\n'}➃{'\n'}Click "Submit"</Text>
    </Text>  

    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>How To Add Pantry Items</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
    <Text style={styles.body}>An an item to your pantry by...</Text>
      
  
    <Text style={{fontSize: 25, textAlign: 'center', marginHorizontal: 10}}>➊</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>Manually Add Pantry Item</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
    <Text>
      <Text style={styles.body}>➀{'\n'}Navigate to</Text>
      <Text style={[styles.body, {fontStyle: 'italic'}]}> My Pantry</Text>
      <Text style={styles.body}>{'\n'}➁{'\n'}Click "Add Item"</Text> 
      <Text style={styles.body}>{'\n'}➂{'\n'}Type the name of the food item</Text>
      <Text style={styles.body}>{'\n'}➃{'\n'}Weigh the food item ("Use Scale") or input its quantity</Text>
      <Text style={styles.body}>{'\n'}➄{'\n'}Click "Submit"</Text>      
    </Text>


    <Text style={{fontSize: 25, textAlign: 'center', marginHorizontal: 10}}>{'\n'}➋</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>Barcode Add Pantry Item</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
    <Text>
      <Text style={styles.body}>➀{'\n'}Navigate to</Text>
      <Text style={[styles.body, {fontStyle: 'italic'}]}> My Pantry</Text>
      <Text style={styles.body}>{'\n'}➁{'\n'}Click "Add Item"</Text> 
      <Text style={styles.body}>{'\n'}➂{'\n'}Click "Barcode Add"</Text>
      <Text style={styles.body}>{'\n'}➃{'\n'}Scan item's barcode using device camera</Text>
      <Text style={styles.body}>{'\n'}➄{'\n'}Click "Submit"</Text>      
    </Text>

    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>How To Update Pantry Items' Quantities</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
    <Text>
      <Text style={styles.body}>➀{'\n'}Navigate to</Text>
      <Text style={[styles.body, {fontStyle: 'italic'}]}> My Pantry</Text>
      <Text style={styles.body}>{'\n'}➁{'\n'}Locate item and click "Update Item"</Text> 
      <Text style={styles.body}>{'\n'}➂{'\n'}Enter new item weight or quantity</Text>
      <Text style={styles.body}>{'\n'}➃{'\n'}Click "Submit"</Text>
    </Text>

    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>How To Remove Pantry Items</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
    <Text>
      <Text style={styles.body}>➀{'\n'}Navigate to</Text>
      <Text style={[styles.body, {fontStyle: 'italic'}]}> My Pantry</Text>
      <Text style={styles.body}>{'\n'}➁{'\n'}Locate item and click "Delete"</Text> 
      <Text style={styles.body}>{'\n'}➂{'\n'}Click Submit</Text>
    </Text>

    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>How To Add a Collaborator to Your Pantry</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
    <Text>
      <Text style={styles.body}>➀{'\n'}Navigate to</Text>
      <Text style={[styles.body, {fontStyle: 'italic'}]}> Settings</Text>
      <Text style={styles.body}>{'\n'}➁{'\n'}Click "Manage My Pantry"</Text> 
      <Text style={styles.body}>{'\n'}➂{'\n'}Enter Collaborator Email</Text>
      <Text style={styles.body}>{'\n'}➃{'\n'}Click "Add Collaborator to Pantry"{'\n'}</Text>
    </Text> 

    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>How To Delete Your Pantry</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
    <Text>
      <Text style={styles.body}>➀{'\n'}Navigate to</Text>
      <Text style={[styles.body, {fontStyle: 'italic'}]}> Settings</Text>
      <Text style={styles.body}>{'\n'}➁{'\n'}Click "Manage My Pantry"</Text> 
      <Text style={styles.body}>{'\n'}➂{'\n'}Click "Delete My Pantry"{'\n'}</Text>
    </Text>       
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  paddedHeading : {
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    margin: 10
  },
  body:{
    fontSize: 18,
    textAlign: 'center',
    margin: 10
  }
});


export default HelpScreen;