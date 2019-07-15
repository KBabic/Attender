import React from 'react'
import { View, StyleSheet, ScrollView, StatusBar, Dimensions, FlatList } from 'react-native'
import CostOverview from '../components/CostOverview'
import Button from '../components/Button'
import EventListItem from '../components/EventListItem'
import { sampleEventList } from '../utils/sampleEventList'
import { primaryColor } from '../utils/colorsAndMargins'

const keyExtractor = ({ id }) => id.toString()

export default class EventList extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         header: () => null
      }
   }
   // when empty list:
   /*render() {
      const { container, messageContainer, costsContainer, messageText, buttonContainer } = eventListStyles
      return (
         <View style={container}>
            <StatusBar backgroundColor={primaryColor}/>
            <View style={messageContainer}>
               <Text style={messageText}>
                  You currently have no events planned
               </Text>
            </View>
            <View style={costsContainer}>
               <CostOverview />
            </View>
            <View style={buttonContainer}>
               <Button />
            </View>
         </View>
      )
   } */
   // when not empty list:
   renderEvent = ({ item: { name, startDate, totalCosts, currency, firstDot, secondDot, thirdDot, fourthDot } }) => (
      <EventListItem 
         name={name} 
         date={startDate}
         price={`${totalCosts.toString()} ${currency}`} 
         checked={false}
         handlePress={this.handlePress.bind(this)}
         first={firstDot}
         second={secondDot}
         third={thirdDot}
         fourth={fourthDot}  
      />
   )
   handlePress() {
      this.props.navigation.navigate('EventPage')
   }
   
   render() {
      const { container, messageContainer, costsContainer, messageText, buttonContainer } = eventListStyles
      return (
         <View style={container}>
            <StatusBar backgroundColor={primaryColor}/>
            <View style={buttonContainer}>
               <Button 
                  onPress={this.handlePress.bind(this)}
                  disabled={false}
                  label="+"
                  width={60}
                  height={60}
                  radius={30}
                  fontSize={30}
               />
            </View>
            <View style={{flex: 1}}>
               <CostOverview />
            </View>
            <ScrollView style={{flex: 1, marginTop:20}}>
               <FlatList
                  data={sampleEventList}
                  renderItem={this.renderEvent}
                  keyExtractor={keyExtractor}
                  style={{margin: 10}}
               />
            </ScrollView>
         </View>
      )
   }
}

const eventListStyles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 1,
   },
   messageContainer: {
      flex: 4,
      justifyContent: 'center'
   },
   messageText: {
      color: primaryColor, 
      fontSize: 20,
      textAlign: 'center'
   },
   costsContainer: {
      flex: 5
   },
   buttonContainer: {
      position: 'absolute', 
      zIndex: 2,
      top: Dimensions.get('window').height - 150,
      bottom: 20,
      left: Dimensions.get('window').width - 120,
      right: 20,
   }
})