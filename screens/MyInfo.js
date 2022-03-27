import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";
import {Auth, API, graphqlOperation} from 'aws-amplify';


const fetchInfo = async () => {

    let email = "Unknown";
    // alert(email);
    try {
        const user = await Auth.currentAuthenticatedUser();
        // console.log(user);

        email = user.attributes.email;
        
    } catch (err) {
        console.log(err);
    }

    // alert(email);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>
                EMAIL
            </Text>
        </View>
    );
}

// fetchInfo()
//     .then((data) => { return data })
//     .then(() => { alert('2') })

const MyInfoScreen = ({ navigation }) => {
    // const returnVal = fetchInfo();
    // console.log(returnVal);

    // const user_email = returnVal.then((data) => { 
    //     const email = data.attributes.email ;
    //     return email;
    // })
    // fetchInfo();

    return (
        
        <View>{fetchInfo}</View>
    );
};

export default MyInfoScreen;