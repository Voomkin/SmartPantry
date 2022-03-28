import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";

const PatchNotesScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This app is currently in its alpha testing phase</Text>
    </View>
  );
};

export default PatchNotesScreen;