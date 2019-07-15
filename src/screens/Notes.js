import React from 'react'
import { View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { primaryColor, secondaryColor } from '../utils/colorsAndMargins'

export default class Notes extends React.Component {
   
   render() {
      const { container, text } = notesStyles
      return (
         <View style={container}>
            <ScrollView>
               <TextInput 
                  style={text} 
                  placeholder="Add important notes ..."
                  multiline={true}
                  autoCorrect={false}
               />
            </ScrollView>
         </View>
      )
   }
}
const notesStyles = StyleSheet.create({
   container: {
      flex: 1,
      borderColor: secondaryColor,
      borderWidth: 1,
      borderRadius: 15,
      margin: 20
   },
   text: {
      color: primaryColor,
      fontSize: 18
   }
})