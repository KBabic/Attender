import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addEventName, addStartDate, addEndDate, addEventCountry, addEventCity, addEventCurrency, addEventFee } from '../actions/GeneralActions'
import { updateEvent } from '../actions/EventActions'
import InputOption from '../components/InputOption'
import Calendar from '../components/Calendar'
import { eventDetails } from '../utils/eventDetails'
import { marginTopBottom } from '../utils/colorsAndMargins'
import CurrenciesAndMonths from '../components/CurrenciesAndMonths'

class EventPage extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         renderCalendar: false,
         showModal: false,
         showCurrencies: false
      }
      this.calendarModal = ""
   }
   componentDidMount() {
      console.log(this.props.currentEvent)
   }
   componentDidUpdate() {
      console.log(this.props.currentEvent)
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
      this.setState({ showCurrencies: true })
   }
   handleOK = () => {
      this.setState({ showCurrencies: false })
      this.props.updateEvent(this.props.currentEvent)
   }
   handleCloseCalendar = () => {
      this.setState({
         renderCalendar: false,
         showModal: false
      })
      this.props.updateEvent(this.props.currentEvent)
   }
   handleChooseCurrency = (cur) => {
      this.props.addEventCurrency(cur)
   }
   onDateChange = (date) => {
      const plainDate = date.format().slice(0,10)
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
   onSubmitEdit = () => {
      this.props.updateEvent(this.props.currentEvent)
   }
   render() {
      const { container } = eventPageStyles
      return (
         <ScrollView style={container}>
            {this.state.showCurrencies && 
               <CurrenciesAndMonths 
                  showCurrencies={true}
                  showMonths={false} 
                  handleOK={this.handleOK}
                  chooseMonthOrCurrency={this.handleChooseCurrency}
               />}
            {eventDetails.map((item, index) => {
               return (
                  <InputOption 
                     placeholder={item.placeholder}
                     icon={item.icon}
                     text={item.text}
                     value={this.props.currentEvent.general[item.name].toString()}
                     onChangeText={(txt) => this.handleChangeInput(txt, item)}
                     onSubmitEditing={this.onSubmitEdit.bind(this)}
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
               handleOK={this.handleCloseCalendar.bind(this)}
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
   currentEvent: state.currentEvent
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
      },
      updateEvent: (event) => {
         dispatch(updateEvent(event))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventPage)