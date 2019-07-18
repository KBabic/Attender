import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { chooseCurrency } from '../actions/CostsActions'
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
   }
   handleChooseCurrency = (cur) => {
      this.props.chooseCurrency(cur)
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
                     onPress={() => this.setState({ showCurrencies: true })}
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
   chosenCurrency: state.costs.chosenCurrency,
   transportCosts: state.transport.transportCosts,
   accommodationCosts: state.accommodation.accommodationCosts,
   eventFee: state.event.eventFee
})
const mapDispatchToProps = dispatch => {
   return {
      chooseCurrency: (cur) => {
         dispatch(chooseCurrency(cur))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Costs)