import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import {Auth, API, graphqlOperation } from 'aws-amplify';
import { createItem } from "../mutations";

/**
 * @author Kollin Labowski
 * @param navigate - Used for navigating from the Shopping List stack 
 * @returns An input and a button for getting a name for the item to add to the shopping list.
 */
const AddShoppingListItemScreen = ({ navigation }) => {
  
const [nameText, setNameText] = useState("");

const addShoppingListItem = async () => {
  if (nameText == "") {
    return;
  }

  const user = await Auth.currentAuthenticatedUser();
  const itemInput = {
    name: nameText,
    imagePath: "default_img",
    shoppingListItemsId: user.username.toString(),
  };
  const inputItem = await API.graphql(
    graphqlOperation(createItem, { input: itemInput })
  );
//   navigation.navigate("HomeStack");
Alert.alert("Shopping List", "Added " + nameText + " to your Shopping List"); // Temporary fix, unless we prefer this method
};
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#b5e48c'}}>
      <Input
        placeholder="Name (i.e. bananas)"
        containerStyle={{ width: 250 }}
        onChangeText={(value) => setNameText(value)}
      />

      <Button
        buttonStyle={{ marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#3D405B',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff' }}
        title="Submit"
        onPress={() => {
          addShoppingListItem();
        }}
      ></Button>
    </View>
  );
};


export default AddShoppingListItemScreen;
