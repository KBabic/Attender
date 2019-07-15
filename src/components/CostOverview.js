import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import InputOption from './InputOption'
import Currencies from './Currencies'
import { primaryColor, secondaryColor, placeholderColor, inputHeight, marginLeftRight, marginTopBottom } from '../utils/colorsAndMargins'

export default class CostOverview extends React.Component {
   state = {
      showMonths: false,
      showCurrencies: false,
      currency: ""
   }
   render() {
      const { container, innerContainer, label, eurAmount, bottomLine, middleLine } = costOverviewStyles
      return (
         <View style={container}>
            {this.state.showCurrencies && 
               <Currencies 
                  showModal={true} 
                  handleOK={() => this.setState({ showCurrencies: false})}
               />}
            <InputOption icon="keyboard-arrow-down" text="" placeholder="Choose month" />
            <InputOption icon="keyboard-arrow-down" text="" placeholder="Choose currency" onPress={() => this.setState({ showCurrencies: true })}/>
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
      marginTop: marginTopBottom,
      marginBottom: (Dimensions.get('window').height - inputHeight + 60),
      backgroundColor: '#ffffff'
   },
   innerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: marginLeftRight,
      marginRight: marginLeftRight,
      marginTop: marginTopBottom,
      backgroundColor: '#ffffff'
   },
   middleLine: {
      borderBottomColor: primaryColor,
      borderBottomWidth: 1,
      marginTop: marginTopBottom
   },
   bottomLine: {
      borderBottomColor: secondaryColor,
      borderBottomWidth: 3,
      marginTop: marginTopBottom
   },
   label: {
      color: primaryColor,
      fontSize: 18,
      fontWeight: 'bold',
   },
   eurAmount: {
      fontSize: 20,
      fontWeight: 'bold',
      color: placeholderColor
   }
})