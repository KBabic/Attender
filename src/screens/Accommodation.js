import React from 'react'
import { NavigationEvents } from 'react-navigation'
import { View, Text, Dimensions, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux'
import { noNeedAccommodation, increaseNumOfPersons, decreaseNumOfPersons, addCheckinDate, addCheckoutDate, searchingAccommodation, searchingMoreResults,
searchAccommodationSuccess, searchAccommodationFail, accommodationChosen, accommodationUnchosen, changeAccommDestination } from '../actions/AccommodationActions'
import { updateEvent } from '../actions/EventActions'
import InputOption from '../components/InputOption'
import CheckOption from '../components/CheckOption'
import UnfoldOption from '../components/UnfoldOption'
import Button from '../components/Button'
import Calendar from '../components/Calendar'
import ListItem from '../components/ListItem'
import { marginTopBottom, primaryColor, secondaryColor, inputWidth } from '../utils/colorsAndMargins'
import { getLocations, getDestId, getPropertiesList, getHotelsList, getSearchId } from '../utils/accommodationData'
import { getInitialDate } from '../utils/months'

const keyExtractor = ({ id }) => id.toString()
const checkIn = "checkIn"
const checkOut = "checkOut"

class Accommodation extends React.PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         renderCalendar: false,
         showModal: false,
         showList: (this.props.accommodationOptions.length === 0 ? false : true),
         buttonDisabled: this.props.noAccommodation,
         paramsDisabled: this.props.noAccommodation
      }
      this.offset = 0
      this.search_id = ""
      this.calendarModal = ""
      this.minDate = ""
   }
   componentDidUpdate(prevProps, prevState) {
      if (this.props.currentEvent !== prevProps.currentEvent) {
         this.props.updateEvent(this.props.currentEvent)
      }
   }
   handleOnWillFocus() {
      const { startDate, endDate, checkInDate, checkOutDate, addCheckinDate, addCheckoutDate, updateEvent, currentEvent } = this.props
      if (checkInDate === "" && checkOutDate === "") {
         if (startDate !== "" && endDate !== "") {
            addCheckinDate(startDate)
            addCheckoutDate(endDate)
            updateEvent(currentEvent)
         }
      }
      const { navigation } = this.props
      navigation.setParams({ 
         title:   currentEvent.general.eventName.length <= 16 ?
                  currentEvent.general.eventName :
                  currentEvent.general.eventName.slice(0,17) + "..."
      })
   }
   pickDate = (name) => {
      this.calendarModal = name
      this.minDate = getInitialDate(this.calendarModal, this.props.startDate, this.props.checkInDate)
      this.setState((prevState) => ({ 
         renderCalendar: !prevState.renderCalendar,
         showModal: !prevState.showModal
      }))
   }
   onDateChange = (date) => {
      const plainDate = date.format().slice(0,10)
      switch (this.calendarModal) {
         case checkIn:
            this.props.addCheckinDate(plainDate)
            break
         case checkOut:
            this.props.addCheckoutDate(plainDate)
            break
      }
   }
   handleCloseCalendar = () => {
      this.setState({
         renderCalendar: false,
         showModal: false
      })
      this.props.updateEvent(this.props.currentEvent)
   }
   searchAccommodation = async () => {
      this.props.updateEvent(this.props.currentEvent)
      const { destinationCity, numOfPersons, checkInDate, checkOutDate } = this.props
      let locations
      let dest_id
      let properties
      let hotelsList
      let search_id
      if (destinationCity === "") {
         this.props.searchAccommodationFail()
         Alert.alert('Error','Please specify destination city.',[{text: 'OK'}])
      } else {
         locations = await getLocations(destinationCity)
         if (locations.length === 0) {
            // destination is not resolved
            this.props.searchAccommodationFail()
            Alert.alert('Error','Please check if you correctly spelled destination city.',[{text: 'OK'}])
         } else {
            dest_id = getDestId(locations)
            if (checkInDate === "" || checkOutDate === "") {
               this.props.searchAccommodationFail()
               Alert.alert('Error','Please specify check-in and check-out dates.',[{text: 'OK'}])
            } else {
               try {
                  properties = await getPropertiesList(dest_id, this.offset, this.search_id, numOfPersons, checkInDate, checkOutDate)
                  hotelsList = getHotelsList(properties)
                  search_id = getSearchId(properties)
                  this.setState({ showList: true })
                  this.props.searchAccommodationSuccess([properties, hotelsList])
                  this.props.updateEvent(this.props.currentEvent)
                  this.offset = this.offset + 30
                  this.search_id = search_id
               } catch(e) {
                  this.props.searchAccommodationFail()
                  Alert.alert('Error','An unknown error happened. Please check your check-in and check-out dates and/or try again later.',[{text: 'OK'}]) 
               }
            }
         }
      }
   }
   handleFindAccommodation = () => {
      this.props.searchingAccommodation()
      this.searchAccommodation()
   }
   handleSeeMoreResults = () => {
      this.props.searchingMoreResults()
      this.searchAccommodation()
   }
   renderAccommodationOption = ({ item }) => {
      const { id, name, minPrice, currency } = item
      let selected
      if (id.toString() === this.props.chosenAccommOptionId.toString()) {
         selected = true
      } else {
         selected = false
      }
      return (
         <ListItem
            selected={selected}
            item={item} 
            text1={name} 
            text2={`${currency} ${minPrice}`} 
            navigation={this.props.navigation}
            id={id}
            properties={this.props.accommProperties}
      />
      )   
   }
   handleCheck = () => {
      this.props.noNeedAccommodation()
      this.setState((prevState) => ({
         buttonDisabled: !prevState.buttonDisabled,
         paramsDisabled: !prevState.paramsDisabled
      }))
   }
   handleIncrease = () => {
      this.props.increaseNumOfPersons()
   }
   handleDecrease = () => {
      this.props.decreaseNumOfPersons()
   }
   render() {
      const { container, spinnerStyle, datesContainer, bottomButton, bottomButtonText } = accommodationStyles
      return (
         <ScrollView contentContainerStyle={container}>
            <NavigationEvents onWillFocus={() => this.handleOnWillFocus()} />
            <CheckOption 
               checkTitle="I don't need accommodation"
               checked={this.props.noAccommodation}
               onPress={this.handleCheck}
            />
            <InputOption 
               iconDisabled={this.state.paramsDisabled}
               editable={!this.state.paramsDisabled}
               text={"Destination City"} 
               placeholder={"e.g.Berlin"} 
               value={this.props.destinationCity} 
               onChangeText={(txt) => this.props.changeAccommDestination(txt)} 
            />
            <UnfoldOption 
               disabled={this.state.paramsDisabled}
               unfoldTitle="Number of persons" 
               value={this.props.numOfPersons.toString()}
               onIncrease={this.handleIncrease}
               onDecrease={this.handleDecrease} 
            />
            <View style={datesContainer}>
               <InputOption
                  iconDisabled={this.state.paramsDisabled}
                  editable={!this.state.paramsDisabled}
                  width={inputWidth/2}
                  value={this.props.checkInDate}
                  editable={false}
                  icon="date-range"
                  text="Check-in Date"
                  placeholder="YYYY-MM-DD"
                  onPress={() => this.pickDate(checkIn)}
               />
               <InputOption 
                  iconDisabled={this.state.paramsDisabled}
                  editable={!this.state.paramsDisabled}
                  width={inputWidth/2}
                  value={this.props.checkOutDate}
                  editable={false}
                  icon="date-range"
                  text="Check-out Date"
                  placeholder="YYYY-MM-DD"
                  onPress={() => this.pickDate(checkOut)}
               />
            </View>
            <View style={{alignSelf: 'center'}}>
               <Button
                  disabled={this.state.buttonDisabled}
                  label="Find Accommodation"
                  width={Dimensions.get('window').width - 100}
                  height={50}
                  radius={15}
                  fontSize={18}
                  onPress={this.handleFindAccommodation.bind(this)} 
               />
            </View>
            <Calendar 
               renderCalendar={this.state.renderCalendar}
               showModal={this.state.showModal}
               onDateChange={this.onDateChange.bind(this)}
               handleOK={this.handleCloseCalendar.bind(this)}
               minDate={this.minDate}
               initialDate={this.props.checkInDate}
            />
            {this.props.accommodationLoading && (
               <View style={spinnerStyle}>
                  <ActivityIndicator size="large" color={secondaryColor}/>
               </View>
            )}
            {this.state.showList && !this.props.accommodationLoading && (
                  <FlatList 
                     data={this.props.accommodationOptions}
                     keyExtractor={keyExtractor}
                     renderItem={this.renderAccommodationOption}
                     style={{marginTop: marginTopBottom, marginBottom: marginTopBottom}}
                  />              
            )}
            {(this.state.showList && !this.state.paramsDisabled && this.props.accommodationOptions.length !== 0) && (
               <TouchableOpacity 
                  style={bottomButton}
                  onPress={this.handleSeeMoreResults.bind(this)}
               >
                  <Text style={bottomButtonText}>See more results</Text>
               </TouchableOpacity> 
            )}
         </ScrollView>
      )
   }
}
const accommodationStyles = StyleSheet.create({
   container: {
      marginTop: marginTopBottom,
      marginBottom: marginTopBottom
   },
   spinnerStyle: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
   },
   datesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
   },
   bottomButton: {
      marginTop: marginTopBottom,
      marginBottom: marginTopBottom + 10,
      alignSelf: 'center'
   },
   bottomButtonText: {
      color: primaryColor,
      fontSize: 18
   }
})
const mapStateToProps = state => ({
   currentEvent: state.currentEvent,
   eventCity: state.currentEvent.general.eventCity,
   startDate: state.currentEvent.general.startDate,
   endDate: state.currentEvent.general.endDate,
   destinationCity: state.currentEvent.accommodation.accommDestination,
   noAccommodation: state.currentEvent.accommodation.noAccommodation,
   numOfPersons: state.currentEvent.accommodation.numOfPersons,
   checkInDate: state.currentEvent.accommodation.checkInDate,
   checkOutDate: state.currentEvent.accommodation.checkOutDate,
   accommodationLoading: state.currentEvent.accommodation.accommodationLoading,
   accommProperties: state.currentEvent.accommodation.accommProperties,
   accommodationOptions: state.currentEvent.accommodation.accommodationOptions,
   chosenAccommOptionId: state.currentEvent.accommodation.chosenAccommOptionId,
   accommodationCosts: state.currentEvent.accommodation.accommodationCosts
})
const mapDispatchToProps = {
   noNeedAccommodation,
   changeAccommDestination,
   increaseNumOfPersons,
   decreaseNumOfPersons,
   addCheckinDate,
   addCheckoutDate,
   searchingAccommodation,
   searchingMoreResults,
   searchAccommodationSuccess,
   searchAccommodationFail,
   accommodationChosen,
   accommodationUnchosen,
   updateEvent 
}
export default connect(mapStateToProps, mapDispatchToProps)(Accommodation)