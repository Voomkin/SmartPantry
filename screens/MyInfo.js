import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Alert,
} from "react-native";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getPantry, listItems } from "../queries";


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
}

const getPantryInfo = async (user) => {
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
}

const MyInfoScreen = ({ navigation }) => {
    return (
        <View>
            <Text>The button below is a temporary solution until async text can be displayed to the screen. -Kollin</Text>
            <Button
            onPress={ async () => {
                await fetchInfo();
            }}
            title="Click here to see your information"
            color="green"
            accessibilityLabel="Click here to see your information"
        />
      </View>
    );
};

export default MyInfoScreen;