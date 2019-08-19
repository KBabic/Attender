import React from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { primaryColor, secondaryColor, placeholderColor, marginLeftRight, marginTopBottom, inputWidth } from '../utils/colorsAndMargins'

export default class InputOption extends React.Component {
   
   render() {
      const { inputContainerStyle, inputLabelStyle, inputViewStyle, inputTextStyle} = inputStyles
      const { icon, text, value, placeholder, onPress, editable, onChangeText, onSubmitEditing, defaultValue, iconDisabled } = this.props
      const opacity = iconDisabled ? 0.7 : 1
      return (
      <View 
         style={[inputContainerStyle, {opacity}]}
      >
         {text != "" && (
         <Text style={inputLabelStyle}>{text}</Text> )}
         <View style={inputViewStyle}>
            <TextInput
                  style={inputTextStyle}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderColor}
                  value={value}
                  defaultValue={defaultValue}
                  editable={editable}
                  onChangeText={onChangeText}
                  onSubmitEditing={onSubmitEditing}
            />
            <TouchableOpacity onPress={onPress} disabled={iconDisabled}>
               {icon !="" && (
                  <Icon 
                  name={icon}
                  size={40}
                  color={primaryColor}
                  />
               )} 
            </TouchableOpacity>
             
         </View>
      </View>
      )
   }
}
inputStyles = StyleSheet.create({
   inputContainerStyle : {
      marginLeft: marginLeftRight,
      marginRight: marginLeftRight,
      marginTop: marginTopBottom,
   },
   inputLabelStyle: {
      fontSize: 20,
      color: primaryColor,
      textAlign: 'left',
      marginBottom: 5,
      marginLeft: 10
   },
   inputViewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: inputWidth,
      borderColor: secondaryColor,
      borderWidth: 1,
      borderRadius: 15,
   },
   inputTextStyle: {
      fontSize: 20,
      color: primaryColor,
      textAlign: 'left',
      marginLeft: 5
   }
})