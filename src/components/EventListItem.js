import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'
import { eventChecked, eventUnchecked } from '../actions/EventActions'
import { totalMonthlyCostsCalculated, avgMonthlyCostsCalculated } from '../actions/OverviewActions'
import CheckOption from './CheckOption'
import Dots from './Dots'
import { primaryColor, secondaryColor } from '../utils/colorsAndMargins'

class EventListItem extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         eventChecked: this.props.checked
      }
   }
   shouldComponentUpdate(nextProps, nextState) {
      if (this.props.isFocused && nextProps.isFocused) {
         return this.state.eventChecked !== nextState.eventChecked
      } else {
         return true
      }
   }
   componentDidUpdate(prevProps) {
      const { isFocused, events, selected, month, currency, totalMonthlyCostsCalculated, avgMonthlyCostsCalculated, id } = this.props
      if (isFocused) {
         if (currency) {
            console.log('id is ', id)
            console.log('avg will be called now')
            avgMonthlyCostsCalculated(events, selected, currency)
            if (month) {
               console.log('total will be called now')
               totalMonthlyCostsCalculated(events, selected, month, currency)
            }
         }
      }   
   }
   handleCheck = () => {
      const { id, eventChecked, eventUnchecked } = this.props
      this.setState(prevState => {
         if (prevState.eventChecked) {
            eventUnchecked(id)
         } else {
            eventChecked(id)
         }
         return {eventChecked: !prevState.eventChecked}
      })
   }
   render() {
      const { eventContainer, label, dotsContainer } = eventItemStyles
      const { name, date, price, handlePress, first, second, third, fourth } = this.props
      const displayName = name.length <= 16 ? name : (name.slice(0,17) + "...")
      return (
         <View style={{flexDirection: 'column'}}>
            <View style={eventContainer}>
               <TouchableOpacity onPress={handlePress}>
                  <Text style={label}>{displayName}</Text>
               </TouchableOpacity>
               <Text style={label}>{date}</Text>
            </View>
            <View style={dotsContainer}>
               <Dots 
                  first={first}
                  second={second}
                  third={third}
                  fourth={fourth}
               />
               <CheckOption 
                  checkTitle={price} 
                  checked={this.state.eventChecked} 
                  onPress={() => this.handleCheck()}
               />
            </View>
         </View>
      )
   }
}
const eventItemStyles = StyleSheet.create({
   eventContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 45,
      borderColor: secondaryColor,
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: "#FFFFFF"
   },
   label: {
      fontSize: 20,
      color: primaryColor,
      marginLeft: 10,
      marginRight: 10
   },
   dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   }
})
const mapStateToProps = state => ({
   events: state.events,
   selected: state.selected,
   month: state.overview.month,
   currency: state.overview.currency
})
const mapDispatchToProps = {
   eventChecked,
   eventUnchecked,
   totalMonthlyCostsCalculated,
   avgMonthlyCostsCalculated
}
export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(EventListItem))