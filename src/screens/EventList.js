import React from 'react'
import { View, StyleSheet, ScrollView, StatusBar, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { newEventButtonPressed, existingEventOpened } from '../actions/EventActions'
import CostOverview from '../components/CostOverview'
import Button from '../components/Button'
import EventListItem from '../components/EventListItem'
import { primaryColor } from '../utils/colorsAndMargins'
import getDotValues from '../utils/getDotValues'

const keyExtractor = ({ general: {id }}) => id.toString()

class EventList extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         header: () => null
      }
   }
   componentDidMount() {
      console.log(Object.values(this.props.events))
   }
   renderEvent = ({item}) => {
      const { general: {eventName, startDate, endDate, eventCountry, eventCity, eventCurrency, eventFee }} = item
      const {transport: {noTransport, transportCosts}} = item
      const {accommodation: {noAccommodation, accommodationCosts}} = item
      const {costs: {chosenCurrency, avgTransportCost, avgAccommCost, calculatedFee, additionalCosts, calculatedTotalCosts}} = item
      const firstDot = getDotValues([eventName, startDate, endDate, eventCountry, eventCity, eventCurrency, eventFee])
      const secondDot = getDotValues([transportCosts], noTransport)
      const thirdDot = getDotValues([accommodationCosts], noAccommodation)
      const fourthDot = getDotValues([chosenCurrency, avgTransportCost, avgAccommCost, calculatedFee, additionalCosts, calculatedTotalCosts])
      return (
         <EventListItem 
            name={eventName} 
            date={startDate}
            price={`${calculatedTotalCosts.toString()} ${chosenCurrency}`} 
            checked={false}
            handlePress={() => this.updateExistingEvent(item)}
            first={firstDot}
            second={secondDot}
            third={thirdDot}
            fourth={fourthDot}  
         />
      )
   }
   updateExistingEvent = (event) => {
      this.props.existingEventOpened(event)
      this.props.navigation.navigate('EventPage')
   }
   newEventButtonPressed = () => {
      this.props.newEventButtonPressed()
      this.props.navigation.navigate('EventPage')
   }
   render() {
      const { container, messageContainer, costsContainer, messageText, buttonContainer } = eventListStyles
         return (
            <View style={container}>
               <StatusBar backgroundColor={primaryColor}/>
               <View style={buttonContainer}>
                  <Button 
                     onPress={this.newEventButtonPressed.bind(this)}
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
                  {Object.values(this.props.events) !== [] && (
                     <FlatList
                        data={Object.values(this.props.events)}
                        renderItem={this.renderEvent}
                        keyExtractor={keyExtractor}
                        style={{margin: 10}}
                     />
                  )}
                  {Object.values(this.props.events) === [] && (
                  <Text style={messageText}>
                     You currently have no events planned
                  </Text>
                  )}
                  <View style={{height: 75,backgroundColor: "#FFFFFF"}}></View>
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
      flex: 1,
      justifyContent: 'center',
      zIndex: 1
   },
   messageText: {
      color: primaryColor, 
      fontSize: 20,
      textAlign: 'center'
   },
   costsContainer: {
      //flex: 1
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
const mapStateToProps = state => ({
   events: state.events
})
const mapDispatchToProps = dispatch => {
   return {
      newEventButtonPressed: () => {
         dispatch(newEventButtonPressed())
      },
      existingEventOpened: (event) => {
         dispatch(existingEventOpened(event))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventList)