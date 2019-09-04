import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
   handleCheck = () => {
      this.setState(prevState => ({
         eventChecked: !prevState.eventChecked
      }))
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

export default EventListItem