import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {Alert } from "react-native";
import { withAuthenticator } from 'aws-amplify-react-native';
import MyInfoScreen from '../screens/MyInfo';

import AsyncStorage from '@react-native-async-storage/async-storage';


const HandleSignOut = () => {
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
    return null;
  }

const CustomDrawer = props => {

    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
          setUserEmail(await AsyncStorage.getItem('@userEmail'))
        } catch(e) {
          // error reading value
        }
    }
      

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        style={{backgroundColor: '#b5e48c'}}

        contentContainerStyle={{backgroundColor: '#3D405B'}}>
        <ImageBackground
          source={require('../assets/images/food.png')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/images/foodicon.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10, tintColor:'white', shadowColor: 'black',
            shadowOpacity: 1,
            shadowRadius: 5
        }}
          />
          <Text
            style={{
              color: '#fff',
              textShadowRadius: 5,
              textShadowColor: 'black',
              fontSize: 18,
              fontFamily: 'Lato-Black',
              marginBottom: 5,
            }}>
            SMART{'\n'}PANTRY{'\n'}APPLICATION{'\n'}
            {userEmail}
          </Text>
        </ImageBackground>
        <View style={{ backgroundColor: '#b5e48c', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView >
      <View style={{padding: 20, borderTopWidth: 2, borderTopColor: '#3D405B', backgroundColor: '#b5e48c'}}> 
      
        
        <TouchableOpacity onPress={() => {HandleSignOut()}} style={{paddingVertical: 15, paddingTop:0}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color= '#343a40'
/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Lato-Regular',
                marginLeft: 5,
                color: '#343a40'
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{color: '#3D405B', fontSize: 13, textAlign: 'left'}}>© Group 3 : CSEE 481{'\n'}</Text>

      </View>
    </View>
  );
};

export default CustomDrawer;