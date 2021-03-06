import React from 'react'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import { updateEvent } from '../actions/EventActions'
import { addNotes } from '../actions/NotesActions'
import { View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { primaryColor, secondaryColor } from '../utils/colorsAndMargins'

class Notes extends React.PureComponent {
   componentDidUpdate(prevProps, prevState) {
      if (this.props.currentEvent !== prevProps.currentEvent) {
         this.props.updateEvent(this.props.currentEvent)
      }
   }
   handleChangeText = txt => {
      this.props.addNotes(txt)
   }
   handleWillFocus() {
      const { navigation, currentEvent } = this.props
      navigation.setParams({ 
         title:   currentEvent.general.eventName.length <= 16 ?
                  currentEvent.general.eventName :
                  currentEvent.general.eventName.slice(0,17) + "..."
      })
   }
   render() {
      const { container, text } = notesStyles
      return (
         <View style={container}>
            <NavigationEvents onWillFocus={() => this.handleWillFocus()}/>
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
const mapDispatchToProps =  {
   addNotes,
   updateEvent
}
export default connect(mapStateToProps, mapDispatchToProps)(Notes)