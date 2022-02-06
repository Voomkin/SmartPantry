import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Platform,
  Image
} from "react-native";
import GalleryComponent from './../src/components/GalleryComponent';




const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        style={{ height: Dimensions.get("window").height / 4 }}
      >
        <View style={Styles.brandView}>
          <Text style={Styles.brandViewText}></Text>
        </View>
      </ImageBackground>
      <View style={Styles.bottomView}>
        <View style={{ padding: 40 }}>
          <View style={{ margin: 20 }}>
            <Text>Profile Photo</Text>
            <GalleryComponent></GalleryComponent>
          </View>

          <View style={Styles.forgotPassView}>
            <View style={{ flex: 1, marginLeft: -20 }}></View>
            <View style={{ flex: 1, marginRight: 0 }}></View>
          </View>

          <View
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{ marginBottom: 0, flex: 1, alignItems: "center" }}
          ></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const Styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  brandViewText: {
    color: "black",
    fontSize: 45,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: "white",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  textInputs: {
    height: 40,
    width: 250,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  forgotPassView: {
    height: 50,
    marginTop: 5,
    flexDirection: "row",
  },
});
