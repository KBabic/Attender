import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { primaryColor, secondaryColor, tabColor, inputWidth, marginLeftRight } from '../utils/colorsAndMargins'
import { modes, getRouteSegments } from '../utils/transportData'

export default class ListItem extends React.PureComponent {
   constructor(props) {
      super(props)
      this.routeSegments = []
      this.hotel = {}
   }
   navigateToTransport() {
      const { places, vehicles, segments, navigation, totalTime, totalPrice, currency, id } = this.props
      this.routeSegments = getRouteSegments(segments, places, vehicles, modes)
      navigation.navigate('TransportDetails', { routeSegments: this.routeSegments, totalTime, totalPrice, currency, id })
   }
   navigateToAccommodation () {
      const { navigation, properties, item } = this.props
      navigation.navigate('AccommodationDetails', { item, properties })
   }
   formatAccommodationText = str => {
      if (str.length >= 20) {
         return str.slice(0,19) + "..."
      } else {
         return str
      }
   }
   render() {
      const { id, text1, text2, icons, navigation, selected } = this.props
      const { container, iconContainer, text, textContainer1, textContainer2 } = listItemStyles
      let backgroundColor
      if (selected) {
         backgroundColor = tabColor
      } else {
         backgroundColor = "#ffffff"
      }
      if (icons) {
         // return transport option
         return (
            <View style={[container, {backgroundColor}]}>
               <View style={iconContainer}>
                  {icons.map((icon, index) => (
                     <TouchableOpacity
                        key={index} 
                        onPress={() => this.navigateToTransport()}
                     >
                        <Icon
                           name={icon}
                           size={40}
                           color={primaryColor}
                        />
                     </TouchableOpacity>
                  ))}
               </View>
               <View style={textContainer1}>
                  <Text style={text}>{text1}</Text>
               </View>
               <View style={textContainer2}>
                  <Text style={text}>{text2}</Text>
               </View>
            </View>
         )
      } else {
         // return accommodation option
         return (
            <View style={[container, {backgroundColor}]}>
               <Text style={[text, { marginLeft: 15}]}>{this.formatAccommodationText(text1)}</Text>
               <TouchableOpacity
                  onPress={() => this.navigateToAccommodation()}
               >
                  <Text style={[text, { marginRight: 15}]}>{text2}</Text>
               </TouchableOpacity>   
            </View>
         )
      }
   }
}

const listItemStyles = StyleSheet.create({
   container: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: secondaryColor,
      borderWidth: 1,
      borderRadius: 15,
      width: inputWidth,
      height: 60,
      marginTop: 20
   },
   iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: inputWidth / 3
   },
   textContainer1: {
      width: inputWidth / 3,
   },
   textContainer2: {
      width: inputWidth / 3,
      marginRight: marginLeftRight
   },
   text: {
      color: primaryColor,
      fontSize: 18,
   }
})