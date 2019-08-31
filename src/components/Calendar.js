import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import { primaryColor, buttonColor, tabColor } from '../utils/colorsAndMargins'

export default class Calendar extends React.Component {
   render() {
      const { renderCalendar, showModal, onDateChange, handleOK, minDate, initialDate } = this.props
      const { modal, calendar, modalOkButtonText } = calendarStyles
      return (
         <View style={{ flex: 1 }}>
         {(renderCalendar && showModal) && (
            <Modal transparent={true}>
               <View style={modal}>
                  <View style={calendar}>
                     <CalendarPicker 
                        onDateChange={onDateChange}
                        startFromMonday={true}
                        selectedDayColor={buttonColor}
                        selectedDayTextColor={primaryColor}
                        todayBackgroundColor={tabColor}
                        textStyle={{ color: primaryColor }}
                        previousTitle="<<"
                        nextTitle=">>"
                        minDate={minDate}
                        initialDate={initialDate}
                     />
                     <TouchableOpacity 
                        onPress={handleOK}
                        style={{ marginBottom: 5 }}
                     >
                        <Text style={modalOkButtonText}>OK</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>
         )}
         </View>
      )
   }
}
const calendarStyles = StyleSheet.create({
   modal: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
   },
   calendar: {
      backgroundColor: "#ffffff"
   },
   modalOkButtonText: {
      color: primaryColor,
      fontSize: 18,
      alignSelf: 'center',
      fontWeight: 'bold'
   }
})