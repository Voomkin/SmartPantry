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
import { Heading, Box } from 'native-base'
import Card from '../components/Card'

const ShoppingStack = createStackNavigator();

/**
 * @author Kollin Labowski
 * @returns The Shopping stack screen for navigating between the shopping list page and the add item page.
 */
const ShoppingStackScreen = () => {
  return (
    <ShoppingStack.Navigator >
      <ShoppingStack.Screen
        options={{ headerShown: false }}
        name="Back"
        component={Shopping}
      />
      <ShoppingStack.Screen
          options={{ headerShown: true, title: "Add Item",  headerStyle: {backgroundColor: '#b5e48c'} }}
          name="AddShoppingListItem"
          component={AddShoppingListItemScreen}
          
        />



    </ShoppingStack.Navigator>
  );
};

/**
 * @author Kollin Labowski
 * @param navigation - Used for navigating the Shopping List stack. 
 * @returns Displays the shopping list of the current user to the screen.
 */
const Shopping = ({navigation}) => {
  const [shoppingListButton, setShoppingListButton] = useState(null);
  const [items, setItems] = useState([]);
  const [shoppingListExists, setShoppingListExists] = useState(true);
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
          placeholder="Name (i.e. bananas)"
          containerStyle={{ width: 250 }}
          onChangeText={(value) => setNameText(value)}
        />
        <Button
          buttonStyle={{ width: 200, margin: 20}}
          title="Hello"
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
            {item.name}
          </Text>
          <Button  buttonStyle={{ marginTop:10,
                paddingTop:15,
                paddingBottom:15,
                backgroundColor:'#ff686b',
                borderRadius:10,
                borderWidth: 1,
                borderColor: '#fff' }} title="Delete Item" onPress={() => {
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
          backgroundColor: '#b5e48c'
        }}
      >
        {/* Conditional render based on the value of shoppingListButton and shoppingListExists */}
        {/* {shoppingListButton && (
          // <Button
          //   buttonStyle={{ margin: 15 }}
          //   title="Create Pantry"
          //   onPress={() => {
          //     navigation.navigate("CreatePantry");
          //   }}
          // ></Button>
        )} */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View><Text style={styles.paddedHeading}>My Shopping List</Text></View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

        {!shoppingListExists && <Text style={[styles.body]}>You must make a pantry before you make a shopping list.</Text>}
        {shoppingListExists && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            
            <Button
              buttonStyle={{ marginTop:10,
                paddingTop:15,
                paddingBottom:15,
                marginLeft:30,
                marginRight:30,
                backgroundColor:'#3D405B',
                borderRadius:10,
                borderWidth: 1,
                borderColor: '#fff' }}
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

const styles = StyleSheet.create({
  paddedHeading : {
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    margin: 10
  },
  body:{
    fontSize: 18,
    textAlign: 'center',
    margin: 75,
  }
});

export default ShoppingStackScreen;
