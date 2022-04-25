import React, {useState, useEffect } from "react";
import { Input, Button } from "react-native-elements";
import { View, Text, StyleSheet, Alert, Modal} from "react-native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createItem } from "../mutations";
import { BarCodeScanner } from "expo-barcode-scanner";
import { listNewWeights, getNewWeight } from "../queries";

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

  const addPantryItem = async (scale_weight) => {
    if (nameText == "") {
      return;
    }

    console.log("HERE!!!");

    let add_weight = 0;

    if(scale_weight != null || scale_weight == 0) {
      console.log("READING: " + scale_weight);
      add_weight = scale_weight;
    } 
    else {
      add_weight = parseFloat(weightText);
    }

    const user = await Auth.currentAuthenticatedUser();
    const itemInput = {
      name: nameText,
      imagePath: "default_img",
      weight: add_weight,
      currWeight: add_weight,
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

  const theWeightBuffer = async () => {
    console.log("TEST THIS");
    const weightsList = await API.graphql(graphqlOperation(listNewWeights));
    
  
    const b = weightsList.data.listNewWeights.items;
    // console.log(b);
    if(b.length > 0) {
      // console.log(b[0].id);
      let most_recent = 0;
  
      const viewItems = b.map( async (item) => {
        if(item.id > most_recent)
          most_recent = item.id;
  
        const json_string = item.weight_data;
        const item_weight = parseFloat(json_string.substring(json_string.indexOf("value") + "value\":".length, json_string.indexOf("}")));
        console.log(item_weight);
      });
  
      console.log("ITEM TO ADD: " + most_recent);
  
      const weightData = await API.graphql(
        graphqlOperation(getNewWeight, { id: most_recent })
      );
  
      let weight_to_add = weightData.data.getNewWeight.weight_data;
      weight_to_add = parseFloat(weight_to_add.substring(weight_to_add.indexOf("value") + "value\":".length, weight_to_add.indexOf("}")));
      console.log("WRITING: " + weight_to_add);
  
      addPantryItem(weight_to_add);
    }
    else {
      console.log("Not in DB");
    }
  }

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
    return <Text style={{textAlign: "center"}}>{'\n'}Requesting for camera permissions</Text>;
  }

  if (hasPermission === false) {
    return <Text style={{textAlign: "center"}}>{'\n'}No access to camera!</Text>;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor: '#b5e48c' }}>
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
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor: '#b5e48c' }}>
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
            buttonStyle={{ 
              marginLeft:50,
              marginRight:50,
              backgroundColor:'#3D405B',
              borderRadius:10,
              borderWidth: 1,
              width: 100,
              borderColor: '#fff' }} 
            title="Use Scale"
            onPress={() => {
              Alert.alert("Weigh Item", "Please place the item you would like to weigh on the scale and wait a few seconds");
              setTimeout(theWeightBuffer, 5000);
            }}
          ></Button>
          <Button
            buttonStyle={{ 
              marginLeft:50,
              marginRight:50,
              marginTop:10,
              backgroundColor:'#3D405B',
              borderRadius:10,
              borderWidth: 1,
              width: 100,
              borderColor: '#fff' }} 
            title="Submit"
            onPress={() => {
              addPantryItem(null);
            }}
          ></Button>
          <Button buttonStyle={{ 
            marginLeft:50,
            marginRight:50,
            marginTop: 10,
            backgroundColor:'#3D405B',
            borderRadius:10,
            borderWidth: 1,
            width: 100,
            borderColor: '#fff' }}  title="Go Back" onPress={handleModal}></Button>
        </View>
      </Modal>
      {scanned && (
        <Button
          title={"Tap to Scan again"}buttonStyle={{ 
            marginLeft:50,
            marginRight:50,
            backgroundColor:'#3D405B',
            borderRadius:10,
            borderWidth: 1,
            width: 200,
            borderColor: '#fff' }} 
          onPress={() => setScanned(false)}
        ></Button>
      )}
    </View>
  );
};

export default BarcodeAddScreen;
