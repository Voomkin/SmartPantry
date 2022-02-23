import React from "react";
import {
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import {API, graphqlOperation, Auth } from "aws-amplify";
import { getPantry } from './../queries';
import { listItems } from "../queries.js";
import {Button} from 'react-native-elements';
import { createStackNavigator } from "@react-navigation/stack";
import AddItemScreen from './AddItem';
import ManualAddScreen from './ManualAdd';

const PantryStack = createStackNavigator();

const PantryStackScreen = () => {
    return (
        <PantryStack.Navigator>
            <PantryStack.Screen options={{headerShown:false}} name="PantryStack" component={PantryScreen}/>
            <PantryStack.Screen options={{headerShown:true, title: 'Add Item'}} name="AddItem" component={AddItemScreen} />
            <PantryStack.Screen options={{headerShown:true, title: 'Manual Add'}} name="ManualAdd" component={ManualAddScreen} />
        </PantryStack.Navigator>
    )
}


const PantryScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [pantryExists, setPantryExists] = useState(false);

  // Loads when you come back to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchItems();
    });
    return unsubscribe;
  }, [navigation]);

  // fetches just the items of the pantry that belongs to the current authenticated user
  const fetchItems = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const pantryData = await API.graphql(graphqlOperation(getPantry, {id: user.username.toString()}));
      
      if (pantryData.data.getPantry != null) {
        setPantryExists(true);
      } else {
        setPantryExists(false);
      }

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
    const b = itemsList.data.listItems.items
    setItems(b);
    } catch (err) {
      console.log(err);
    }
  };

// list of items from pantry
  const listOfItems = items.map((item, id) => {
      return (
        <>
          <Text key={id}>{"\n" + item.name + " "}</Text>
          <Text>{item.quantity ? item.quantity : "" + " " }</Text>
          <Text>{item.weight ? item.weight : ""}</Text>
          <Text>{"\n"}</Text>
        </>
      );
  })
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
          <Text>{listOfItems}</Text>
          </>
        )}

        
      </Text>
    </View>
  );

};

export default PantryStackScreen;
