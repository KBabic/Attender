import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { saveEvent } from '../actions/EventActions'
import { primaryColor } from '../utils/colorsAndMargins'

class SaveEvent extends React.Component {
   handleSaveEvent() {
      this.props.saveEvent(this.props.currentEvent)
      Alert.alert('Save Event', 'Event is saved!', [{text: 'OK'}], {cancelable: true})
   }
   render() {
      return (
         <TouchableOpacity onPress={() => this.handleSaveEvent()}>
            <Text
               style={saveEventStyles.saveEvent}
            >SAVE EVENT</Text>
        </TouchableOpacity> 
      )
   }
}
const saveEventStyles = StyleSheet.create({
   saveEvent: {
      paddingRight: 20,
      color: primaryColor,
      fontSize: 18,
      fontWeight: 'bold'
   }
})
const mapStateToProps = state => ({
   currentEvent: state.currentEvent
})
const mapDispatchToProps = dispatch => {
   return {
      saveEvent: (event) => {
         dispatch(saveEvent(event))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(SaveEvent)