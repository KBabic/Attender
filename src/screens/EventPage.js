import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addEventName, addStartDate, addEndDate, addEventCountry, addEventCity, addEventCurrency, addEventFee } from '../actions/EventPageActions'

import InputOption from '../components/InputOption'
import Calendar from '../components/Calendar'
import { eventDetails } from '../utils/eventDetails'
import { marginTopBottom } from '../utils/colorsAndMargins'

class EventPage extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         renderCalendar: false,
         showModal: false,
      }
      this.calendarModal = ""
   }
   
   handleIconPress = (item) => {
      if (item.name === "startDate" || item.name === "endDate") {
         this.pickDate(item.name)
      } else {
         this.pickCurrency()
      }
   }
   pickDate = (name) => {
      this.calendarModal = name
      this.setState((prevState) => ({ 
         renderCalendar: !prevState.renderCalendar,
         showModal: !prevState.showModal
      }))
   }
   pickCurrency = () => {
      console.log('Pick currency called')
   }
   onDateChange = (date) => {
      const plainDate = date.format().slice(0,10)
      console.log(plainDate)
      switch (this.calendarModal) {
         case "startDate":
            this.props.addStartDate(plainDate)
            break
         case "endDate":
            this.props.addEndDate(plainDate)
            break
      }
   }
   handleChangeInput = (text, item) => {
      this.props[item.action](text)
   }
   render() {
      const { container } = eventPageStyles
      return (
         <ScrollView style={container}>
            {eventDetails.map((item, index) => {
               return (
                  <InputOption 
                     placeholder={item.placeholder}
                     icon={item.icon}
                     text={item.text}
                     value={this.props[item.name]}
                     onChangeText={(txt) => this.handleChangeInput(txt, item)}
                     key={index}
                     onPress={() => this.handleIconPress(item)}
                     editable={item.editable}
                  />
               )
            })}
            <Calendar 
               renderCalendar={this.state.renderCalendar}
               showModal={this.state.showModal}
               onDateChange={this.onDateChange.bind(this)}
               handleOK={() => 
                  this.setState({
                     renderCalendar: false,
                     showModal: false
                  })}
            />
         </ScrollView>
      )
   }
}

const eventPageStyles = StyleSheet.create({
   container: {
      flex: 1,
      marginBottom: marginTopBottom
   }
})

const mapStateToProps = state => ({
   name: state.event.name,
   startDate: state.event.startDate,
   endDate: state.event.endDate,
   country: state.event.country,
   city: state.event.city,
   eventCurrency: state.event.eventCurrency,
   eventFee: state.event.eventFee
})
const mapDispatchToProps = dispatch => {
   return {
      addEventName: (txt) => {
         dispatch(addEventName(txt))
      },
      addStartDate: (date) => {
         dispatch(addStartDate(date))
      },
      addEndDate: (date) => {
         dispatch(addEndDate(date))
      },
      addEventCountry: (txt) => {
         dispatch(addEventCountry(txt))
      },
      addEventCity: (txt) => {
         dispatch(addEventCity(txt))
      },
      addEventCurrency: (txt) => {
         dispatch(addEventCurrency(txt))
      },
      addEventFee: (amount) => {
         dispatch(addEventFee(amount))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventPage)