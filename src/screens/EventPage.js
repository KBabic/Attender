import React from 'react'
import { ScrollView, StyleSheet, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addEventName, addStartDate, addEndDate, addEventCountry, addEventCity, addEventCurrency, addEventFee, noEventFee } from '../actions/GeneralActions'
import { updateEvent } from '../actions/EventActions'
import InputOption from '../components/InputOption'
import CheckOption from '../components/CheckOption'
import Calendar from '../components/Calendar'
import { eventDetails } from '../utils/eventDetails'
import { marginTopBottom, inputWidth } from '../utils/colorsAndMargins'
import { getInitialDate } from '../utils/months'
import CurrenciesAndMonths from '../components/CurrenciesAndMonths'

class EventPage extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         renderCalendar: false,
         showModal: false,
         showCurrencies: false,
         feeDisabled: this.props.noFee
      }
      this.calendarModal = ""
      this.minDate = ""
   }
   static navigationOptions = ({ navigation }) => {
      return {
         title:   navigation.getParam('eventName').length <= 16 ?
                  navigation.getParam('eventName') :
                  (navigation.getParam('eventName').slice(0,17) + "...")
      }
   }
   componentDidUpdate(prevProps, prevState) {
      if (this.props.currentEvent !== prevProps.currentEvent) {
         this.props.updateEvent(this.props.currentEvent)
      }
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
      this.minDate = getInitialDate(this.calendarModal, this.props.startDate)
      
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
      if (this.props[item.action] === this.props.addEventName) {
         this.props.navigation.setParams({ 
            eventName: text.length <= 16 ? text : (text.slice(0,17) + "...")
         })
      }
   }
   onSubmitEdit = () => {
      const { updateEvent, currentEvent, addEventFee } = this.props
      updateEvent(currentEvent)
      // if eventFee is not a valid positive float or not a valid positive integer
      if (
         currentEvent.general.eventFee !== "" &&
         !currentEvent.general.eventFee.match(/^\d+\.\d+$/) &&
         !currentEvent.general.eventFee.match(/^\+?(0|[1-9]\d*)$/)
      ) {
         addEventFee("")
         updateEvent(currentEvent)
         Alert.alert("Error", "Please enter Fee Amount as a number, using '.' for decimals.", [{text: 'OK'}])
      }
   }
   handleCheck() {
      this.props.noEventFee()
      this.setState((prevState) => ({
         feeDisabled: !prevState.feeDisabled
      }))
   }
   render() {
      const { container, datesContainer } = eventPageStyles
      return (
         <ScrollView style={container}>
            {this.state.showCurrencies && 
               <CurrenciesAndMonths 
                  showCurrencies={true}
                  showMonths={false} 
                  handleOK={this.handleOK}
                  chooseMonthOrCurrency={this.handleChooseCurrency}
               />}
            {eventDetails.slice(0,1).map((item, index) => {
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
            <View style={datesContainer}>
               <InputOption
                  iconDisabled={false}
                  width={inputWidth/2}
                  value={this.props.startDate}
                  editable={false}
                  icon="date-range"
                  text="Start Date"
                  placeholder="YYYY-MM-DD"
                  onPress={() => this.handleIconPress({name:"startDate"})}
               />
               <InputOption 
                  iconDisabled={false}
                  width={inputWidth/2}
                  value={this.props.endDate}
                  editable={false}
                  icon="date-range"
                  text="End Date"
                  placeholder="YYYY-MM-DD"
                  onPress={() => this.handleIconPress({name:"endDate"})}
               />
            </View>
            {eventDetails.slice(3,5).map((item, index) => {
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
            <CheckOption
               checkTitle="There is no fee for this event"
               checked={this.props.noFee}
               onPress={() => this.handleCheck()}
            />
            {eventDetails.slice(5).map((item, index) => {
               return (
                  <InputOption 
                     iconDisabled={this.state.feeDisabled}
                     editable={!this.state.feeDisabled}
                     placeholder={item.placeholder}
                     icon={item.icon}
                     text={item.text}
                     value={this.props.currentEvent.general[item.name].toString()}
                     onChangeText={(txt) => this.handleChangeInput(txt, item)}
                     onSubmitEditing={this.onSubmitEdit.bind(this)}
                     key={index}
                     onPress={() => this.handleIconPress(item)}
                  />
               )
            })}
            <Calendar 
               renderCalendar={this.state.renderCalendar}
               showModal={this.state.showModal}
               onDateChange={this.onDateChange.bind(this)}
               handleOK={this.handleCloseCalendar.bind(this)}
               minDate={this.minDate}
               initialDate={this.minDate}
            />
         </ScrollView>
      )
   }
}
const eventPageStyles = StyleSheet.create({
   container: {
      flex: 1,
      marginBottom: marginTopBottom
   },
   datesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
   }
})
const mapStateToProps = state => ({
   currentEvent: state.currentEvent,
   startDate: state.currentEvent.general.startDate,
   endDate: state.currentEvent.general.endDate,
   noFee: state.currentEvent.general.noFee
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
      },
      noEventFee: () => {
         dispatch(noEventFee())
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventPage)