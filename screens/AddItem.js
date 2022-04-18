import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import {Auth, API, graphqlOperation } from 'aws-amplify';
import { createItem } from "../mutations";



const AddItemScreen = ({ navigation }) => {
  
const [nameText, setNameText] = useState("");
const [weightText, setWeightText] = useState("");
const [quantityText, setQuantityText] = useState("");
const [expirationText, setExpirationText] = useState("");


const addPantryItem = async () => {
  if (nameText == "") {
    Alert.alert("Add Item", "Please add a name for your item")
    return;
  }

  const user = await Auth.currentAuthenticatedUser();

  let input_date = expirationText;
  console.log("expirationText " + input_date);
  if(input_date != "" && (input_date.length != 10 || input_date.charAt(2) != '/' || input_date.charAt(5) != '/')) {
    Alert.alert("Add Item", "Date must be in a numerical format, ex: 02/11/2023");
    return;
  }

  input_date = input_date.replace("/", "");
  input_date = input_date.replace("/", "");

  for(let i = 0; i < input_date.length; i++) {
    if(input_date.charAt(i) < '0' || input_date.charAt(i) > '9') {
      Alert.alert("Add Item", "Date must be in a numerical format, ex: 02/11/2023");
      return;
    }
  }

  if((input_date.charAt(0) > '1' || input_date.charAt(2) > '3' || input_date.charAt(4) < '2') && input_date != "") {
    Alert.alert("Add Item", "Expiration date must be a valid date in the future");
    return;
  }

  console.log("New Exp Date " + input_date);

  const itemInput = {
    name: nameText,
    imagePath: "default_img",
    weight: parseFloat(weightText),
    currWeight: parseFloat(weightText),
    quantity: parseInt(quantityText),
    origQuantity: parseInt(quantityText),
    expDate: parseInt(input_date),
    pantryItemsId: user.username.toString(),
  };
  const inputItem = await API.graphql(
    graphqlOperation(createItem, { input: itemInput })
  );
  navigation.navigate("HomeStack");
};
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#b5e48c'}}>
      <Input
        placeholder="Name (i.e. bananas)"
        containerStyle={{ width: 250 }}
        onChangeText={(value) => setNameText(value)}
      />
      <Input
        placeholder="Weight (lbs.) (optional)"
        containerStyle={{ width: 250 }}
        onChangeText={(value) => setWeightText(value)}
      />
      <Input
        placeholder="Quantity (optional)"
        containerStyle={{ width: 250 }}
        onChangeText={(value) => setQuantityText(value)}
      />
      <Input
        placeholder="Expiration Date (optional)"
        containerStyle={{ width: 250 }}
        onChangeText={(value) => setExpirationText(value)}
      />
      <Text>Format for expiration date: MM/DD/YYYY</Text>
      <Button
        title="Barcode Add"
        buttonStyle={{ marginTop:10,
          paddingTop:15,
          paddingBottom:15,
          backgroundColor:'#3D405B',
          borderRadius:10,
          borderWidth: 1,
          borderColor: '#fff' }}
        onPress={() => {
          navigation.navigate("BarcodeAdd");
        }}
      ></Button>
      <Button
        buttonStyle={{ marginTop:10,
          paddingTop:15,
          paddingBottom:15,
          backgroundColor:'#3D405B',
          borderRadius:10,
          borderWidth: 1,
          borderColor: '#fff' }}
        title="Submit"
        onPress={() => {
          addPantryItem();
        }}
      ></Button>
    </View>
  );
};


export default AddItemScreen;
