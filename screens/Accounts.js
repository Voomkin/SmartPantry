import { UserAgent } from "amazon-cognito-identity-js";
import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  ScrollView,
  Linking,
  StyleSheet
} from "react-native";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { updatePantry } from "../mutations";
import { getPantry, listPantries, listItems,getShoppingList } from "../queries";
import { Button, Input } from "react-native-elements";
import qs from 'qs';
import { deletePantry, deleteShoppingList, deleteItem } from "../mutations";


// Imports to be used if the QR code method is used for this part
// import ReactDOM from "react-dom";
// import QRCode from 'qrcode';


// ReactDOM.render(
//   <React.StrictMode>
//     <DisplayQRCode text="Enter String Here :)" />
//   </React.StrictMode>
// );

//This is the ID for one of my accounts (Kollin) used for testing functionality of collaborator accounts
const testID = "0350bfeb-7f0f-45b3-b699-3a6607446a12";


const addStringToDatabase = async (userToAdd) => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    const pantryData = await API.graphql(
      graphqlOperation(getPantry, { id: user.username.toString() })
    );

    if (pantryData.data.getPantry == null) {
      Alert.alert("Collaborator Error", "You must create a pantry before you can add a collaborator")
      return null;
    }

    const update = {
      id: user.username.toString(),
      collabId: userToAdd,
    }

    const u = await API.graphql(graphqlOperation(updatePantry, {input: update}));

    Alert.alert("Add Collaborator", "Successfully added collaborator \"" + userToAdd + "\". Would you like to send them an email to let them know?", [
      {
        text: "Yes",
        onPress: async () => {
          sendEmail(
            userToAdd,
               'SMART PANTRY Collaboration Notification',
            'I just added you as a collaborator to my pantry! This means that you can view my pantry on your account with the Smart Pantry app. Please email SmartPantryGerontech@gmail.com with any questions you may have!',
          { cc: 'SmartPantryGerontech@gmail.com' }
          ).then(() => {
            console.log('Message sent successfully!');
          });
        }
      },
      {
        text: "No",
        style: "cancel",
      }
    ])

  } catch(err) {
    console.log(err);
  }
}

const deleteUserPantry = async () => {
  try {
    console.log("DELTE")
    const user = await Auth.currentAuthenticatedUser();

    const pantryData = await API.graphql(
      graphqlOperation(getPantry, { id: user.username.toString() })
    );

      // if the getPantry query does not return a null value, sets pantry exists to true
      // otherwise sets it to false because they don't have a pantry yet
      if (pantryData.data.getPantry == null) {
        Alert.alert("Delete Pantry", "You do not have a pantry");
      }
      else {

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
      // alert(JSON.stringify(itemsList.data.listItems.items));
      const deleteAllItems = b.map( async (item) => {
        const deletionId = {
          id: item.id,
        };
        const delPantryItem = await API.graphql(graphqlOperation(deleteItem, { input: deletionId }));
      });

      const shoppingListData = await API.graphql(
        graphqlOperation(getShoppingList, { id: user.username.toString() })
      );

      const shoppingListId = shoppingListData.data.getShoppingList.id;

      const shoppingItemsList = await API.graphql(
        graphqlOperation(listItems, {
          filter: {
            shoppingListItemsId: {
              eq: shoppingListId.toString(),
            },
          },
        })
      );

      const c = shoppingItemsList.data.listItems.items;

      const deleteAllShoppingItems = c.map( async (item) => {
        const deletionId = {
          id: item.id,
        };
        const delPantryItem = await API.graphql(graphqlOperation(deleteItem, { input: deletionId }));
      });

      const delId = {
        id: user.username.toString()
      }

      const delPantry = await API.graphql(graphqlOperation(deletePantry, { input: delId }));

      const delShopping = await API.graphql(graphqlOperation(deleteShoppingList, { input: delId }));

      Alert.alert("Delete Pantry", "Your pantry and has been deleted");
    }

  } catch(err) {
    console.log(err);
  }
}

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


const AccountsScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPantryInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const [userText, setUserText] = useState("");
  const [pantryName, setPantryName] = useState("");
  const [pantryCreateDate, setpantryCreateDate] = useState("");
  const [pantryUpdateDate, setpantryUpdateDate] = useState("");
  var [pantrySize, setpantrySize] = useState();
  const [pantryID, setpantryID] = useState("");


  const getPantryInfo = async () => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        const pantryData = await API.graphql(
            graphqlOperation(getPantry, { id: user.username.toString() })
        );

        if (pantryData.data.getPantry == null) {
          setPantryExists(false);
      }
      else{
        setPantryName(pantryData.data.getPantry.name);
        setpantryCreateDate([pantryData.data.getPantry.createdAt.substring(5,10),'-',pantryData.data.getPantry.createdAt.substring(0,4)]);
        setpantryUpdateDate([pantryData.data.getPantry.createdAt.substring(5,10),'-',pantryData.data.getPantry.createdAt.substring(0,4)]);
        setpantryID(pantryData.data.getPantry.id);
        setPantryExists(true);
        const pantryId = pantryData.data.getPantry.id;

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

            let itemCount = 0;

            const countItems = b.map( async (item) => {
                itemCount += 1;
            });
        setpantrySize(itemCount);
          }
    } catch(err) {
        console.log("made it");
    }
}
  const [pantryExists, setPantryExists] = useState(false);
  const [createPantryButton, setCreatePantryButton] = useState(null);


  return (
    <ScrollView style={{backgroundColor: '#b5e48c'}}>
        {!pantryExists && <Text style={[styles.body]}>You must create a pantry before you make a shopping list.</Text>}

        {pantryExists && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_pantryName]}>Pantry Name</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View> 
        <Text style={{fontSize: 17, textAlign: 'center', margin: 10}}>{pantryName}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_createDate]}>Pantry Create Date</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View> 
        <Text style={{fontSize: 17, textAlign: 'center', margin: 10}}>{pantryCreateDate}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_updateDate]}>Pantry Last Update Date</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View> 
        <Text style={{fontSize: 17, textAlign: 'center', margin: 10}}>{pantryUpdateDate}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_size]}>Pantry Size</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View> 
        <Text style={{fontSize: 17, textAlign: 'center', margin: 10}}>{pantrySize}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_ID]}>Pantry ID</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View> 
        <Text style={{fontSize: 17, textAlign: 'center', margin: 10}}>{pantryID}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_addCollaborator]}>Add Collaborator to Your Pantry</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View> 
        <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>{'\n'}Add a collaborator to your pantry by inputting their email in the space below.
        Collaborators will be able to view the contents of your pantry, but can not modify it in any way.{'\n'}</Text>      
      
      <Input
        placeholder="Enter Collaborator Email"
        containerStyle={{ width: "100%" }}
        textAlign={'center'}
        onChangeText={(value) => setUserText(value)}
      />

      <Button buttonStyle={{ marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:90,
        marginRight:90,
        marginBottom: 50,
        backgroundColor:'#3D405B',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#ffffff' }}
        onPress={ async () => {
          Alert.alert("Add Collaborator", "Add collaborator with ID \"" + userText + "\" to your pantry? Doing so will remove your current collaborator if you have one.", [
            {
              text: "Yes",
              onPress: async () => {
                //NOTE: The userText field should be the ID of the user to add. Want to implement a QR code generator/scanner
                //to make this process seamless and not tedious.
                await addStringToDatabase(userText);
              }
            },
            {
              text: "No",
              style: "cancel",
            }
          ])
        }}
        title="Add Collaborator to Pantry"
        color="orange"
        accessibilityLabel="Click here to add this collaborator to your pantry"

      
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View><Text style={[styles.paddedHeading, styles.width_createDate]}>Delete Your Pantry</Text></View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      <Text style={{fontSize: 17, textAlign: 'center', marginHorizontal: 15}}>Click the below button to delete your pantry.{'\n'}</Text>  

      <Button buttonStyle={{ marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:145,
        marginRight:145,
        marginBottom: 50,
        backgroundColor:'#3D405B',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#ffffff' }}
        onPress={ async () => {
          Alert.alert("Delete Pantry", "Would you like to delete your pantry? This will also delete your Shopping List.", [
            {
              text: "Yes",
              onPress: async () => {
                await deleteUserPantry();
              }
            },
            {
              text: "No",
              style: "cancel",
            }
          ])
          }}
        
        title="Delete Pantry"
        color="orange"
        accessibilityLabel="Click here to delete your pantry"

      
      />
      </View>
        )}

      {/* <Button
        onPress={ async () => {
            // Alert.alert("View Other Pantry", "This will take you to view another user's pantry, assuming you have access");
            viewOtherPantry();
        }}
        title="Click here to view another pantry"
        color="purple"
        accessibilityLabel="Click here to view another pantry"
      /> */}
    </ScrollView>
  );
};

export async function sendEmail(to, subject, body, options = {}) {
  const { cc, bcc } = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
  });

  if (query.length) {
      url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
      throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
}

const styles = StyleSheet.create({
  paddedHeading : {
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    margin: 20
  },
  body:{
    fontSize: 18,
    textAlign: 'center',
    margin: 75,
  },
  width_pantryName:{
      width: 125,
  },
  width_createDate:{
      width: 175,
  },
  width_updateDate:{
      width: 150,
  },
  width_ID:{
    width: 90,
  },
  width_addCollaborator:{
    width: 289,
  }
});



export default AccountsScreen;