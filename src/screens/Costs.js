import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import InputOption from '../components/InputOption'
import { costsDetails } from '../utils/costsDetails'
import { marginTopBottom } from '../utils/colorsAndMargins'

class Costs extends React.Component {
   chooseCurrency() {
      console.log('Choose currency called')
   }
   render() {
      const { container } = costsStyles
      return (
         <ScrollView style={container}>
            {costsDetails.map((item) => {
               let value
               if (item.value !== "") {
                  value = this.props[item.value].toString()
               } else {
                  value = item.value
               }
               return (
                  <InputOption 
                     placeholder={item.placeholder}
                     icon={item.icon}
                     text={item.name}
                     key={item.id}
                     onPress={this.chooseCurrency}
                     editable={item.editable}
                     value={value}
                  />
               )
            })}
         </ScrollView>
      )
   }
}
const costsStyles = StyleSheet.create({
   container: {
      flex: 1,
      marginBottom: marginTopBottom
   }
})
const mapStateToProps = state => ({
   transportCosts: state.transport.transportCosts,
   accommodationCosts: state.accommodation.accommodationCosts,
   eventFee: state.event.eventFee
})
export default connect(mapStateToProps)(Costs)