import React from 'react'
import { View, Text, Modal, ScrollView, Dimensions, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { primaryColor, secondaryColor, buttonColor, tabColor, inputWidth, inputHeight } from '../utils/colorsAndMargins'
import currencies from '../utils/currencies'

export default class Currencies extends React.Component {
   renderCurrency = (currency, index) => {
      const { currencyStyle, currencyText } = currenciesStyles
      //const { onChooseCurrency } = this.props
      return (
         <TouchableOpacity 
            style={currencyStyle} 
            key={index}
         >
            <Text style={currencyText}>{currency}</Text>
         </TouchableOpacity>
      )
   }
   render() {
      const { showModal, handleOK } = this.props
      const { modal, modalOkButtonText } = currenciesStyles
      return (
         <View style={{ flex: 1 }}>
         {showModal && (
            <Modal transparent={true}>
               <View style={modal}>
                  <ScrollView>
                     {currencies.map((cur, i) => this.renderCurrency(cur, i))}
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
const currenciesStyles = StyleSheet.create({
   modal: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(157,225,235,0.75)',
      width: inputWidth - 80,
      height: inputWidth - 40,
      alignSelf: 'center',
      marginTop: (Dimensions.get('window').height - inputWidth + 100) / 2
   },
   currencyStyle: {
      paddingTop: 5,
      alignItems: 'center'
   },
   currencyText: {
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