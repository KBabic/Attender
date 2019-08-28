import React from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { newEventButtonPressed, existingEventOpened } from '../actions/EventActions'
import CostOverview from '../components/CostOverview'
import Button from '../components/Button'
import EventListItem from '../components/EventListItem'
import { primaryColor, marginTopBottom } from '../utils/colorsAndMargins'
import getDotValues from '../utils/getDotValues'

const keyExtractor = ({ general: {id }}) => id.toString()

class EventList extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         header: () => null
      }
   }
   renderEvent = ({item}) => {
      const { general: {eventName, startDate }} = item
      const {costs: {chosenCurrency, calculatedTotalCosts}} = item
      const dots = getDotValues(item)
      return (
         <EventListItem 
            name={eventName} 
            date={startDate}
            price={`${calculatedTotalCosts.toString()} ${chosenCurrency}`} 
            checked={false}
            handlePress={() => this.updateEvent(item)}
            first={dots[0]}
            second={dots[1]}
            third={dots[2]}
            fourth={dots[3]}  
         />
      )
   }
   updateEvent = (event) => {
      this.props.existingEventOpened(event)
      this.props.navigation.navigate('EventPage', {eventName: event.general.eventName})
   }
   newEventButtonPressed = () => {
      this.props.newEventButtonPressed()
      this.props.navigation.navigate('EventPage', {eventName: ""})
   }
   render() {
      const { container, messageContainer, messageText, buttonContainer } = eventListStyles
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
               <ScrollView style={{flex: 1}}>
                  {Object.values(this.props.events).length !== 0 && (
                     <FlatList
                        data={Object.values(this.props.events)}
                        renderItem={this.renderEvent}
                        keyExtractor={keyExtractor}
                        style={{margin: 10}}
                     />
                  )}
                  {Object.values(this.props.events).length === 0 && (
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