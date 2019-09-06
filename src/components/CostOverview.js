import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { chooseMonth, chooseOverviewCurrency, totalMonthlyCostsCalculated, avgMonthlyCostsCalculated } from '../actions/OverviewActions'
import InputOption from './InputOption'
import CurrenciesAndMonths from './CurrenciesAndMonths'
import { primaryColor, secondaryColor, inputHeight, marginLeftRight, marginTopBottom } from '../utils/colorsAndMargins'

class CostOverview extends React.PureComponent {
   state = {
      showMonths: false,
      showCurrencies: false
   }
   handleChooseCurrency = (cur) => {
      const { events, selected, overviewMonth, chooseOverviewCurrency, totalMonthlyCostsCalculated, avgMonthlyCostsCalculated } = this.props
      chooseOverviewCurrency(cur)
      avgMonthlyCostsCalculated(events, selected, cur)
      if (overviewMonth) {
         totalMonthlyCostsCalculated(events, selected, overviewMonth, cur)
      }
   }
   handleChooseMonth = (month) => {
      const { events, selected, overviewCurrency, chooseMonth, totalMonthlyCostsCalculated } = this.props
      chooseMonth(month)
      if (overviewCurrency) {
         totalMonthlyCostsCalculated(events, selected, month, overviewCurrency)
      }
   }
   handleOK = () => {
      this.setState({ showCurrencies: false, showMonths: false })
   }
   render() {
      const { container, innerContainer, label, bottomLine, middleLine } = costOverviewStyles
      const { total, cur, avg } = this.props
      return (
         <View style={container}>
            {this.state.showCurrencies && 
               <CurrenciesAndMonths
                  showCurrencies={true}
                  showMonths={false} 
                  handleOK={this.handleOK}
                  chooseMonthOrCurrency={this.handleChooseCurrency}
               />}
            {this.state.showMonths &&
               <CurrenciesAndMonths 
                  showCurrencies={false}
                  showMonths={true}
                  handleOK={this.handleOK}
                  chooseMonthOrCurrency={this.handleChooseMonth}
               />
            }   
            <InputOption
               margin={20} 
               icon="keyboard-arrow-down" 
               text="" 
               placeholder="Choose month" 
               onPress={() => this.setState({ showMonths: true})}
               value={this.props.overviewMonth ? this.props.overviewMonth.toString() : ""}
            />
            <InputOption
               margin={20} 
               icon="keyboard-arrow-down" 
               text="" 
               placeholder="Choose currency" 
               onPress={() => this.setState({ showCurrencies: true })}
               value={this.props.overviewCurrency ? this.props.overviewCurrency.toString() : ""}
            />
            <View style={innerContainer}>
               <Text style={label}>Total costs for a chosen month</Text>
               <Text style={label}>{`${total.toString()} ${cur}`}</Text>
            </View>
            <View style={middleLine}></View>
            <View style={innerContainer}>
               <Text style={label}>Average monthly costs</Text>
               <Text style={label}>{`${avg.toString()} ${cur}`}</Text>
            </View>
            <View style={bottomLine}></View>
         </View>
      )
   }
}
const costOverviewStyles = StyleSheet.create({
   container: {
      flex: 1,
      borderTopColor: secondaryColor,
      borderTopWidth: 3,
      marginTop: marginTopBottom + 10,
      marginBottom: (Dimensions.get('window').height - inputHeight + 60),
      backgroundColor: '#ffffff'
   },
   innerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: marginLeftRight,
      marginRight: marginLeftRight,
      marginTop: marginTopBottom + 10,
      backgroundColor: '#ffffff'
   },
   middleLine: {
      borderBottomColor: primaryColor,
      borderBottomWidth: 1,
      marginTop: marginTopBottom + 10
   },
   bottomLine: {
      borderBottomColor: secondaryColor,
      borderBottomWidth: 3,
      marginTop: marginTopBottom + 10
   },
   label: {
      color: primaryColor,
      fontSize: 16,
      fontWeight: 'bold',
   }
})
const mapStateToProps = state => ({
   events: state.events,
   selected: state.selected,
   overviewMonth: state.overview.month,
   overviewCurrency: state.overview.currency
})
const mapDispatchToProps = dispatch => {
   return {
      chooseMonth: (month) => {
         dispatch(chooseMonth(month))
      },
      chooseOverviewCurrency: (cur) => {
         dispatch(chooseOverviewCurrency(cur))
      },
      totalMonthlyCostsCalculated: (events, selected, month, currency) => {
         dispatch(totalMonthlyCostsCalculated(events, selected, month, currency))
      },
      avgMonthlyCostsCalculated: (events, selected,  currency) => {
         dispatch(avgMonthlyCostsCalculated(events, selected, currency))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(CostOverview)