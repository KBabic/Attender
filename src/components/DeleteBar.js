import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { primaryColor, marginLeftRight } from '../utils/colorsAndMargins'

export default class DeleteBar extends React.Component {
   render() {
      return(
         <View style={deleteBarStyles.deleteBarContainer}>
            <CheckBox
               title="Select All"
               checked={false}
               checkedIcon="check-circle"
               uncheckedIcon="check-circle-o"
               checkedColor={primaryColor}
               uncheckedColor={primaryColor}
               containerStyle={deleteBarStyles.deleteOptionStyle}
               textStyle={deleteBarStyles.deleteBarText}
            />
            <Text style={deleteBarStyles.deleteBarText}>DELETE</Text>
         </View>
      )
   }
}
deleteBarStyles = StyleSheet.create({
   deleteBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: marginLeftRight,
      marginRight: marginLeftRight
   },
   deleteOptionStyle: {
      borderWidth: 0,
      backgroundColor: 'transparent',
   },
   deleteBarText: {
      color: primaryColor,
      fontSize: 20,
      fontWeight: 'normal'
   }
})