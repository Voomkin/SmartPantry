import React, { Component, useState, useEffect} from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getPantry, listItems } from "../queries";
import { Heading } from 'native-base'
import { StyleSheet } from 'react-native';

{/*const getPantryInfo = async (user) => {
    try {
        const pantryData = await API.graphql(
            graphqlOperation(getPantry, { id: user.username.toString() })
        );

        if (pantryData.data.getPantry == null) {
            const outputString = "Email: " + user.attributes.email + "\nPhone Number: " + user.attributes.phone_number + "\nNo pantry information to display"
            Alert.alert("User Information", outputString);
            return null;
        }
        else {

            const pantryName = pantryData.data.getPantry.name;
            const dateCreated = pantryData.data.getPantry.createdAt;
            const dateUpdated = pantryData.data.getPantry.updatedAt;

            const pantryId = pantryData.data.getPantry.id;

            const itemsList = await API.graphql(
                graphqlOperation(listItems, {
                filter: {
                    pantryItemsId: {
                    eq: pantryId.toString(),
                    },
                },
                })
            );

            const b = itemsList.data.listItems.items;

            let itemCount = 0;

            const countItems = b.map( async (item) => {
                itemCount += 1;
            });

            let outputString = "Email: " + user.attributes.email + "\nPhone Number: " + user.attributes.phone_number + "\nPantry Name: " + pantryName;
            outputString += "\nPantry Create Date: " + dateCreated + "\nLast Pantry Update: " + dateUpdated + "\nSize of Pantry: " + itemCount;

            Alert.alert("User Information", outputString)
            //NOTE: Whenever this is finalized, it would probably be best to display a more user-friendly piece of data than a timestamp (basically just make it more legible)
        }

    } catch(err) {
        console.log(err);
    }
}*/}

/**
 * @author Kollin Labowski
 * @author Shannon Biega
 * @author Ryan Mraz
 * @param navigation - Used to navigate for the Settings stack 
 * @returns Displays information about the user
 */
const MyInfoScreen = ({ navigation }) => {
   useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchInfo();
        });
        return unsubscribe;
      }, [navigation]);

    const [email, setEmail]= useState("");
    const [phoneNumber, setPhoneNumber]= useState("");


    const fetchInfo = async () => {
        console.log("HERE") 
        // alert(email);
        try {
            const user = await Auth.currentAuthenticatedUser();
            // console.log(user);
    
            // const email = user.attributes.email;
            // const phone_number = user.attributes.phone_number;
    
            setEmail(user.attributes.email); 
            setPhoneNumber([user.attributes.phone_number.substring(0,2), '-', user.attributes.phone_number.substring(2,5),'-',user.attributes.phone_number.substring(5,8),'-',user.attributes.phone_number.substring(8,12)]);
    
            // alert(phone_number);
            //const pantryStats = getPantryInfo(user);
            // return (<Text style={{fontSize: 17, textAlign: 'center', margin: 10}}>{email}</Text>)
            
        } catch (err) {
            console.log(err);
        }
    }
    return (
    <ScrollView style={{backgroundColor: '#b5e48c'}}>    
       
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_username]}>Email</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View> 
        <Text style={{fontSize: 17, textAlign: 'center', margin: 10}}>{email}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_phonenumber]}>Phone Number</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View> 
        <Text style={{fontSize: 17, textAlign: 'center', margin: 10}}>{phoneNumber}</Text>  
        
      </ScrollView>
    );
};

/*
const fetchInfo = async () => {
    // alert(email);
    try {
        const user = await Auth.currentAuthenticatedUser();
        // console.log(user);

        const email = user.attributes.email;
        const phone_number = user.attributes.phone_number;
        // alert(phone_number);
        const pantryStats = getPantryInfo(user);
        
    } catch (err) {
        console.log(err);
    }

    // alert(email);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>
                EMAIL
            </Text>
        </View>
    );
}*/
const styles = StyleSheet.create({
    paddedHeading : {
      fontWeight: 'bold',
      fontSize: 19,
      textAlign: 'center',
      margin: 20
    },
    width_email:{
        width: 55,
    },
    width_phonenumber:{
        width: 140,
    }
  });


export default MyInfoScreen;