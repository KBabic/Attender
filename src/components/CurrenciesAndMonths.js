import React from 'react'
import { View, Text, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { primaryColor, inputWidth, inputHeight, marginTopBottom, tabColor } from '../utils/colorsAndMargins'
import currencies from '../utils/currencies'
import { monthsList } from '../utils/months'

const CurrenciesAndMonths = React.memo(props => {
   const { currencyMonthStyle, currencyMonthText, modal, modalOkButton, modalOkButtonText } = currenciesMonthsStyles
   const { chooseMonthOrCurrency, showCurrencies, showMonths, handleOK } = props
   renderCurrencyOrMonth = (el, index) => {
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
   return (
      <View style={{ flex: 1 }}>
      {(showCurrencies || showMonths) && (
         <Modal transparent={true}>
            <View style={modal}>
               <ScrollView>
                  {showCurrencies && currencies.map((cur, i) => renderCurrencyOrMonth(cur, i))}
                  {showMonths && monthsList.map((month, i) => renderCurrencyOrMonth(month, i))}
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
})
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
      backgroundColor: tabColor,
      height: (inputHeight - 100)/10,
      width: inputWidth,
      justifyContent: 'center'
   },
   modalOkButtonText: {
      color: primaryColor,
      fontSize: 26,
      alignSelf: 'center',
      fontWeight: 'bold'
   }
})
export default CurrenciesAndMonths