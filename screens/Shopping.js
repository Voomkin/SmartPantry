import React, { Component } from "react";
import { Text, View, Switch, Alert, ScrollView } from "react-native";
import { Icon, Button } from "react-native-elements";
import { Auth } from "aws-amplify";
import AboutScreen from "./About";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";


const ShoppingStack = createStackNavigator();

const ShoppingStackScreen = () => {
  return (
    <ShoppingStack.Navigator>
      <ShoppingStack.Screen
        options={{ headerShown: false }}
        name="SettingsStack"
        component={Shopping}
      />
    </ShoppingStack.Navigator>
  );
};

const Shopping = ({navigation}) => {

    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Shopping List</Text>
      </View>
    );
}

export default ShoppingStackScreen;
