import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { primaryColor, buttonColor, buttonMarginLeftRight, buttonMarginTopBottom } from '../utils/colorsAndMargins'

const Button = React.memo((props) => {
   const { buttonStyle, buttonTextStyle } = buttonStyles
   const { width, height, radius, fontSize, onPress, label, disabled } = props
   const customButtonStyle = {
      width: width,
      height: height,
      borderRadius: radius,
      opacity: disabled ? 0.6 : 1
   }
   const customTextStyle = {
      fontSize: fontSize
   }
   return (
      <TouchableOpacity 
         style={[buttonStyle, customButtonStyle]}
         onPress={onPress}
         disabled={disabled}
      >
         <Text style={[buttonTextStyle, customTextStyle]}>{label}</Text>
      </TouchableOpacity>
   )
})

buttonStyles = StyleSheet.create({
   buttonStyle: {
      backgroundColor: buttonColor,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: buttonMarginLeftRight,
      marginRight: buttonMarginLeftRight,
      marginTop: buttonMarginTopBottom
   },
   buttonTextStyle: {
      color: primaryColor,
      fontWeight: "normal"
   }
})
export default Button