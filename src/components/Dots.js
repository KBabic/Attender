import React from 'react'
import { View, StyleSheet } from 'react-native'
import { primaryColor, secondaryColor } from '../utils/colorsAndMargins'

export default class Dot extends React.Component {
   render() {
      const { first, second, third, fourth } = this.props
      const dots = [first, second, third, fourth ]
      return (
         <View style={dotStyles.container}>
            {dots.map((dot, i) => {
               const dotStyle = { backgroundColor: "#ffffff"}
               if (dot) {
                  dotStyle.backgroundColor = secondaryColor
               }
               return (
                  <View key={i} style={[dotStyles.dot, dotStyle]}></View>
               )
            })}
         </View>
      )
   }
}

const dotStyles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   dot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      borderColor: primaryColor,
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10
   }
})