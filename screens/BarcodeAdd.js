import React, {useState, useEffect } from "react";
import { Input, Button } from "react-native-elements";
import { View, Text, StyleSheet, Alert} from "react-native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createItem } from "../mutations";
import { BarCodeScanner } from "expo-barcode-scanner";

const BarcodeAddScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // test api call with edamam
  const fetchApiCall = (upcCode) => {
    fetch(
      "https://api.edamam.com/api/food-database/v2/parser?app_id=a82b5608&app_key=0024069e0841f1b87a40123aeefab05c&upc=" + `${upcCode}` + "&nutrition-type=cooking",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        try {

          // response.hints[0].food.label -> name of the food item
          console.log(response.hints[0].food.label);
        } catch (err) {
          Alert.alert('Couldn\'t find barcode, please manually add');
          navigation.navigate("AddItem");
        } 
      });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetchApiCall(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permissions</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera!</Text>;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"Tap to Scan again"}
          onPress={() => setScanned(false)}
        ></Button>
      )}
    </View>
  );
};

export default BarcodeAddScreen;
