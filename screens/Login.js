import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Icon, CheckBox, Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  return (
    // Container start
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        style={{ height: Dimensions.get("window").height / 2.5 }}
      >
        <View style={Styles.brandView}>
          <Icon name="shopping-cart"></Icon>
          <Text style={Styles.brandViewText}>Smart Pantry</Text>
        </View>
      </ImageBackground>
      <View style={Styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: "rgba(78,116,289,1)", fontSize: 32 }}>
            Welcome
          </Text>
          <Text style={{ padding: 10 }}>
            Don't have an account?
            <Text style={{ color: "red", fontStyle: "italic", padding: 20 }}>
              {" "}
              Register now
            </Text>
          </Text>
          <View style={{ margin: 20 }}>
            <TextInput
              style={Styles.textInputs}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style={Styles.textInputs}
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>

          <View style={Styles.forgotPassView}>
            <View style={{ flex: 1, marginLeft: -20 }}>
              <Text style={{ color: "#8f9195" }}>Remember Me</Text>
              <CheckBox checked={true} color="#4632A1" />
            </View>
            <View style={{ flex: 1, marginRight: 0 }}>
              <Text style={{ color: "#8f9195", alignSelf: "flex-end" }}>
                Forgot Password
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              rounded
              title="Login"
              buttonStyle={{
                backgroundColor: "rgba(78,116,289,1)",
                borderRadius: 15,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={() => {
                navigation.navigate("Home")}
              }
            ></Button>
          </View>
          <View style={{ marginBottom: 0, flex: 1, alignItems: "center" }}>
            <Text style={{ textAlign: "center" }}>or login with</Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                icon={{ name: "facebook", size: 30 }}
                buttonStyle={{
                  backgroundColor: "white",
                  height: 60,
                  width: 60,
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                }}
                rounded
              ></Button>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    // container end
  );
};

export default LoginScreen;

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
