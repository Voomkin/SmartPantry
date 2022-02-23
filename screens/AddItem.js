import React from "react";
import { View } from "react-native";
import {Button} from "react-native-elements";
import {Camera} from 'react-native-camera';

const AddItemScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button buttonStyle={{margin: 20}} title="Manual Add" onPress={() => {navigation.navigate("ManualAdd")}}></Button>
      <Button title="Barcode Add"></Button>
    </View>
  );
};

export default AddItemScreen;
