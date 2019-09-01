import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { chooseMonth, chooseOverviewCurrency } from '../actions/OverviewActions'
import InputOption from './InputOption'
import CurrenciesAndMonths from './CurrenciesAndMonths'
import { primaryColor, secondaryColor, placeholderColor, inputHeight, marginLeftRight, marginTopBottom } from '../utils/colorsAndMargins'

class CostOverview extends React.Component {
   state = {
      showMonths: false,
      showCurrencies: false
   }
   handleChooseCurrency = (cur) => {
      this.props.chooseOverviewCurrency(cur)
   }
   handleChooseMonth = (month) => {
      this.props.chooseMonth(month)
   }
   handleOK = () => {
      this.setState({ showCurrencies: false, showMonths: false })
   }
   render() {
      const { container, innerContainer, label, eurAmount, bottomLine, middleLine } = costOverviewStyles
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
               <Text style={eurAmount}>0 EUR</Text>
            </View>
            <View style={middleLine}></View>
            <View style={innerContainer}>
               <Text style={label}>Average monthly costs</Text>
               <Text style={eurAmount}>0 EUR</Text>
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
   },
   eurAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: placeholderColor
   }
})
const mapStateToProps = state => ({
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
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(CostOverview)