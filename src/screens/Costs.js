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
               return (
                  <InputOption 
                     placeholder={item.placeholder}
                     icon={item.icon}
                     text={item.name}
                     key={item.id}
                     onPress={this.chooseCurrency}
                     editable={item.editable}
                     defaultValue={this.props.eventFee}
                  />
               )
            })}
         </ScrollView>
      )
   }
}
const mapStateToProps = state => ({
   eventFee: state.event.eventFee
})
export default connect(mapStateToProps)(Costs)
const costsStyles = StyleSheet.create({
   container: {
      flex: 1,
      marginBottom: marginTopBottom
   }
})