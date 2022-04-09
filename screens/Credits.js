import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";

const CreditsScreen = ({ navigation }) => {
  return (
    <Button
        onPress={ async () => {
            // alert("You will receive a notification in a few seconds")
            await schedulePushNotification();
        }}
        title="Test Bluetooth"
        color="blue"
      />
  );
};

const testBluetooth = async () => {
  alert("TEST");
}

export default CreditsScreen;