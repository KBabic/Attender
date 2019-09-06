import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { primaryColor, secondaryColor, marginLeftRight, marginTopBottom, inputWidth } from '../utils/colorsAndMargins'

const UnfoldOption = React.memo(props => {
   const { unfoldContainerStyle, unfoldLabelStyle, unfoldTextStyle, unfoldViewStyle } = unfoldStyles
   const { unfoldTitle, value, onIncrease, onDecrease, disabled } = props
   const opacity = disabled ? 0.7 : 1
   return (
   <View style={[unfoldContainerStyle, {opacity}]}>
      <Text style={unfoldLabelStyle}>{unfoldTitle}</Text>
      <View style={unfoldViewStyle}>
         <Text style={unfoldTextStyle}>{value}</Text>
         <View>
            <TouchableOpacity style={{flexDirection:'column'}} onPress={onIncrease} disabled={disabled}>
               <Icon 
                  name="keyboard-arrow-up"
                  size={25}
                  color={primaryColor}
               />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDecrease} disabled={disabled}>
               <Icon 
                  name="keyboard-arrow-down"
                  size={25}
                  color={primaryColor}
               />
            </TouchableOpacity>
         </View>
      </View>
   </View>
   )
})
unfoldStyles = StyleSheet.create({
   unfoldContainerStyle : {
      marginLeft: marginLeftRight,
      marginRight: marginLeftRight,
      marginTop: marginTopBottom,
   },
   unfoldLabelStyle: {
      fontSize: 18,
      color: primaryColor,
      textAlign: 'left',
      marginBottom: 5,
      marginLeft: 10
   },
   unfoldViewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: inputWidth,
      borderColor: secondaryColor,
      borderWidth: 1,
      borderRadius: 15,
   },
   unfoldTextStyle: {
      fontSize: 18,
      color: primaryColor,
      textAlign: 'left',
      marginLeft: 5
   }
})
export default UnfoldOption