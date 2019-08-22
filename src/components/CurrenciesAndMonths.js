import React from 'react'
import { View, Text, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { primaryColor, inputWidth, inputHeight, marginTopBottom } from '../utils/colorsAndMargins'
import currencies from '../utils/currencies'
import monthsList from '../utils/months'

export default class CurrenciesAndMonths extends React.Component {
   renderCurrencyOrMonth = (el, index) => {
      const { currencyMonthStyle, currencyMonthText } = currenciesMonthsStyles
      const { chooseMonthOrCurrency } = this.props
      return (
         <TouchableOpacity 
            style={currencyMonthStyle} 
            key={index}
            onPress={() => chooseMonthOrCurrency(el)}
         >
            <Text style={currencyMonthText}>{el}</Text>
         </TouchableOpacity>
      )
   }
   render() {
      const { showCurrencies, showMonths, handleOK } = this.props
      const { modal, modalOkButton, modalOkButtonText } = currenciesMonthsStyles
      return (
         <View style={{ flex: 1 }}>
         {(showCurrencies || showMonths) && (
            <Modal transparent={true}>
               <View style={modal}>
                  <ScrollView>
                     {showCurrencies && currencies.map((cur, i) => this.renderCurrencyOrMonth(cur, i))}
                     {showMonths && monthsList.map((month, i) => this.renderCurrencyOrMonth(month, i))}
                  </ScrollView>
                  <TouchableOpacity 
                        onPress={handleOK}
                        style={modalOkButton}
                  >
                     <Text style={modalOkButtonText}>OK</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
         )}
         </View>
      )
   }
}
const currenciesMonthsStyles = StyleSheet.create({
   modal: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(217,217,217,0.65)',
      width: inputWidth,
      height: inputHeight - 100,
      alignSelf: 'center',
      marginTop: marginTopBottom + 40,
   },
   currencyMonthStyle: {
      paddingTop: 5,
      alignItems: 'center'
   },
   currencyMonthText: {
      paddingTop: 20,
      paddingBottom: 20,
      fontSize: 20,
      fontWeight: 'bold',
      color: primaryColor
   },
   modalOkButton: {
      height: 50,
      justifyContent: 'center',
      marginBottom: 20 
   },
   modalOkButtonText: {
      color: primaryColor,
      fontSize: 26,
      alignSelf: 'center',
      fontWeight: 'bold'
   }
})