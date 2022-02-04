import React, { Component } from "react";
import {Text,View,ScrollView,Dimensions,ImageBackground,StyleSheet} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {Auth} from 'aws-amplify';
import {Icon} from 'react-native-elements';
import { Button } from "react-native-elements/dist/buttons/Button";


const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen options={{headerShown:false}} name="Home" component={HomeScreen}/>
        </HomeStack.Navigator>
    )
}

const HomeScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Hello</Text>
        </View>
    )
}

export default HomeStackScreen;