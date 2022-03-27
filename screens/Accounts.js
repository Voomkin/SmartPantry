import { UserAgent } from "amazon-cognito-identity-js";
import React, { Component, useState } from "react";
import {
  Text,
  View,
  Alert,
} from "react-native";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { updatePantry } from "../mutations";
import { getPantry, listPantries } from "../queries";
import { Button, Input } from "react-native-elements";
// Imports to be used if the QR code method is used for this part
// import ReactDOM from "react-dom";
// import QRCode from 'qrcode';


// ReactDOM.render(
//   <React.StrictMode>
//     <DisplayQRCode text="Enter String Here :)" />
//   </React.StrictMode>
// );

//This is the ID for one of my accounts (Kollin) used for testing functionality of collaborator accounts
const testID = "0350bfeb-7f0f-45b3-b699-3a6607446a12";

const addStringToDatabase = async (userToAdd) => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    const pantryData = await API.graphql(
      graphqlOperation(getPantry, { id: user.username.toString() })
    );

    if (pantryData.data.getPantry == null) {
      Alert.alert("Collaborator Error", "You must create a pantry before you can add a collaborator")
      return null;
  }

    const update = {
      id: user.username.toString(),
      collabId: userToAdd,
    }

    const u = await API.graphql(graphqlOperation(updatePantry, {input: update}));

  } catch(err) {
    console.log(err);
  }
}



const AccountsScreen = ({ navigation }) => {
  const [userText, setUserText] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>You can add a collaborator to your pantry by typing in their unique ID in the space below.
        Collaborators will be able to view the contents of your pantry, but can not modify it in any way.
        Coming soon: Add collaborators to your pantry by scanning their unique QR code
      </Text>
      <Input
        placeholder="Enter Collaborator ID"
        containerStyle={{ width: 250 }}
        onChangeText={(value) => setUserText(value)}
      />
      <Button
        onPress={ async () => {
          Alert.alert("Add Collaborator", "Add collaborator with ID \"" + userText + "\" to your pantry? Doing so will remove your current collaborator if you have one.", [
            {
              text: "Yes",
              onPress: async () => {
                //NOTE: The userText field should be the ID of the user to add. Want to implement a QR code generator/scanner
                //to make this process seamless and not tedious.
                await addStringToDatabase(userText);
                Alert.alert("Add Collaborator", "Successfully added collaborator \"" + userText + "\"");
              }
            },
            {
              text: "No",
              style: "cancel",
            }
          ])
        }}
        title="Click here to add a viewer to your pantry"
        color="orange"
        accessibilityLabel="Click here to add this collaborator to your pantry"
      />
      {/* <Button
        onPress={ async () => {
            // Alert.alert("View Other Pantry", "This will take you to view another user's pantry, assuming you have access");
            viewOtherPantry();
        }}
        title="Click here to view another pantry"
        color="purple"
        accessibilityLabel="Click here to view another pantry"
      /> */}
    </View>
  );
};

export default AccountsScreen;