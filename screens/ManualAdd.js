import React , {useState} from "react";
import {Input, Button} from "react-native-elements";
import { View, ScrollView} from "react-native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createItem } from "../mutations";

/**
 * @author Ryan Mraz
 * @param navigation - Used for navigating on the Home stack screen.  
 * @returns Inputs and buttons used for updating fields of an item
 */
const ManualAddScreen = ({ navigation }) => {

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
          pantryItemsId: user.username.toString()
        };
        const inputItem = await API.graphql(graphqlOperation(createItem, {input: itemInput}));
        navigation.navigate("AddItem");
    }

    return (
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
          buttonStyle={{ width: 200 }}
          title="Submit"
          onPress={() => {
            addPantryItem();
          }}
        ></Button>
      </ScrollView>
    );
};

export default ManualAddScreen;
