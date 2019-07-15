import React from 'react'
import { StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { primaryColor } from '../utils/colorsAndMargins'

export default class DeleteOption extends React.Component {
   render() {
      return (
         <CheckBox
            checked={true}
            checkedIcon="check-circle"
            uncheckedIcon="check-circle-o"
            checkedColor={primaryColor}
            uncheckedColor={primaryColor}
            containerStyle={deleteStyles.deleteContainerStyle}
         />
      )
   }
}
const deleteStyles = StyleSheet.create({
   deleteContainerStyle: {
      borderWidth: 0,
      backgroundColor: 'transparent',
   }
})