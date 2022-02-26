import React, { useState, useEffect } from "react";
import {Text,View,ScrollView,Dimensions,ImageBackground,StyleSheet} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {Icon} from 'react-native-elements';
import { Button } from "react-native-elements";
import { getPantry } from "../queries";
import CreatePantryScreen from "./CreatePantry";
import AddItemScreen from "./AddItem";
import ManualAddScreen from "./ManualAdd";
import { listItems } from "../queries.js";
import BarcodeAddScreen from "./BarcodeAdd";

// Creates a stack navigator object
const HomeStack = createStackNavigator();

// Allows the nesting of bottom tab and stack navigation
// Contains all the screens that are reachable/within the bottom tab home screen
const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          options={{ headerShown: false }}
          name="HomeStack"
          component={HomeScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Create Pantry" }}
          name="CreatePantry"
          component={CreatePantryScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Add Item" }}
          name="AddItem"
          component={AddItemScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Manual Add" }}
          name="ManualAdd"
          component={ManualAddScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Barcode Add" }}
          name="BarcodeAdd"
          component={BarcodeAddScreen}
        />
      </HomeStack.Navigator>
    );
}

// The actual home screen rendering
const HomeScreen = ({ navigation }) => {

  // useState variables to track whether to render the create pantry button
  // the value of the pantry items, and if a user has a pantry.
  const [createPantryButton, setCreatePantryButton] = useState(null);
  const [items, setItems] = useState([]);
  const [pantryExists, setPantryExists] = useState(false);

  // Loads when you come back to this screen
  // refreshes each time you go back to the screen
  // Checks if a pantry exists and fetches the user's items on every load
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkIfPantryExists();
      fetchItems();
    });
    return unsubscribe;
  }, [navigation]);

  // fetches just the items of the pantry that belongs to the current authenticated user
  const fetchItems = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser(); // returns cognito user JSON

      // Performs the getPantry query based on the id, which is the user's username
      const pantryData = await API.graphql(
        graphqlOperation(getPantry, { id: user.username.toString() })
      );

      // if the getPantry query does not return a null value, sets pantry exists to true
      // otherwise sets it to false because they don't have a pantry yet
      if (pantryData.data.getPantry != null) {
        setPantryExists(true);
      } else {
        setPantryExists(false);
      }

      // Grabs the id field from the pantry data
      const pantryId = pantryData.data.getPantry.id;

      // Grabs the items that are related to the id of the pantry
      const itemsList = await API.graphql(
        graphqlOperation(listItems, {
          filter: {
            pantryItemsId: {
              eq: pantryId.toString(),
            },
          },
        })
      );

      // stores the value of the items returned
      const b = itemsList.data.listItems.items;

      // changes the value of useState items value
      setItems(b);
    } catch (err) {
      console.log(err);
    }
  };

  // list of items from pantry
  const listOfItems = items.map((item) => {
    return (
      <>
        <Text>{"\n" + item.name + " "}</Text>
        <Text>{item.quantity ? item.quantity : "" + " "}</Text>
        <Text>{item.weight ? item.weight : "" + " "}</Text>
        <Text>{"\n"}</Text>
      </>
    );
  });


  // checks whether or not a user has a pantry yet
  const checkIfPantryExists = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser(); // grabs current user's information

      // Performs the getPantry query based on user's id
      const pantryData = await API.graphql(
        graphqlOperation(getPantry, { id: user.username.toString() })
      );

      // If it's null, we want to render the create pantry button
      // otherwise, we want to hide it
      if (pantryData.data.getPantry == null) {
        setCreatePantryButton(true);
      } else {
        setCreatePantryButton(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      {/* Conditional render based on the value of createPantryButton and pantryExists */}
      {createPantryButton && (
        <Button
          title="Create Pantry"
          onPress={() => {
            navigation.navigate("CreatePantry");
          }}
        ></Button>
      )}
      <Text>
        {!pantryExists && <Text>You don't have a pantry!</Text>}
        {pantryExists && (
          <>
            <Button
              title="Add Item"
              onPress={() => {
                navigation.navigate("AddItem");
              }}
            ></Button>

            {/* renders the listOfItems object */}
            <Text>{listOfItems}</Text>
          </>
        )}
      </Text>
    </ScrollView>
  );
};

export default HomeStackScreen;