import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Heading } from 'native-base'


const HelpScreen = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor: '#DDE5B6', }}>
    

    PUT A LINE UNDER LIL PARAGRAPH
    <Text style={{fontSize: 17, paddingTop: '5%', textAlign: 'center', fontStyle: 'italic'}}>Need some tips and tricks with using the app?</Text>
    <Text style={{fontSize: 15, paddingTop: '3%', textAlign: 'center'}}>See below tutorials for assistance and tips with common Smart Pantry app functionality.</Text>
    <Text style={styles.paddedHeading}>How To Create a Pantry:</Text>
    <Text style={{fontSize: 17}}>{'\t\t'}ENTER TEXT OR VIDEO</Text>
    <Text style={styles.paddedHeading}>How To Add Pantry Items:</Text>
    <Text style={{fontSize: 17}}>{'\t\t'}ENTER TEXT OR VIDEO</Text>
    <Text style={styles.paddedHeading}>How To Update Pantry Items Quantities:</Text>
    <Text style={{fontSize: 17}}>{'\t\t'}ENTER TEXT OR VIDEO</Text>
    <Text style={styles.paddedHeading}>How To Remove Pantry Items:</Text>
    <Text style={{fontSize: 17}}>{'\t\t'}ENTER TEXT OR VIDEO</Text>
    <Text style={styles.paddedHeading}>How To Add a Collaborator to Your Pantry:</Text>
    <Text style={{fontSize: 17}}>{'\t\t'}ENTER TEXT OR VIDEO</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paddedHeading : {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingBottom: '5%',
    fontWeight: 'bold',
    fontSize: 19,
  },
});
export default HelpScreen;