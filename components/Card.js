
import { StyleSheet, Text } from 'react-native'
import React from 'react'

import { HStack, VStack, Box } from 'native-base'

import ClockSVG from '../assets/svgs/clock.svg'

// Apply conditional render to the SVG for different cards

// ClockSVG style={styles.svgCenter} width='50%' height='50%' color='red'/>

const Card = (props) => {
  return (
    <Box width='80%' height='50%' borderColor='black' borderWidth="1" borderRadius="md">
       
    </Box>
  )
}

const styles = StyleSheet.create({
    cardBox : {
        
    },
    svgCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Card