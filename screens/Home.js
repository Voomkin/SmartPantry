import React, { useState, useEffect, useRef } from "react";
import {Text,View ,ScrollView, Modal, Alert, Animated, PanResponder} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {Icon, Input} from 'react-native-elements';
import { Button } from "react-native-elements";
import { getPantry } from "../queries";
import CreatePantryScreen from "./CreatePantry";
import AddItemScreen from "./AddItem";
import ManualAddScreen from "./ManualAdd";
import { listItems, getItem } from "../queries.js";
import { createItem, deleteItem, updateItem, createShoppingList, updatePantry } from "../mutations";
import BarcodeAddScreen from "./BarcodeAdd";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


// Creates a stack navigator object
const HomeStack = createStackNavigator();

// Allows the nesting of bottom tab and stack navigation
// Contains all the screens that are reachable/within the bottom tab home screen
const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator screenOptions={{
        headerBackTitleVisible: false
      }}>
        <HomeStack.Screen
          options={{ headerShown: false }}
          name="HomeStack"
          component={HomeScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Create Pantry" }}
          name="CreatePantry"
          component={CreatePantryScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Add Item" }}
          name="AddItem"
          component={AddItemScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Manual Add" }}
          name="ManualAdd"
          component={ManualAddScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Barcode Add" }}
          name="BarcodeAdd"
          component={BarcodeAddScreen}
        />
      </HomeStack.Navigator>
    );
}


// The actual home screen rendering
const HomeScreen = ({ navigation }) => {

  //NOTIFICATION STUFF
  try {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect( () => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  } catch(err) {
    console.log(err);
  }

  //Note: Here we will need to determine the conditions in which a user should receive a notification.
  //Current plan is to make an expiring soon and a running low function which returns items that are
  //approaching the expiration date and which are running low in terms of weight respectively. Note
  //that at the moment a user will get a notification no matter what when visiting home screen.
  schedulePushNotification();  

  //END NOTIFICATION STUFF

  // useState variables to track whether to render the create pantry button
  // the value of the pantry items, and if a user has a pantry.
  const [createPantryButton, setCreatePantryButton] = useState(null);
  const [items, setItems] = useState([]);
  const [pantryExists, setPantryExists] = useState(false);
  const [pantryName, setPantryName] = useState("");
  const [nameText, setNameText] = useState("");
  const [weightText, setWeightText] = useState("");
  const [quantityText, setQuantityText] = useState("");
  const [itemId, setItemId] = useState(null);

   const [isModalVisible, setIsModalVisible] = useState(false);

   const handleModal = () => setIsModalVisible(() => !isModalVisible);

  // Loads when you come back to this screen
  // refreshes each time you go back to the screen
  // Checks if a pantry exists and fetches the user's items on every load
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkIfPantryExists();
      fetchItems();
    });
    return unsubscribe;
  }, [navigation, items]);

  // fetches just the items of the pantry that belongs to the current authenticated user
  const fetchItems = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser(); // returns cognito user JSON

      // Performs the getPantry query based on the id, which is the user's username
      const pantryData = await API.graphql(
        graphqlOperation(getPantry, { id: user.username.toString() })
      );

      // if the getPantry query does not return a null value, sets pantry exists to true
      // otherwise sets it to false because they don't have a pantry yet
      if (pantryData.data.getPantry == null) {
        setPantryExists(false);
      } else {
        setPantryExists(true);
        setPantryName(pantryData.data.getPantry.name);

        // Grabs the id field from the pantry data
        const pantryId = pantryData.data.getPantry.id;

        // Grabs the items that are related to the id of the pantry
        const itemsList = await API.graphql(
          graphqlOperation(listItems, {
            filter: {
              pantryItemsId: {
                eq: pantryId.toString(),
              },
            },
          })
        );

        // stores the value of the items returned
        const b = itemsList.data.listItems.items;

        // changes the value of useState items value
        setItems(b);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update item
  const updatePantryItem = async () => {

    const item = await API.graphql(graphqlOperation(getItem, {id: itemId}));

    // if item is updated to have 0 or less quantity, the item will automatically be deleted
    if (!(item.data.getItem.quantity == null) && parseInt(quantityText) <= 0) {
      deletePantryItem(itemId);
      handleModal();
      return;
    }

    // if item percentage goes to 0 or below, item automatically delete
    if (
      !(item.data.getItem.weight == null) &&
      (parseFloat(weightText) / parseFloat(item.data.getItem.weight)) <= 0
    )
    {
      deletePantryItem(itemId);
      handleModal();
      return;
    }
      try {
        // Perform
        const update = {
          id: itemId,
          name: nameText ? nameText : item.name,
          currWeight: weightText
            ? parseFloat(weightText)
            : item.data.getItem.weight,
          quantity: quantityText
            ? parseInt(quantityText)
            : item.data.getItem.quantity,
        };

        const u = await API.graphql(
          graphqlOperation(updateItem, { input: update })
        );
        setNameText("");
        setWeightText("");
        setQuantityText("");
        fetchItems();
        handleModal();
      } catch (err) {}
  }

  // delete item
  const deletePantryItem = async (deleteId) => {
    try {
      const id = {
        id: deleteId
      }
      const d = await API.graphql(graphqlOperation(deleteItem,{input: id} ));
      fetchItems();
    } catch (err) { 
      console.log(err);
    }
  }

  // add an item to the shopping list upon deleting it from the pantry, if the user wishes
  const addToShoppingList = async (itemID, name) => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      const id = {
        id: itemID,
        name: name,
        imagePath: "default_img",
        shoppingListItemsId: user.username.toString()
      }
      const d = await API.graphql(graphqlOperation(createItem,{input: id} ));
    } catch (err) { 
      console.log(err);
    }
  }

  const modalScreen = (
    <Modal visible={isModalVisible} animationType="slide">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{fontSize: 25, fontWeight: "bold", margin: 10}}>Edit your item</Text>
        <Input
          placeholder="Name"
          containerStyle={{ width: 250 }}
          onChangeText={(value) => setNameText(value)}
        />
        <Input
          placeholder="Current Weight (optional)"
          containerStyle={{ width: 250 }}
          onChangeText={(value) => setWeightText(value)}
        />
        <Input
          placeholder="Quantity (optional)"
          containerStyle={{ width: 250 }}
          onChangeText={(value) => setQuantityText(value)}
        />
        <Button
          buttonStyle={{ width: 200, margin: 20}}
          title="Submit"
          onPress={() => {
            updatePantryItem();
          }}
        ></Button>
        <Button buttonStyle={{width: 200}} title="Go back" onPress={handleModal}></Button>
      </View>
    </Modal>
  );

  // list of items from pantry
  const listOfItems = items.map((item) => {
    let percentage = (parseFloat(item.currWeight) / parseFloat(item.weight) * 100).toFixed(2);
    return (
      <View key={item.id}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          <Text
            style={{paddingLeft: 15, width: "50%", flexDirection: "column", fontSize: 18 }}
          >
            {item.name + '\n'}
            {item.quantity && <Text style={{fontSize: 15, fontWeight: 'bold'}}>Quantity: {item.quantity}</Text>}
            {item.weight && <Text style={{fontSize: 15, fontWeight: "bold"}}>Percentage left: {percentage}%</Text>}
            {item.expDate && <Text style={{fontSize: 15, fontWeight: "bold"}}>Expiration date: {item.expDate}</Text>}
          </Text>
          <Button buttonStyle={{ backgroundColor: 'grey', width: 75, marginRight: 5 }} title="update" onPress={() => {
            setItemId(item.id);
            handleModal();
          }}>
          </Button>
          <Button  buttonStyle={{backgroundColor: 'red', width: 75, marginRight: 5}} title="delete" onPress={() => {
             Alert.alert("Delete Item", "Are you sure you want to delete item?", [
               {
                 text: "Yes",
                 onPress: () => { 
                   Alert.alert("Shopping List", "Would you like to add the item to your shopping list?", [
                     {
                       text: "Yes",
                       onPress: () => {
                         const itemID = item.id;
                         const name = item.name;
                         Alert.alert("Shopping List", "Adding to shopping list: " + name);
                         deletePantryItem(item.id);
                         addToShoppingList(itemID, name);
                       }
                     },
                     {
                      text: "No",
                      onPress: () => {
                        deletePantryItem(item.id);
                      },
                     },
                 ] );
                },
               },
               {
                 text: "No",
                 style: "cancel",
               },
               
             ]);
          }}></Button>
        </View>
        <View style={{ height: 1.2, backgroundColor: "grey" }} />
      </View>
    );
  });


  // checks whether or not a user has a pantry yet
  const checkIfPantryExists = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser(); // grabs current user's information

      // Performs the getPantry query based on user's id
      const pantryData = await API.graphql(
        graphqlOperation(getPantry, { id: user.username.toString() })
      );

      // If it's null, we want to render the create pantry button
      // otherwise, we want to hide it
      if (pantryData.data.getPantry == null) {
        setCreatePantryButton(true);
      } else {
        setCreatePantryButton(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <ScrollView
        contentContainerStyle={{
          // flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Conditional render based on the value of createPantryButton and pantryExists */}
        {createPantryButton && (
          <Button
            buttonStyle={{ margin: 15 }}
            title="Create Pantry"
            onPress={() => {
              navigation.navigate("CreatePantry");
            }}
          ></Button>
        )}
        {!pantryExists && <Text>You don't have a pantry!</Text>}
        {pantryExists && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 25, margin: 15 }}>{pantryName}</Text>
            <Button
              buttonStyle={{ width: 250 }}
              title="Add Item"
              onPress={() => {
                navigation.navigate("AddItem");
              }}
            ></Button>
            <View>{listOfItems}</View>
            <View>{modalScreen}</View>
          </View>
        )}
      </ScrollView>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function schedulePushNotification() {

  const user = await Auth.currentAuthenticatedUser(); // grabs current user's information

  const pantryData = await API.graphql(
    graphqlOperation(getPantry, { id: user.username.toString() })
  );

  if (pantryData.data.getPantry == null) {
    console.log("User has no pantry");
  }
  else {
    //NOTE: The frequency update field stores the number of seconds between timestamps
    if(pantryData.data.getPantry.notifTime + pantryData.data.getPantry.notiffreq < Math.floor(Date.now() / 1000) && pantryData.data.getPantry.notifPending) {
      console.log("Allowing notifications again");
      const pantryInput = {
        id: user.username.toString(),
        notifPending: false,
        notifTime: Math.floor(Date.now() / 1000),
      };
      const p = await API.graphql(graphqlOperation(updatePantry, {input: pantryInput}))
    }

    let itemsExpiring = false;
    const today = new Date();

    //HERE: Check if there are any items expiring in the current user's pantry
    // Grabs the id field from the pantry data
    const pantryId = pantryData.data.getPantry.id;

    // Grabs the items that are related to the id of the pantry
    const itemsList = await API.graphql(
      graphqlOperation(listItems, {
        filter: {
          pantryItemsId: {
            eq: pantryId.toString(),
          },
        },
      })
    );

    const b = itemsList.data.listItems.items;

    const checkExpirations = b.map( async (item) => {
      //NOTE: For some reason, the JavaScipt Date function is outputting the wrong date for me. I can calibrate it to be accurate
      //      but I don't want to do that until closer to when we demo our project.
      // console.log("DATE: " + item.expDate);
      // console.log("MONTH: " + today.getMonth() + " " + today.getDay() + " " + today.getFullYear());
      const exp_date = item.expDate;

      let month = 0;
      let day = 0;
      let year = 0;
      // console.log("EXP DATE: " + exp_date);
      if(exp_date.length == 7) {
        month = parseInt(exp_date.charAt(0));
        day = parseInt(exp_date.substring(1,3));
        year = parseInt(exp_date.substring(3,7));
        // console.log(month + " " + day + " " + year);
      }
      else if(exp_date.length == 8) {
        month = parseInt(exp_date.substring(0,2));
        day = parseInt(exp_date.substring(2,4));
        year = parseInt(exp_date.substring(4,8));
        // console.log(month + " " + day + " " + year);
      }
      // console.log("FULL YEAR", today.getFullYear() + " " + year);

      //Handle if at the end of a year
      if(today.getMonth() == 12) {
        if(month == 12) {
          if(today.getDay() <= day) {
            itemsExpiring = true;
          }
        }
        if(month == 1 && today.getFullYear() + 1 == year) {
          if(day <= 15) {
            itemsExpiring = true;
          }
        }
      }//Next handle the general case
      else if(today.getFullYear() == year) {
        if(today.getMonth() == month && today.getDay() <= day) {
          itemsExpiring = true;
        }
        else if(today.getMonth() + 1 == month && today.getDay() > 15 && day <= 15) {
          itemsExpiring = true;
        }
      }
    });

    if(itemsExpiring) {
      console.log("User has items expiring soon");
    }
    else {
      console.log("User has no items expiring soon");
    }

    if(!pantryData.data.getPantry.notifPending && itemsExpiring) {
      console.log("Scheduling notification");

      const pantryInput = {
        id: user.username.toString(),
        notifPending: true,
        notifTime: Math.floor(Date.now() / 1000),
      };
      const p = await API.graphql(graphqlOperation(updatePantry, {input: pantryInput}))

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "SMART PANTRY",
          body: 'You have items expiring soon! Click here to view them.',
          data: { data: 'TEST TEST TEST TEST TEST' },
        },
        trigger: { seconds: pantryData.data.getPantry.notiffreq },
      });

    }
  }
}

let convertExpDate = (date_string) => {
  let month = "";
  let day = "";
  let year = "";
  if(date_string.length == 7) {
    month = date_string.charAt(0);
    day = date_string.substring(1,3);
    year = date_string.substring(3,7);
  }
  else if(date_string.length = 8) {
    month = date_string.substring(0,2);
    day = date_string.substring(2,4);
    year = date_string.substring(4,8);
  }

  return "" + month + "/" + day + "/" + year;
}

export default HomeStackScreen;

