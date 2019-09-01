import React from 'react'
import { StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { primaryColor } from '../utils/colorsAndMargins'

const CheckOption = props => {
   const { checkTitle, checked, onPress } = props
      return (
         <CheckBox
            iconRight
            checked={checked}
            onPress={onPress}
            title={checkTitle}
            checkedIcon="check-square-o"
            uncheckedIcon="square-o"
            checkedColor={primaryColor}
            uncheckedColor={primaryColor}
            textStyle={checkStyles.checkTextStyle}
            containerStyle={checkStyles.checkContainerStyle}
         />
      )
}
const checkStyles = StyleSheet.create({
   checkContainerStyle: {
      borderWidth: 0,
      backgroundColor: 'transparent',
      alignItems: 'center'
   },
   checkTextStyle: {
      fontSize: 18,
      fontWeight: 'normal',
      color: primaryColor
   }
})
export default CheckOption