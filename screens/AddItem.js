import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";


const AddItemScreen = ({ navigation }) => {
  
const [nameText, setNameText] = useState("");
const [weightText, setWeightText] = useState("");
const [quantityText, setQuantityText] = useState("");

const addPantryItem = async () => {
  if (nameText == "") {
    return;
  }

  const user = await Auth.currentAuthenticatedUser();
  const itemInput = {
    name: nameText,
    imagePath: "default_img",
    weight: parseFloat(weightText),
    quantity: parseInt(quantityText),
    pantryItemsId: user.username.toString(),
  };
  const inputItem = await API.graphql(
    graphqlOperation(createItem, { input: itemInput })
  );
  navigation.navigate("AddItem");
};
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Input
        placeholder="Name"
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
      <Button
        title="Barcode Add"
        buttonStyle={{ width: 200, margin: 10 }}
        onPress={() => {
          navigation.navigate("BarcodeScan");
        }}
      ></Button>
      <Button
        buttonStyle={{ width: 200 }}
        title="Submit"
        onPress={() => {
          addPantryItem();
        }}
      ></Button>
    </View>
  );
};


export default AddItemScreen;
