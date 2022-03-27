import React, { Component, useState } from "react";
import {Text,View, Switch, Alert, ScrollView } from "react-native";
import {Icon, Button} from "react-native-elements";
import {Auth, API, graphqlOperation } from 'aws-amplify';
import MyInfoScreen from "./MyInfo";
import AccountsScreen from "./Accounts";
import NotificationsScreen from "./Notifications";
import HelpScreen from "./Help";
import AboutScreen from "./About";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deletePantry, deleteShoppingList, deleteItem } from "../mutations";
import { getPantry, listItems, getShoppingList } from "../queries";
import OtherPantryScreen from "./OtherPantry";

const handleSignOut = () => {
    Alert.alert("Sign Out", "Do you want to sign out?", [
      {
        text: "Yes",
        onPress: () => Auth.signOut(),
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
}

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen options={{headerShown: false}}name="SettingsStack" component={Settings} />
      <SettingsStack.Screen name="Collaborator Pantry" component={OtherPantryScreen} />
      <SettingsStack.Screen name="My Info" component={MyInfoScreen} />
      <SettingsStack.Screen name="Accounts" component={AccountsScreen} />
      <SettingsStack.Screen name="Notifications" component={NotificationsScreen} />
      <SettingsStack.Screen name="Help" component={HelpScreen} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
};

const Settings = ({navigation}) => {


    // Contains the settings options, each has a title, subtitle, and what to do when pressed
    const settingsOptions = [
      { title: "Collaborator Pantry",
        subTitle: "View another user's pantry",
         onPress: () => {
          navigation.navigate("Collaborator Pantry");
      } },
      { title: "My Info", subTitle: "Setup your profile", onPress: () => {
          navigation.navigate("My Info");
      } },
      { title: "Accounts",
        subTitle: "View other pantries and manage who can view yours",
         onPress: () => {
          navigation.navigate("Accounts");
      } },
      {
        title: "Notifications",
        subTitle: "Manage your notifications",
        onPress: () => {
          navigation.navigate("Notifications");
        },
      },
      { title: "Help", subTitle: "Help page", onPress: () => {
          navigation.navigate("Help");
      } },
      { title: "About", onPress: () => {
          navigation.navigate("About");
      } },
      {
        title: "Sign Out",
        subTitle: "Sign out of app",
        onPress: () => {
          Alert.alert("Sign Out", "Do you want to sign out?", [
            {
              text: "Yes",
              onPress: () => Auth.signOut(),
            },
            {
              text: "No",
              style: "cancel",
            },
          ]);
        },
      },
      {
        title: "Delete Pantry",
        subTitle: "Delete your pantry",
        onPress: () => {
          Alert.alert("Delete Pantry", "Would you like to delete your pantry? Doing so will also delete your Shopping List", [
            {
              text: "Yes",
              onPress: () => {
                  deleteUserPantry();
              }
            },
            {
              text: "No",
              style: "cancel",
            }
          ])
        }
      }
    ];
    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            {settingsOptions.map(({title,subTitle,onPress}) => 
            <TouchableOpacity key={title} onPress={onPress}>
                <View style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    paddingTop: 20
                }}>
                    <Text style={{fontSize: 17}}>{title}</Text>
                    {subTitle && <Text style={{fontSize:13, color:'grey', paddingTop:5}}>{subTitle}</Text>}
                </View>
                <View style={{height: 1.2, backgroundColor: 'grey'}}/>
            </TouchableOpacity>)}
        </ScrollView>
    );
}

const deleteUserPantry = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    const pantryData = await API.graphql(
      graphqlOperation(getPantry, { id: user.username.toString() })
    );

      // if the getPantry query does not return a null value, sets pantry exists to true
      // otherwise sets it to false because they don't have a pantry yet
      if (pantryData.data.getPantry == null) {
        Alert.alert("Delete Pantry", "You do not have a pantry");
      }
      else {

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
      // alert(JSON.stringify(itemsList.data.listItems.items));
      const deleteAllItems = b.map( async (item) => {
        const deletionId = {
          id: item.id,
        };
        const delPantryItem = await API.graphql(graphqlOperation(deleteItem, { input: deletionId }));
      });

      const shoppingListData = await API.graphql(
        graphqlOperation(getShoppingList, { id: user.username.toString() })
      );

      const shoppingListId = shoppingListData.data.getShoppingList.id;

      const shoppingItemsList = await API.graphql(
        graphqlOperation(listItems, {
          filter: {
            shoppingListItemsId: {
              eq: shoppingListId.toString(),
            },
          },
        })
      );

      const c = shoppingItemsList.data.listItems.items;

      const deleteAllShoppingItems = c.map( async (item) => {
        const deletionId = {
          id: item.id,
        };
        const delPantryItem = await API.graphql(graphqlOperation(deleteItem, { input: deletionId }));
      });

      const delId = {
        id: user.username.toString()
      }

      const delPantry = await API.graphql(graphqlOperation(deletePantry, { input: delId }));

      const delShopping = await API.graphql(graphqlOperation(deleteShoppingList, { input: delId }));

      Alert.alert("Delete Pantry", "Your pantry and has been deleted");
    }

  } catch(err) {
    console.log(err);
  }
}

export default SettingsStackScreen;