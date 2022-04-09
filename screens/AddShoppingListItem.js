import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import {Auth, API, graphqlOperation } from 'aws-amplify';
import { createItem } from "../mutations";

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Input
        placeholder="Name"
        containerStyle={{ width: 250 }}
        onChangeText={(value) => setNameText(value)}
      />
      <Button
        buttonStyle={{ width: 200 }}
        title="Submit"
        onPress={() => {
          addShoppingListItem();
        }}
      ></Button>
    </View>
  );
};


export default AddShoppingListItemScreen;
