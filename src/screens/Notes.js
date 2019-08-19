import React from 'react'
import { connect } from 'react-redux'
import { updateEvent } from '../actions/EventActions'
import { addNotes } from '../actions/NotesActions'
import { View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { primaryColor, secondaryColor } from '../utils/colorsAndMargins'

class Notes extends React.Component {
   handleChangeText = txt => {
      this.props.addNotes(txt)
      this.props.updateEvent(this.props.currentEvent)
   }
   render() {
      const { container, text } = notesStyles
      return (
         <View style={container}>
            <ScrollView>
               <TextInput 
                  style={text} 
                  placeholder="Add important notes ..."
                  multiline={true}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  value={this.props.notes}
                  onChangeText={(txt) => this.handleChangeText(txt)}
               />
            </ScrollView>
         </View>
      )
   }
}
const notesStyles = StyleSheet.create({
   container: {
      flex: 1,
      borderColor: secondaryColor,
      borderWidth: 1,
      borderRadius: 15,
      margin: 20
   },
   text: {
      color: primaryColor,
      fontSize: 18
   }
})
const mapStateToProps = state => ({
   currentEvent: state.currentEvent,
   notes: state.currentEvent.notes.notes
})
const mapDispatchToProps = dispatch => {
   return {
      addNotes: (txt) => {
         dispatch(addNotes(txt))
      },
      updateEvent: (event) => {
         dispatch(updateEvent(event))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notes)