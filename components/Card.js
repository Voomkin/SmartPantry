
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Flex, useTheme } from 'native-base'

import ClockSVG from '../assets/svgs/clock.svg'

// Apply conditional render to the SVG for different cards

// ClockSVG style={styles.svgCenter} width='50%' height='50%' color='red'/>

const Card = (props) => {

  const {
    colors,
    fonts
  } = useTheme()

  return (
    <View style={styles.container} backgroundColor='white'>
      <Flex width='80%' direction='row' alignItems='center' justify='center'>
        <Flex style={styles.cardFlex_left} >
          <ClockSVG color='white' />
        </Flex>
        <Flex style={styles.cardFlex_right}> 
          <Text>Oreo Cookies</Text> 
          <Text>1 lb</Text>
        </Flex>
      </Flex> 
    </View>
  )
}

const styles = StyleSheet.create({
  cardFlex_left: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  cardFlex_right: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
  },
  svgCenter: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5, 
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0
    },
    borderRadius: 10,
  },
})


export default Card