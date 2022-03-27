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



const viewOtherPantry = async () => {
    try {

      const user = await Auth.currentAuthenticatedUser();
  
      const pantriesList = await API.graphql(
        graphqlOperation(listPantries, {
        filter: {
            collabId: {
            eq: user.username.toString(),
            },
        },
        })
      );

      const b = pantriesList.data.listPantries.items;
  
      
      //NOTE: As of 3/27/2022, it may be the case that a collaborator can view multiple pantries
      const collabPantries = b.map( async (pantry) => {
        console.log(pantry.name);
      });
  
    } catch(err) {
  
    }
  }



  


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
    //   const pantryData = await API.graphql(
    //     graphqlOperation(getPantry, { id: user.username.toString() })
    //   );

    //   const user = await Auth.currentAuthenticatedUser();
  
      const pantriesList = await API.graphql(
        graphqlOperation(listPantries, {
        filter: {
            collabId: {
            eq: user.username.toString(),
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
        //   });

        
        // alert("HERE");

        // if the getPantry query does not return a null value, sets pantry exists to true
        // otherwise sets it to false because they don't have a pantry yet
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  // Update item
//   const updatePantryItem = async () => {

//     const item = await API.graphql(graphqlOperation(getItem, {id: itemId}));
//     // if item is updated to have 0 or less quantity, the item will automatically be deleted
//     if (!(item.quantity == null) && parseInt(quantityText) <= 0) {
//       deletePantryItem(itemId);
//       handleModal();
//       return;
//     }

//     try {
//       // Perform
//       const update = {
//         id: itemId,
//         name: nameText ? nameText : item.name,
//         currWeight: weightText ? parseFloat(weightText) : item.weight,
//         quantity: quantityText ? parseInt(quantityText) : item.quantity
//       }

//       const u = await API.graphql(graphqlOperation(updateItem, {input: update}));
//       setNameText("");
//       setWeightText("");
//       setQuantityText("");
//       fetchItems();
//       handleModal();
//     } catch (err) {

//     }
//   }

  // delete item
//   const deletePantryItem = async (deleteId) => {
//     try {
//       const id = {
//         id: deleteId
//       }
//       const d = await API.graphql(graphqlOperation(deleteItem,{input: id} ));
//       fetchItems();
//     } catch (err) { 
//       console.log(err);
//     }
//   }

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

//   const modalScreen = (
//     <Modal visible={isModalVisible} animationType="slide">
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text style={{fontSize: 25, fontWeight: "bold", margin: 10}}>Edit your item</Text>
//         <Input
//           placeholder="Name"
//           containerStyle={{ width: 250 }}
//           onChangeText={(value) => setNameText(value)}
//         />
//         <Input
//           placeholder="Current Weight (optional)"
//           containerStyle={{ width: 250 }}
//           onChangeText={(value) => setWeightText(value)}
//         />
//         <Input
//           placeholder="Quantity (optional)"
//           containerStyle={{ width: 250 }}
//           onChangeText={(value) => setQuantityText(value)}
//         />
//         <Button
//           buttonStyle={{ width: 200, margin: 20}}
//           title="Submit"
//           onPress={() => {
//             updatePantryItem();
//           }}
//         ></Button>
//         <Button buttonStyle={{width: 200}} title="Go back" onPress={handleModal}></Button>
//       </View>
//     </Modal>
//   );

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
          {/* <Button  buttonStyle={{backgroundColor: 'red', width: 75, marginRight: 5}} title="delete" onPress={() => {
             Alert.alert("Delete Item", "Are you sure you want to delete item?", [
               {
                 text: "Yes",
                 onPress: () => { 
                   Alert.alert("Shopping List", "Would you like to add the item to your shopping list?", [
                     {
                       text: "Yes",
                       onPress: () => {
                         const itemID = item.id;
                         const name = item.name;
                         Alert.alert("Shopping List", "Adding to shopping list: " + name);
                         deletePantryItem(item.id);
                         addToShoppingList(itemID, name);
                       }
                     },
                     {
                      text: "No",
                      onPress: () => {
                        deletePantryItem(item.id);
                      },
                     },
                 ] );
                },
               },
               {
                 text: "No",
                 style: "cancel",
               },
             ]);
          }}></Button> */}
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
        }}
      >
        {/* Conditional render based on the value of createPantryButton and pantryExists */}
        {/* {createPantryButton && (
          <Button
            buttonStyle={{ margin: 15 }}
            title="Create Pantry"
            onPress={() => {
              navigation.navigate("CreatePantry");
            }}
          ></Button>
        )} */}
        {!pantryExists && <Text>You are not a collaborator for any pantries</Text>}
        {pantryExists && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 25, marginBottom: 15 }}>{pantryName}</Text>
            {/* <Button
              buttonStyle={{ width: 250 }}
              title="Add Item"
              onPress={() => {
                navigation.navigate("AddItem");
              }}
            ></Button> */}
            <View>{listOfItems}</View>
            {/* <View>{modalScreen}</View> */}
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