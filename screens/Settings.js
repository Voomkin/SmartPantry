import React, { Component } from "react";
import {Text,View, Switch, Alert, ScrollView } from "react-native";
import {Icon, Button} from "react-native-elements";
import {Auth} from 'aws-amplify';
import AboutScreen from "./About";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <SettingsStack.Navigator screenOptions={{
      headerBackTitleVisible: false
    }}>
      <SettingsStack.Screen options={{headerShown: false}}name="SettingsStack" component={Settings} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
};

const Settings = ({navigation}) => {

    // Contains the settings options, each has a title, subtitle, and what to do when pressed
    const settingsOptions = [
      { title: "My Info", subTitle: "Setup your profile", onPress: () => {} },
      { title: "Accounts", onPress: () => {} },
      {
        title: "Notifications",
        subTitle: "Manage your notifications",
        onPress: () => {},
      },
      { title: "Help", subTitle: "Help page", onPress: () => {} },
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

export default SettingsStackScreen;