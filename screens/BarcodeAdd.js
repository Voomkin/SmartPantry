import React, {useState, useEffect } from "react";
import { Input, Button } from "react-native-elements";
import { View, Text, StyleSheet, Alert, Modal} from "react-native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createItem } from "../mutations";
import { BarCodeScanner } from "expo-barcode-scanner";

/**
 * @author Ryan Mraz
 * @param navigation - Used to navigate on the Home stack. 
 * @returns Inputs and buttons for allowing the user to continue on to add the item into the database after scanning it.
 */
const BarcodeAddScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const [nameText, setNameText] = useState("");
  const [weightText, setWeightText] = useState("");
  const [quantityText, setQuantityText] = useState("");

  const addPantryItem = async () => {
    if (nameText == "") {
      return;
    }

    const user = await Auth.currentAuthenticatedUser();
    const itemInput = {
      name: nameText,
      imagePath: "default_img",
      weight: parseFloat(weightText),
      currWeight: parseFloat(weightText),
      quantity: parseInt(quantityText),
      pantryItemsId: user.username.toString(),
    };
    const inputItem = await API.graphql(
      graphqlOperation(createItem, { input: itemInput })
    );
    navigation.navigate("AddItem");
  };

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
          // Alert.alert(response.hints[0].food.label);
          setNameText(response.hints[0].food.label);
          handleModal();
        } catch (err) {
          Alert.alert('Couldn\'t find barcode, please manually add');
          navigation.navigate("AddItem");
        } 
      });
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
        onBarCodeScanned={
          scanned
            ? undefined
            : ({ data }) => {
                setScanned(true);
                fetchApiCall(data);
              }
        }
        style={StyleSheet.absoluteFillObject}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{width: 250}}>{nameText}</Text>
          <Input
            placeholder="Weight (lbs.) (optional)"
            containerStyle={{ width: 250 }}
            onChangeText={(value) => setWeightText(value)}
          />
          <Input
            placeholder="Quantity (optional)"
            containerStyle={{ width: 250 }}
            onChangeText={(value) => setQuantityText(value)}
          />
          <Button
            buttonStyle={{ width: 200 }}
            title="Submit"
            onPress={() => {
              addPantryItem();
            }}
          ></Button>
          <Button buttonStyle={{width: 200, margin: 10}} title="Go Back" onPress={handleModal}></Button>
        </View>
      </Modal>
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
