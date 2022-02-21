import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listItems } from "../queries.js";

const PantryScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  // empty array to only load this once
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const itemData = await API.graphql(graphqlOperation(listItems));
      const itemList = itemData.data.listItems.items;
      setItems(itemList);
    } catch (err) {
      console.log(err);
    }
  };

// list of items description
const listOfItems = items.map(item => {
    return (
      <>
        <Text>{item.name}</Text>
        <Text>{item.weight}</Text>
      </>
    );
})

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
          {listOfItems}
      </Text>
    </View>
  );
};

export default PantryScreen;
