import { getPantry, listPantries } from "../queries";
// import { Button } from "react-native-elements";
import {Auth, API, graphqlOperation} from 'aws-amplify';

import React, { useState, useEffect, Component } from "react";
import {Text,View, SafeAreaView, StyleSheet ,ScrollView, Modal, Alert, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {Icon, Input} from 'react-native-elements';
import CreatePantryScreen from "./CreatePantry";
import AddItemScreen from "./AddItem";
import ManualAddScreen from "./ManualAdd";
import { listItems, getItem } from "../queries.js";
import { createItem, deleteItem, updateItem, createShoppingList } from "../mutations";
import BarcodeAddScreen from "./BarcodeAdd";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";  


const OtherPantryScreen = ({ navigation }) => {
    // viewOtherPantry();

    // useState variables to track whether to render the create pantry button
  // the value of the pantry items, and if a user has a pantry.
  const [createPantryButton, setCreatePantryButton] = useState(null);
  const [items, setItems] = useState([]);
  const [pantryExists, setPantryExists] = useState(false);
  const [pantryName, setPantryName] = useState("");
  const [nameText, setNameText] = useState("");
  const [weightText, setWeightText] = useState("");
  const [quantityText, setQuantityText] = useState("");
  const [itemId, setItemId] = useState(null);

   const [isModalVisible, setIsModalVisible] = useState(false);

   const handleModal = () => setIsModalVisible(() => !isModalVisible);

  // Loads when you come back to this screen
  // refreshes each time you go back to the screen
  // Checks if a pantry exists and fetches the user's items on every load
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkIfPantryExists();
      fetchItems();
    });
    return unsubscribe;
  }, [navigation, items]);

  // fetches just the items of the pantry that belongs to the current authenticated user
  const fetchItems = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser(); // returns cognito user JSON

      // Performs the getPantry query based on the id, which is the user's username

    //   const user = await Auth.currentAuthenticatedUser();
  
      const pantriesList = await API.graphql(
        graphqlOperation(listPantries, {
        filter: {
            collabId: {
            eq: user.attributes.email,
            },
        },
        })
      );

      const c = pantriesList.data.listPantries.items;

    //   console.log(c[0].name);

      if(c.length > 0) {
        //NOTE: As of 3/27/2022, it may be the case that a collaborator can view multiple pantries

        //   const collabPantries = c.map( async (pantry) => {
        const pantryData = await API.graphql(graphqlOperation(getPantry, { id: c[0].id }));

            //  console.log(pantryData.data.getPantry.name);

        if (pantryData.data.getPantry != null) {
            setPantryExists(true);
            setPantryName(pantryData.data.getPantry.name);
        } else {
            setPantryExists(false);
        }
        
            //   // Grabs the id field from the pantry data
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
        
            //   // stores the value of the items returned
              const b = itemsList.data.listItems.items;
        
            //   // changes the value of useState items value
              setItems(b);
      }
      
    } catch (err) {
      console.log(err);
    }
  };


  // add an item to the shopping list upon deleting it from the pantry, if the user wishes
  const addToShoppingList = async (itemID, name) => {
    try {
        // console.log(itemID, name);

      const user = await Auth.currentAuthenticatedUser();
    //   console.log(user.username.toString());
      const pantryData = await API.graphql(
          graphqlOperation(getPantry, { id: user.username.toString() })
      );

      if (pantryData.data.getPantry == null) {
        Alert.alert("Shopping List Error", "You must create a pantry before you can add items to your shopping list");
        return null;
      }

      const id = {
        name: name,
        imagePath: "default_img",
        shoppingListItemsId: user.username.toString()
      }
      const d = await API.graphql(graphqlOperation(createItem,{input: id} ));

      Alert.alert("Add to Shopping List", "Added \"" + name + "\" to shopping list");

    } catch (err) { 
      console.log(err);
    }
  }

  // list of items from pantry
  const listOfItems = items.map((item) => {
    let percentage = (parseFloat(item.currWeight) / parseFloat(item.weight) * 100).toFixed(2);
    return (
      <View key={item.id}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          <Text
            style={{paddingLeft: 15, width: "50%", flexDirection: "column", fontSize: 18 }}
          >
            {item.name + '\n'}
            {item.quantity && <Text style={{fontSize: 15, fontWeight: 'bold'}}>Quantity: {item.quantity}</Text>}
            {item.weight && <Text style={{fontSize: 15, fontWeight: "bold"}}>Percentage left: {percentage}%</Text>}
          </Text>
          <Button buttonStyle={{ backgroundColor: 'grey', width: 75, marginRight: 5 }} title="add to shopping list" onPress={() => {
            addToShoppingList(item.id, item.name);
          }}>
          </Button>
        </View>
        <View style={{ height: 1.2, backgroundColor: "grey" }} />
      </View>
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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: '#b5e48c'
        }}
      >
        {!pantryExists && <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>You are not a collaborator for any pantry</Text>}
        {pantryExists && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor: '#b5e48c'}}
          >
            <Text style={{ fontSize: 25, marginBottom: 15 }}>{pantryName}</Text>

            <View>{listOfItems}</View>
          </View>
        )}
      </ScrollView>
  );
  
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      
    </View>
  );
};

export default OtherPantryScreen;