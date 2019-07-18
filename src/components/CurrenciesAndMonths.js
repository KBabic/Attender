import React from 'react'
import { View, Text, Modal, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { primaryColor, secondaryColor, inputWidth } from '../utils/colorsAndMargins'
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
      const { modal, modalOkButtonText } = currenciesMonthsStyles
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
                        style={{ marginBottom: 20 }}
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
      backgroundColor: 'rgba(157,225,235,0.75)',
      width: inputWidth - 70,
      height: inputWidth - 20,
      alignSelf: 'center',
      marginTop: (Dimensions.get('window').height - inputWidth + 100) / 2
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
   modalOkButtonText: {
      color: secondaryColor,
      fontSize: 18,
      alignSelf: 'center',
      fontWeight: 'bold'
   }
})