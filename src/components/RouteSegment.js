import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { primaryColor, secondaryColor } from '../utils/colorsAndMargins'

const segmentHeight = Dimensions.get('window').height / 3.5
const connectorHeight = Dimensions.get('window').height / 8

const RouteSegment = props => {
   const { segment, renderConnector } = props
   getTransitTime = () => {
      const { transitTime, vehicle } = segment
      if (transitTime) {
         return `${transitTime} by ${vehicle}`
      }
   }
   getPriceRange = () => {
      const { minPrice, maxPrice, currency } = segment
      if (minPrice && maxPrice && currency) {
         return `${currency} ${minPrice}-${maxPrice}`
      }
   }
   getLines = () => {
      const { lines } = segment
      if (lines) {
         return lines.join(" ")
      }
   }
   //routeSegment: {id, depPlace, arrPlace, vehicle, icon, transitTime, transferTime, price, minPrice, maxPrice, currency, lines}
   const { depPlace, arrPlace, icon } = segment
   const { container, iconContainer, imageSegment, imageConnector, largeText, smallText, textContainer } = segmentStyles
   return (
      <View>
         <View style={container}>
            <View style={iconContainer}>
            <Icon name={icon} size={40} color={secondaryColor}/>
            </View>

            <Image
               source={require('../assets/segment.png')}
               style={imageSegment}
               resizeMode='contain'
            />
            
            <View style={textContainer}>
               <Text style={largeText}>{depPlace}</Text>

               <View style={{justifyContent: 'space-around'}}>
                  <Text style={smallText}>{getTransitTime()}</Text>
                  <Text style={smallText}>{getLines()}</Text>
                  <Text style={smallText}>{getPriceRange()}</Text>
               </View>

               <Text style={largeText}>{arrPlace}</Text>
            </View>
         </View>
         {renderConnector && (
            <View style={[container,{height: connectorHeight, marginTop: 10, marginBottom: 10 }]}>
            <View style={iconContainer} />
            <Image 
               source={require('../assets/connector.png')}
               style={imageConnector}
               resizeMode='contain'
            />
            <View style={textContainer} />
         </View>
         )}
      </View>
   )
}
const segmentStyles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: segmentHeight,
      width: Dimensions.get('window').width * 0.7,
   },
   iconContainer: {
      height: segmentHeight,
      justifyContent: 'center',
      alignItems: 'center',
      width: (Dimensions.get('window').width * 0.7) / 5
   },
   imageSegment: {
      height: segmentHeight,
      width: 50,
   },
   imageConnector: {
      height: connectorHeight,
      width: 50,
   },
   textContainer: {
      height: segmentHeight,
      flex: 1,
      justifyContent: 'space-between'
   },
   largeText: {
      fontSize: 20,
      color: primaryColor
   },
   smallText: {
      fontSize: 16,
      color: primaryColor
   }
})
export default RouteSegment