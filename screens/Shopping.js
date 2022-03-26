import React, { useState, useEffect, Component } from "react";
import { Text, View, Switch, Alert, ScrollView, Modal, StyleSheet, SafeAreaView } from "react-native";
import { Icon, Button, Input } from "react-native-elements";
import AboutScreen from "./About";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import CreatePantryScreen from "./CreatePantry";
import { getShoppingList, listItems, getItem } from "../queries";
import { createItem, deleteItem, updateItem, createShoppingList } from "../mutations";
import AddShoppingListItemScreen from "./AddShoppingListItem";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import ManualAddScreen from "./ManualAdd";
import BarcodeAddScreen from "./BarcodeAdd";
import { StatusBar } from "expo-status-bar";


const ShoppingStack = createStackNavigator();

const ShoppingStackScreen = () => {
  return (
    <ShoppingStack.Navigator>
      <ShoppingStack.Screen
        options={{ headerShown: false }}
        name="SettingsStack"
        component={Shopping}
      />
      <ShoppingStack.Screen
          options={{ headerShown: true, title: "Add Item" }}
          name="AddShoppingListItem"
          component={AddShoppingListItemScreen}
        />
    </ShoppingStack.Navigator>
  );
};

const Shopping = ({navigation}) => {
  const [shoppingListButton, setShoppingListButton] = useState(null);
  const [items, setItems] = useState([]);
  const [shoppingListExists, setShoppingListExists] = useState(false);
  const [shoppingListName, setShoppingListName] = useState("");
  const [nameText, setNameText] = useState("");
  const [itemId, setItemId] = useState(null);

   const [isModalVisible, setIsModalVisible] = useState(false);

   const handleModal = () => setIsModalVisible(() => !isModalVisible);

  // Loads when you come back to this screen
  // refreshes each time you go back to the screen
  // Checks if a shopping list exists and fetches the user's items on every load
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkIfShoppingListExists();
      fetchItems();
    });
    return unsubscribe;
  }, [navigation, items]);

  // fetches just the items of the shopping list that belongs to the current authenticated user
  const fetchItems = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser(); // returns cognito user JSON

      // Performs the getShoppingList query based on the id, which is the user's username
      const shoppingListData = await API.graphql(
        graphqlOperation(getShoppingList, { id: user.username.toString() })
      );

      // if the getShoppingList query does not return a null value, sets shopping list exists to true
      // otherwise sets it to false because they don't have a shopping list yet
      if (shoppingListData.data.getShoppingList != null) {
        setShoppingListExists(true);
        setShoppingListName(shoppingListData.data.getShoppingList.name);
      } else {
        setShoppingListExists(false);
      }

      // Grabs the id field from the shopping list data
      const shoppingListId = shoppingListData.data.getShoppingList.id;

      // Grabs the items that are related to the id of the shopping list
      const itemsList = await API.graphql(
        graphqlOperation(listItems, {
          filter: {
            shoppingListItemsId: {
              eq: shoppingListId.toString(),
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

  // Update item
  const updateShoppingListItem = async () => {

    const item = await API.graphql(graphqlOperation(getItem, {id: itemId}));
    // if item is updated to have 0 or less quantity, the item will automatically be deleted
    if (!(item.quantity == null) && parseInt(quantityText) <= 0) {
      deleteShoppingListItem(itemId);
      handleModal();
      return;
    }

    try {
      // Perform
      const update = {
        id: itemId,
        name: nameText ? nameText : item.name,
      }

      const u = await API.graphql(graphqlOperation(updateItem, {input: update}));
      setNameText("");
      fetchItems();
      handleModal();
    } catch (err) {

    }
  }

  // delete item
  const deleteShoppingListItem = async (deleteId) => {
    try {
      const id = {
        id: deleteId
      }
      const d = await API.graphql(graphqlOperation(deleteItem,{input: id} ));
      fetchItems();
    } catch (err) { 
      console.log(err);
    }
  }

  const modalScreen = (
    <Modal visible={isModalVisible} animationType="slide">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{fontSize: 25, fontWeight: "bold", margin: 10}}>Edit your item</Text>
        <Input
          placeholder="Name"
          containerStyle={{ width: 250 }}
          onChangeText={(value) => setNameText(value)}
        />
        <Button
          buttonStyle={{ width: 200, margin: 20}}
          title="Submit"
          onPress={() => {
            updatePantryItem();
          }}
        ></Button>
        <Button buttonStyle={{width: 200}} title="Go back" onPress={handleModal}></Button>
      </View>
    </Modal>
  );

  // list of items from shopping list
  const listOfItems = items.map((item) => {
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
          </Text>
          <Button  buttonStyle={{backgroundColor: 'red', width: 75, marginRight: 5}} title="delete" onPress={() => {
             Alert.alert("Delete Item", "Are you sure you want to delete item?", [
               {
                 text: "Yes",
                 onPress: () => { 
                    deleteShoppingListItem(item.id); // Uses amplify Auth library and signOut() method
                },
               },
               {
                 text: "No",
                 style: "cancel",
               },
             ]);
          }}></Button>
        </View>
        <View style={{ height: 1.2, backgroundColor: "grey" }} />
      </View>
    );
  });


  // checks whether or not a user has a shopping list yet
  const checkIfShoppingListExists = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser(); // grabs current user's information

      // Performs the getShoppingList query based on user's id
      const shoppingListData = await API.graphql(
        graphqlOperation(getShoppingList, { id: user.username.toString() })
      );

      // If it's null, we want to render the create shopping list button
      // otherwise, we want to hide it
      if (shoppingListData.data.getShoppingList == null) {
        setShoppingListButton(true);
      } else {
        setShoppingListButton(null);
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
        }}
      >
        {/* Conditional render based on the value of shoppingListButton and shoppingListExists */}
        {shoppingListButton && (
          <Button
            buttonStyle={{ margin: 15 }}
            title="Create Pantry"
            onPress={() => {
              navigation.navigate("CreatePantry");
            }}
          ></Button>
        )}
        {!shoppingListExists && <Text>You must make a pantry before you make a shopping list</Text>}
        {shoppingListExists && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 25, marginBottom: 15 }}>Shopping List</Text>
            <Button
              buttonStyle={{ width: 250 }}
              title="Add Item"
              onPress={() => {
                navigation.navigate("AddShoppingListItem");
              }}
            ></Button>
            <View>{listOfItems}</View>
            <View>{modalScreen}</View>
          </View>
        )}
      </ScrollView>
  );
}



export default ShoppingStackScreen;
