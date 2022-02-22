import React, { useState } from "react";
import { Text, View } from "react-native";
import {Input, Button} from "react-native-elements";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createPantry } from "../mutations";

const CreatePantryScreen = ({ navigation }) => {
    const [inputText, setInputText] = useState("");
    
    const createNewPantry = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const pantryInput = {
            id: user.username.toString(),
            name: inputText.toString(),
            owner: user.username.toString(),
        };
        const p = await API.graphql(graphqlOperation(createPantry, {input: pantryInput}))
        navigation.navigate("HomeStack");
    }
    
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Input placeholder="Name of pantry" style={{width: 50}} onChangeText={value => setInputText(value)} />
            <Button title="Submit" containerStyle={{
                width: 200
            }} onPress={() => {
                createNewPantry();
            }} >

            </Button>
        </View>
    );
};

export default CreatePantryScreen;
