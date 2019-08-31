import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { saveEvent, deleteEvent, updateEvent } from '../actions/EventActions'
import { primaryColor } from '../utils/colorsAndMargins'

class SaveDeleteEvent extends React.Component {
   constructor(props) {
      super(props)
      this.id = this.props.currentEvent.general.id
      this.state = {
         buttonText: Object.keys(this.props.events).includes(this.id.toString()) ? "DELETE EVENT" : "SAVE EVENT"
      }
   }
   handleButtonPress() {
      if (this.state.buttonText === "SAVE EVENT") {
         this.props.saveEvent(this.props.currentEvent)
         this.props.updateEvent(this.props.currentEvent)
         this.setState({ buttonText: "DELETE EVENT"})
         Alert.alert('Save Event', 'Event is saved!', [{text: 'OK'}], {cancelable: true})

      } else if (this.state.buttonText === 'DELETE EVENT') {
         this.props.deleteEvent(this.props.currentEvent.general.id)
         Alert.alert('Delete Event', 'Event is deleted!', [{text: 'OK'}], {cancelable: true})
      }
   }
   render() {
      return (
         <TouchableOpacity onPress={() => this.handleButtonPress()}>
            <Text
               style={saveEventStyles.saveEvent}
            >{this.state.buttonText}</Text>
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
   events: state.events,
   currentEvent: state.currentEvent
})
const mapDispatchToProps = dispatch => {
   return {
      saveEvent: (event) => {
         dispatch(saveEvent(event))
      },
      deleteEvent: (event) => {
         dispatch(deleteEvent(event))
      },
      updateEvent: (event) => {
         dispatch(updateEvent(event))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(SaveDeleteEvent)