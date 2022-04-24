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
import { listItems, getItem, getNewWeight, listNewWeights } from "../queries.js";
import { createItem, deleteItem, updateItem, createShoppingList, updatePantry } from "../mutations";
import BarcodeAddScreen from "./BarcodeAdd";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


// Creates a stack navigator object
const HomeStack = createStackNavigator();

// Allows the nesting of bottom tab and stack navigation
// Contains all the screens that are reachable/within the bottom tab home screen

/**
 * @author Ryan Mraz
 * @returns Manages the Home stack, including AddItemScreen, CreatePantryScreen, ManualAddScreen, and BarcodeAddScreen
 */
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
          options={{ headerShown: true, title: "Create Pantry", headerStyle: {backgroundColor: '#b5e48c'}}}
          name="CreatePantry"
          component={CreatePantryScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Add Item", headerStyle: {backgroundColor: '#b5e48c'}
        }}
          name="AddItem"
          component={AddItemScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Manual Add" , headerStyle: {backgroundColor: '#b5e48c'}}}
          name="ManualAdd" 
          component={ManualAddScreen}
        />
        <HomeStack.Screen
          options={{ headerShown: true, title: "Barcode Add", headerStyle: {backgroundColor: '#b5e48c'} }}
          name="BarcodeAdd"
          component={BarcodeAddScreen}
        />
      </HomeStack.Navigator>
    );
}


// The actual home screen rendering
/**
 * @author Ryan Mraz
 * @author Kollin Labowski
 * @param navigation - used for navigating from the Home stack. 
 * @returns Displays items and related information for the current user's pantry, AND manages notifications for the user's device.
 */
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
        console.log("User has clicked notification");
        //If we ever want the notification page to redirect the user to a particular screen, we could do that here
        // console.log(response);
        console.log(response.notification.request.content.data.data);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  } catch(err) {
    console.log(err);
  }

  //NOTE: There are still occaisionally some weird bugs where the user will receive double notifications,
  //but to fix could comment out the following lines. However, the trade-off is that the user will not
  //have their notifications renewed unless they actually click a button on the home page. May make more
  //updates in the next few days (4/12/2022)

  if(Date.now() % 5 == 0) {
    schedulePushNotification();  
  }
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

  const getScaleWeight = async () => {
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
      console.log(weight_to_add);
  
      updatePantryItem(weight_to_add);
    }
    else {
      console.log("Not in DB");
    }
  }

  // Update item
  const updatePantryItem = async (scale_weight) => {

    const item = await API.graphql(graphqlOperation(getItem, {id: itemId}));

    if(scale_weight == null) {

    }

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
          currWeight: weightText && scale_weight == null ? parseFloat(weightText): (scale_weight ? scale_weight : item.data.getItem.currWeight),
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
        console.log(item.data.getItem.quantity)
        console.log(item.data.getItem.origQuantity)
        if((update.quantity <= 2 ||update.quantity < item.data.getItem.origQuantity * 0.3)  || (update.currWeight < item.data.getItem.weight * 0.3) ){
          schedulePushNotification();
          Alert.alert("Shopping List", "Would you like to add the item to your shopping list?", [
            {
              text: "Yes",
              onPress: () => {
                const itemID = update.id;
                const name = item.data.getItem.name;
                Alert.alert("Shopping List", "Adding to shopping list: " + name);
                addToShoppingList(itemID, name);
              }
            },
            {
             text: "No",
             onPress: () => {
               deletePantryItem(item.id);
             },
            },
        ] );        }
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
      console.log(itemID)
      console.log(name)
      const user = await Auth.currentAuthenticatedUser();

      const id = {
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#b5e48c'}}>
        <Text style={{fontSize: 25, fontWeight: "bold", margin: 10}}>Edit Your Item</Text>
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
          buttonStyle={{ marginTop:10,
            paddingTop:5,
            paddingBottom:10,
            backgroundColor:'#3D405B',
            borderRadius:10,
            borderWidth: 1,
            borderColor: '#fff' }}
          title="Use Scale"
          onPress={() => {
            Alert.alert("Weigh Item", "Please place the item you would like to weigh on the scale and wait a few seconds");
            setTimeout(getScaleWeight, 5000);
          }}
        ></Button>
        <Button
          buttonStyle={{ marginTop:10,
            paddingTop:5,
            paddingBottom:10,
            backgroundColor:'#3D405B',
            borderRadius:10,
            borderWidth: 1,
            borderColor: '#fff' }}
          title="Submit"
          onPress={() => {
            updatePantryItem(null);
          }}
        ></Button>
        <Button buttonStyle={{ marginTop:10,
                paddingTop:5,
                paddingBottom:10,
                backgroundColor:'#3D405B',
                borderRadius:10,
                borderWidth: 1,
                borderColor: '#fff' }}
                title="Go back" onPress={handleModal}></Button>
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
            {item.quantity && <Text style={{fontSize: 15, fontWeight: 'bold'}}>Quantity: {item.quantity + "\n"}</Text>}
            {item.weight && <Text style={{fontSize: 15, fontWeight: "bold"}}>Percentage left: {percentage + "%\n"}</Text>}
            {item.expDate && <Text style={{fontSize: 15, fontWeight: "bold"}}>Expiration date: {item.expDate.substring(item.expDate.length - 8, item.expDate.length - 6) + "/" + item.expDate.substring(item.expDate.length - 6, item.expDate.length - 4) + "/" + item.expDate.substring(item.expDate.length - 4, item.expDate.length)}</Text>}
          </Text>
          <Button buttonStyle={{ marginTop:10,
                paddingTop:5,
                paddingBottom:10,
                backgroundColor:'#808080',
                borderRadius:10,
                borderWidth: 1,
                marginRight: 5,
                borderColor: '#fff' }} title="Update" onPress={() => {
            setItemId(item.id);
            handleModal();
            schedulePushNotification();
          }}>
          </Button>
          <Button  buttonStyle={{ marginTop:10,
                paddingTop:5,
                paddingBottom:10,
                backgroundColor:'#ff686b',
                borderRadius:10,
                borderWidth: 1,
                borderColor: '#fff' }} title="Delete" onPress={() => {
             Alert.alert("Delete Item", "Are you sure you want to delete item?", [
               {
                 text: "Yes",
                 onPress: () => { 
                  schedulePushNotification();
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
           flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: '#b5e48c'
        }}
      >
        {!pantryExists}
        {/* Conditional render based on the value of createPantryButton and pantryExists */}
        {createPantryButton && (         
          <Button
              buttonStyle={{                  
                backgroundColor:'#3D405B',
                borderRadius:10,
                borderWidth: 1,
                borderColor: '#fff' }}
              title="Create Pantry"
              onPress={() => {
                navigation.navigate("CreatePantry");
                schedulePushNotification();              }}
            ></Button>
        )}
        {pantryExists && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 25, margin: 15, fontWeight: 'bold' }}>{pantryName}</Text>
            <Button
              buttonStyle={{ marginTop:10,
                paddingTop:12,
                paddingBottom:12,
                marginLeft:30,
                marginRight:30,
                backgroundColor:'#3D405B',
                borderRadius:10,
                borderWidth: 1,
                borderColor: '#fff' }}
              title="Add Item"
              onPress={() => {
                navigation.navigate("AddItem");
                schedulePushNotification();
              }}
            ></Button>


            
            <View>{listOfItems}</View>
            <View>{modalScreen}</View>
          </View>
        )}
      </ScrollView>
  );
};

/**
 * @author Kollin Labowski
 * @returns An expo token for the user to show that the user has registered for notifications through Expo
 */
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

    //MAKE CHANGE HERE!!! Convert from string to long, then do Math.floor(notifTime / 1000)
    if(Math.floor(parseInt(pantryData.data.getPantry.notifTime) / 1000) + pantryData.data.getPantry.notiffreq < Math.floor(Date.now() / 1000) && pantryData.data.getPantry.notifPending) {
      console.log("Allowing notifications again");
      const pantryInput = {
        id: user.username.toString(),
        notifPending: false,
        notifTime: Math.floor(Date.now() / 1000),
      };
      const p = await API.graphql(graphqlOperation(updatePantry, {input: pantryInput}))
    }

    let itemsExpiring = 0;
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
      if(exp_date != null) {

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
              itemsExpiring += 1;
            }
          }
          if(month == 1 && today.getFullYear() + 1 == year) {
            if(day <= 15) {
              itemsExpiring += 1;
            }
          }
        }//Next handle the general case
        else if(today.getFullYear() == year) {
          if(today.getMonth() == month && today.getDay() <= day) {
            itemsExpiring += 1;
          }
          else if(today.getMonth() + 1 == month && today.getDay() > 15 && day <= 15) {
            itemsExpiring += 1;
          }
        }
      }
    });

    let runningLow = 0;

    // console.log("CHECKING ITEMS");
    const checkRunningLow = b.map( async (item) => {
      // console.log("ITEM: " + item.name);
      let alreadyCounted = false;

      if(item.weight != null) {
        if(item.currWeight < item.weight * 0.3) {
          runningLow += 1;
          alreadyCounted = true;
          // console.log("WEIGHT RUNNING LOW");
        }
      }
      if(item.quantity != null && !alreadyCounted) {
        if(item.quantity <= 2 || item.quantity < item.origQuantity * 0.3) {
          runningLow += 1;
          // console.log("QUANTITY RUNNING LOW");
        }
      }
    });
    console.log("RL: " + runningLow)
    if(!pantryData.data.getPantry.notifPending && (itemsExpiring > 0 || runningLow > 0)) {
      console.log("Scheduling notification");

      const newestPantryData = await API.graphql(
        graphqlOperation(getPantry, { id: user.username.toString() })
      );

      const curr_time = Date.now();

      let test = "" + curr_time;

      // console.log("curr_time: " + test);

      const pantryInput = {
        id: user.username.toString(),
        notifPending: true,
        notifTime: test,
      };

      const old_time = newestPantryData.data.getPantry.notifTime
      // console.log("OLD: " + old_time + " NEW: " + test);

      if(parseInt(old_time) + 1000 < curr_time) { // The purpose here is to prevent the user from getting multiple notifications at once
        
        const p = await API.graphql(graphqlOperation(updatePantry, {input: pantryInput}))
        // console.log("NEW TIME: " + test);
        // console.log("ADDING");
        // console.log("Scheduling notification");
        // console.log(newestPantryData.data.getPantry.notifTime + ' ' + curr_time);

        if(itemsExpiring > 0 && runningLow <= 0) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "SMART PANTRY",
              body: 'You have ' + itemsExpiring + ' item(s) expiring soon! Click here to view them.',
              data: { data: 'View home menu' },
            },
            trigger: { seconds: pantryData.data.getPantry.notiffreq },
          });
        }
        else if(itemsExpiring <= 0 && runningLow > 0) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "SMART PANTRY",
              body: 'You have ' + runningLow + ' item(s) running low! Click here to view them.',
              data: { data: 'View home menu' },
            },
            trigger: { seconds: pantryData.data.getPantry.notiffreq },
          });
        }
        else {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "SMART PANTRY",
              body: 'You have ' + itemsExpiring + ' item(s) expiring soon and ' + runningLow + ' item(s) running low! Click here to view them.',
              data: { data: 'View home menu' },
            },
            trigger: { seconds: pantryData.data.getPantry.notiffreq },
          });
        }
      }
    }
  }
}

export default HomeStackScreen;
