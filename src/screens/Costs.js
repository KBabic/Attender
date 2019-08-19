import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { chooseCurrency } from '../actions/CostsActions'
import { updateEvent } from '../actions/EventActions'
import InputOption from '../components/InputOption'
import CurrenciesAndMonths from '../components/CurrenciesAndMonths'
import { costsDetails } from '../utils/costsDetails'
import { marginTopBottom } from '../utils/colorsAndMargins'

class Costs extends React.Component {
   state = {
      showCurrencies: false
   }
   handleOK = () => {
      this.setState({ showCurrencies: false })
      this.props.updateEvent(this.props.currentEvent)
   }
   handleChooseCurrency = (cur) => {
      this.props.chooseCurrency(cur)
      this.props.updateEvent(this.props.currentEvent)
   }
   render() {
      const { container } = costsStyles
      return (
         <ScrollView style={container}>
            {this.state.showCurrencies && 
               <CurrenciesAndMonths
                  showCurrencies={true}
                  showMonths={false} 
                  handleOK={this.handleOK}
                  chooseMonthOrCurrency={this.handleChooseCurrency}
               />}
            {costsDetails.map((item) => {
               return (
                  <InputOption 
                     placeholder={item.placeholder}
                     icon={item.icon}
                     text={item.name}
                     key={item.id}
                     onPress={() => this.setState({ showCurrencies: true })}
                     editable={item.editable}
                     value={this.props[item.value].toString()}
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
   currentEvent: state.currentEvent,
   chosenCurrency: state.currentEvent.costs.chosenCurrency,
   transportCosts: state.currentEvent.costs.avgTransportCost,
   accommodationCosts: state.currentEvent.costs.avgAccommCost,
   eventFee: state.currentEvent.costs.calculatedFee,
   addCosts: state.currentEvent.costs.additionalCosts,
   estTotalCosts: state.currentEvent.costs.calculatedTotalCosts
})
const mapDispatchToProps = dispatch => {
   return {
      chooseCurrency: (cur) => {
         dispatch(chooseCurrency(cur))
      },
      updateEvent: (event) => {
         dispatch(updateEvent(event))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Costs)