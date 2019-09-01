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
      showCurrencies: false,
      currency: "",
      addCostsEnabled: false
   }
   componentDidUpdate(prevProps, prevState) {
      if (this.props.currentEvent !== prevProps.currentEvent) {
         this.props.updateEvent(this.props.currentEvent)
      }
   }
   async handleOnWillFocus() {
      const { transpCurrency, transportCostsCalculated, accommCurrency, accommodationCostsCalculated,
         eventCurrency, eventFeeCalculated, currentEvent, chosenCurrency, updateEvent, navigation } = this.props
      // if transport/accommodation costs/eventFee change in the meantime in other screens, recalculation needs to happen:
      if (chosenCurrency !== "") {
         this.setState({addCostsEnabled: true})
         if (currentEvent.transport.transportCosts !== "") {
            await this.handleRecalculation(transpCurrency, chosenCurrency, transportCostsCalculated, currentEvent.transport.transportCosts )
         }
         if (currentEvent.accommodation.accommodationCosts !== "") {
            await this.handleRecalculation(accommCurrency, chosenCurrency, accommodationCostsCalculated, currentEvent.accommodation.accommodationCosts)
         }
         if (currentEvent.general.eventFee !== "") {
            await this.handleRecalculation(eventCurrency, chosenCurrency, eventFeeCalculated, currentEvent.general.eventFee)
         }
         updateEvent(currentEvent)
      }
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
            eventCurrency, eventFeeCalculated, currentEvent, addAdditionalCosts } = this.props
         await chooseCurrency(cur)
         this.setState({ addCostsEnabled: true })
         // call function to convert transport costs
         if (currentEvent.transport.transportCosts !== "") {
            await this.handleRecalculation(transpCurrency, cur, transportCostsCalculated, currentEvent.transport.transportCosts )
         }
         // call function to convert accomm costs
         if (currentEvent.accommodation.accommodationCosts !== "") {
            await this.handleRecalculation(accommCurrency, cur, accommodationCostsCalculated, currentEvent.accommodation.accommodationCosts)
         }
         // call function to convert event fee
         if (currentEvent.general.eventFee !== "") {
            await this.handleRecalculation(eventCurrency, cur, eventFeeCalculated, parseFloat(currentEvent.general.eventFee))
         }
         //call function to convert additional costs
         if (currentEvent.costs.additionalCosts !== "") {
            await this.handleRecalculation(this.state.currency, cur, addAdditionalCosts, currentEvent.costs.additionalCosts)
         }
         this.setState({ currency: cur})
      } catch(e) {
         Alert.alert('Error','An error in coversion ocurred. Please try again later.',[{text: 'OK'}])
      }
   }
   onSubmitEdit = () => {
      const { updateEvent, currentEvent, addAdditionalCosts } = this.props
      // if additional costs are not a valid float or a valid integer:
      if (
         currentEvent.costs.additionalCosts !== "" &&
         !currentEvent.costs.additionalCosts.match(/^\d+\.\d+$/) &&
         !currentEvent.costs.additionalCosts.match(/^\+?(0|[1-9]\d*)$/)
      ) {
         addAdditionalCosts("")
         updateEvent(currentEvent)
         Alert.alert("Error", "Please enter Additional Costs as a number, using '.' for decimals.", [{text: 'OK'}])
      } else {
         updateEvent(currentEvent)
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
                     editable={item.value !== "additionalCosts" ? item.editable : this.state.addCostsEnabled}
                     value={this.props[item.value].toString()}
                     onChangeText={(txt) => this.props.addAdditionalCosts(txt)}
                     onSubmitEditing={this.onSubmitEdit.bind(this)}
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
   events: state.events,
   currentEvent: state.currentEvent,
   chosenCurrency: state.currentEvent.costs.chosenCurrency,
   transportCosts: state.currentEvent.costs.avgTransportCost,
   transpCurrency: state.currentEvent.transport.transpCurrency,
   accommodationCosts: state.currentEvent.costs.avgAccommCost,
   accommCurrency: state.currentEvent.accommodation.accommodationCurrency,
   eventFee: state.currentEvent.costs.calculatedFee,
   eventCurrency: state.currentEvent.general.eventCurrency,
   additionalCosts: state.currentEvent.costs.additionalCosts,
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