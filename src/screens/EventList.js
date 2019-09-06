import React from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, FlatList } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { connect } from 'react-redux'
import { newEventButtonPressed, existingEventOpened } from '../actions/EventActions'
import { totalMonthlyCostsCalculated, avgMonthlyCostsCalculated } from '../actions/OverviewActions'
import CostOverview from '../components/CostOverview'
import Button from '../components/Button'
import EventListItem from '../components/EventListItem'
import { primaryColor } from '../utils/colorsAndMargins'
import getDotValues from '../utils/getDotValues'

const keyExtractor = ({ general: {id }}) => id.toString()

class EventList extends React.PureComponent {
   static navigationOptions = ({ navigation }) => {
      return {
         header: () => null
      }
   }
   componentDidUpdate(prevProps) {
      const { isFocused, events, selected, month, currency, totalMonthlyCostsCalculated, avgMonthlyCostsCalculated } = this.props
      if (!prevProps.isFocused && isFocused) {
         if (currency) {
            avgMonthlyCostsCalculated(events, selected, currency)
            if (month) {
               totalMonthlyCostsCalculated(events, selected, month, currency)
            }
         }
      }   
   }
   renderEvent = ({item}) => {
      const { general: {id, eventName, startDate }} = item
      const {costs: {chosenCurrency, calculatedTotalCosts}} = item
      const dots = getDotValues(item)
      return (
         <EventListItem 
            id={id}
            name={eventName} 
            date={startDate}
            price={`${calculatedTotalCosts.toString()} ${chosenCurrency}`} 
            checked={true}
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
      const { container, messageText, buttonContainer } = eventListStyles
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
                  <CostOverview 
                     total={this.props.total}
                     cur={this.props.currency}
                     avg={this.props.avg}
                  />
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
   events: state.events,
   selected: state.selected,
   month: state.overview.month,
   currency: state.overview.currency,
   total: state.overview.costs,
   avg: state.avgMonthlyCosts.avg
})
const mapDispatchToProps = {
   newEventButtonPressed,
   existingEventOpened,
   totalMonthlyCostsCalculated,
   avgMonthlyCostsCalculated
}
export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(EventList))