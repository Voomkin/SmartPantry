import React, { useState } from "react";
import { Text, View } from "react-native";
import {Input, Button} from "react-native-elements";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createPantry, createShoppingList } from "../mutations";

/**
 * @author Ryan Mraz
 * @author Kollin Labowski
 * @author Shannon Biega
 * @param navigation - Used for navigating on the Home stack 
 * @returns The input and button used to get and set the name of the pantry to be created.
 */
const CreatePantryScreen = ({ navigation }) => {
    const [inputText, setInputText] = useState("");
    
    const createNewPantry = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const pantryInput = {
            id: user.username.toString(),
            name: inputText.toString(),
            owner: user.username.toString(),
            notiffreq: 86400,
            notifPending: false,
            notifTime: Math.floor(Date.now() / 1000),
            email: user.attributes.email,
        };
        const p = await API.graphql(graphqlOperation(createPantry, {input: pantryInput}))

        const shoppingInput = {
            id: user.username.toString()
        }

        const q = await API.graphql(graphqlOperation(createShoppingList, {input: shoppingInput}))
        navigation.navigate("HomeStack");
    }
    
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#b5e48c' }}>
            <Input placeholder="Name of Pantry" containerStyle={{width: 250}} textAlign={'center'} onChangeText={value => setInputText(value)} />
            <Button title="Submit" buttonStyle={{ 
            marginLeft:120,
            marginRight:120,
            backgroundColor:'#3D405B',
            borderRadius:10,
            borderWidth: 1,
            width: 100,
            borderColor: '#fff' }}  
            onPress={() => {
              createNewPantry();
            }}               
           ></Button>
        </View>
    );
};

export default CreatePantryScreen;
