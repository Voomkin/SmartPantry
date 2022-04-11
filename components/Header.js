
import { View, StyleSheet } from 'react-native'
import React from 'react'

import { StatusBar, Box, HStack, IconButton, Text, Icon } from 'native-base'
import { Entypo } from '@native-base/icons'




// Test responsiveness later
const Header = (navigation) => {

  return (
    <View>
        <StatusBar style={hStyles.primaryColor} barStyle="light-content" />
        <Box safeAreaTop style={hStyles.primaryColor}  />
        <HStack style={hStyles.primaryColor} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <IconButton _icon={{ as: Entypo, name: "menu", color: "white" }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign:'center' }} color="white" fontSize="20" fontWeight="bold">Home</Text>
          </View>
          <View style={{ flex: 1, paddingRight: 10 }} />
        </HStack>
    </View>
  )
}

let hStyles = StyleSheet.create({
    primaryColor: {
        backgroundColor: "#002855",
    },
})

export default Header;