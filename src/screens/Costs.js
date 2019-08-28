import React from 'react'
import { ScrollView, StyleSheet, Alert } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import { chooseCurrency, transportCostsCalculated, accommodationCostsCalculated, addAdditionalCosts, eventFeeCalculated } from '../actions/CostsActions'
import { updateEvent } from '../actions/EventActions'
import InputOption from '../components/InputOption'
import CurrenciesAndMonths from '../components/CurrenciesAndMonths'
import { costsDetails } from '../utils/costsDetails'
import { convertCurrency } from '../utils/currencyData'
import { marginTopBottom } from '../utils/colorsAndMargins'

class Costs extends React.Component {
   state = {
      showCurrencies: false
   }
   async handleOnWillFocus() {
      if (this.props.chosenCurrency !== "") {
         await this.handleChooseCurrency(this.props.chosenCurrency)
      }
      const { navigation, currentEvent } = this.props
      navigation.setParams({ 
         title:   currentEvent.general.eventName.length <= 16 ?
                  currentEvent.general.eventName :
                  currentEvent.general.eventName.slice(0,17) + "..."
      })
   } 
   handleOK = () => {
      this.setState({ showCurrencies: false })
      this.props.updateEvent(this.props.currentEvent)
   }
   handleRecalculation = async (cur1, cur2, func, a) => {
      const { currentEvent, accommCurrency } = this.props
      if (cur1 === "") {
         func(0)
      } else {
         let factor 
         factor = await convertCurrency(cur1, cur2)
         if (cur1 === accommCurrency) {
            func(Math.round(a * factor / currentEvent.accommodation.numOfPersons))
         } else {
            func(Math.round(a * factor))
         }
      }
   }
   handleChooseCurrency = async (cur) => {
      try {
         const { 
            chooseCurrency, transpCurrency, transportCostsCalculated, accommCurrency, accommodationCostsCalculated,
            eventCurrency, eventFeeCalculated, currentEvent } = this.props
         await chooseCurrency(cur)
         // call function to convert transport costs
         await this.handleRecalculation(transpCurrency, cur, transportCostsCalculated, currentEvent.transport.transportCosts )
         // call function to convert accomm costs
         await this.handleRecalculation(accommCurrency, cur, accommodationCostsCalculated, currentEvent.accommodation.accommodationCosts)
          // call function to convert event fee
         await this.handleRecalculation(eventCurrency, cur, eventFeeCalculated, currentEvent.general.eventFee)
         // call function to convert additional costs
   
         this.props.updateEvent(this.props.currentEvent)
      } catch(e) {
         Alert.alert('Error','An error in coversion ocurred. Please try again later.',[{text: 'OK'}])
      }
   }
   render() {
      const { container } = costsStyles
      return (
         <ScrollView style={container}>
            <NavigationEvents onWillFocus={() => this.handleOnWillFocus()} />
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
                     onChangeText={(txt) => this.props.addAdditionalCosts(txt)}
                     onSubmitEditing={() => this.props.updateEvent(this.props.currentEvent)}
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
   transpCurrency: state.currentEvent.transport.transpCurrency,
   accommodationCosts: state.currentEvent.costs.avgAccommCost,
   accommCurrency: state.currentEvent.accommodation.accommodationCurrency,
   eventFee: state.currentEvent.costs.calculatedFee,
   eventCurrency: state.currentEvent.general.eventCurrency,
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
      },
      transportCostsCalculated: (cost) => {
         dispatch(transportCostsCalculated(cost))
      },
      accommodationCostsCalculated: (cost) => {
         dispatch(accommodationCostsCalculated(cost))
      },
      addAdditionalCosts: (cost) => {
         dispatch(addAdditionalCosts(cost))
      },
      eventFeeCalculated: (cost) => {
         dispatch(eventFeeCalculated(cost))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Costs)