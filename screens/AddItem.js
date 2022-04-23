import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import {Auth, API, graphqlOperation } from 'aws-amplify';
import { createItem } from "../mutations";
import { listNewWeights, getNewWeight } from "../queries";


/**
 * @author Ryan Mraz
 * @author Kollin Labowski
 * @author Matthew Winston
 * @param navigation - Used for navigating from the Home stack. 
 * @returns - Returns inputs and buttons for getting information about an item to add. Will return immediately if an input expiration date is the wrong format.
 */
const AddItemScreen = ({ navigation }) => {


  
const [nameText, setNameText] = useState("");
const [weightText, setWeightText] = useState("");
const [quantityText, setQuantityText] = useState("");
const [expirationText, setExpirationText] = useState("");

const theWeightBuffer = async () => {
  const weightsList = await API.graphql(graphqlOperation(listNewWeights));
  

  const b = weightsList.data.listNewWeights.items;
  // console.log(b);
  if(b.length > 0) {
    // console.log(b[0].id);
    let most_recent = 0;

    const viewItems = b.map( async (item) => {
      if(item.id > most_recent)
        most_recent = item.id;

      const json_string = item.weight_data;
      const item_weight = parseFloat(json_string.substring(json_string.indexOf("value") + "value\":".length, json_string.indexOf("}")));
      console.log(item_weight);
    });

    console.log("ITEM TO ADD: " + most_recent);

    const weightData = await API.graphql(
      graphqlOperation(getNewWeight, { id: most_recent })
    );

    let weight_to_add = weightData.data.getNewWeight.weight_data;
    weight_to_add = parseFloat(weight_to_add.substring(weight_to_add.indexOf("value") + "value\":".length, weight_to_add.indexOf("}")));
    console.log(weight_to_add);

    addPantryItem(weight_to_add);
  }
  else {
    console.log("Not in DB");
  }
}

const addPantryItem = async (scale_weight) => {

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

  let add_weight = 0;
  if(scale_weight == null) {
    add_weight = parseFloat(weightText);
    console.log("Normal add");
  }
  else {
    add_weight = scale_weight;
    console.log("Scale add");
  }

  const itemInput = {
    name: nameText,
    imagePath: "default_img",
    weight: add_weight,
    currWeight: add_weight,
    quantity: parseInt(quantityText),
    origQuantity: parseInt(quantityText),
    expDate: parseInt(input_date),
    pantryItemsId: user.username.toString(),
  };
  const inputItem = await API.graphql(
    graphqlOperation(createItem, { input: itemInput })
  );

  //TODO: Here, add a function to delete remaining weighed items if scale_weight != null

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
        title="Use Scale"
        buttonStyle={{ marginTop:10,
          paddingTop:15,
          paddingBottom:15,
          backgroundColor:'#3D405B',
          borderRadius:10,
          borderWidth: 1,
          borderColor: '#fff' }}
        onPress={() => {
          Alert.alert("Weigh Item", "Please place the item you would like to weigh on the scale and wait a few seconds");
          setTimeout(theWeightBuffer, 5000);
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
          addPantryItem(null);
        }}
      ></Button>
    </View>
  );
};


export default AddItemScreen;
