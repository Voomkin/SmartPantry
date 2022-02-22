import React, { useState, useEffect } from "react";
import {Text,View,ScrollView,Dimensions,ImageBackground,StyleSheet} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {Icon} from 'react-native-elements';
import { Button } from "react-native-elements";
import { getPantry } from "../queries";
import CreatePantryScreen from "./CreatePantry";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen options={{headerShown:false}} name="HomeStack" component={HomeScreen}/>
            <HomeStack.Screen options={{headerShown:true, title: "Create Pantry"}} name="CreatePantry" component={CreatePantryScreen}/>
        </HomeStack.Navigator>
    )
}

const HomeScreen = ({navigation}) => {

    const [createPantryButton, setCreatePantryButton] = useState(null);

    // refreshes each time you go back to the screen
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
             checkIfPantryExists();
        });
        return unsubscribe;
    }, [navigation]);


    const checkIfPantryExists = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const pantryData = await API.graphql(
            graphqlOperation(getPantry, { id: user.username.toString() })
            );
            if (pantryData.data.getPantry == null) {
                setCreatePantryButton(true);
            } else {
                setCreatePantryButton(null);
            }
        } catch (err) {
            console.log(err)
        }
    }
    checkIfPantryExists();
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {createPantryButton && (
          <Button
            title="Create Pantry"
            onPress={() => {
              navigation.navigate("CreatePantry");
            }}
          ></Button>
        )}
      </View>
    );
}

export default HomeStackScreen;