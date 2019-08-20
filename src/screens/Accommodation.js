import React from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { noNeedAccommodation, increaseNumOfPersons, decreaseNumOfPersons, addCheckinDate, addCheckoutDate, searchingAccommodation,
searchAccommodationSuccess, searchAccommodationFail, accommodationChosen, accommodationUnchosen } from '../actions/AccommodationActions'
import { updateEvent } from '../actions/EventActions'
import InputOption from '../components/InputOption'
import CheckOption from '../components/CheckOption'
import UnfoldOption from '../components/UnfoldOption'
import Button from '../components/Button'
import Calendar from '../components/Calendar'
import ListItem from '../components/ListItem'
import { marginLeftRight, marginTopBottom, primaryColor, secondaryColor } from '../utils/colorsAndMargins'
import { getLocations, getDestId, getPropertiesList, getHotelsList, getSearchId } from '../utils/accommodationData'

const keyExtractor = ({ id }) => id.toString()
const checkIn = "checkIn"
const checkOut = "checkOut"

class Accommodation extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         renderCalendar: false,
         showModal: false,
         showList: false,
         buttonDisabled: this.props.noAccommodation,
         paramsDisabled: this.props.noAccommodation
      }
      this.offset = 0
      this.properties = []
      this.search_id = ""
      this.calendarModal = ""
   }
   componentWillReceiveProps(nextProps) {
      nextProps.updateEvent(nextProps.currentEvent)
   }
   pickDate = (name) => {
      this.calendarModal = name
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
      this.props.searchingAccommodation()
      this.props.updateEvent(this.props.currentEvent)
      const { destinationCity, numOfPersons, checkInDate, checkOutDate } = this.props
      let locations
      let dest_id
      let hotelsList
      let search_id
      try {
         locations = await getLocations(destinationCity)
         dest_id = getDestId(locations)
      } catch(e) {
         console.log('Error fetching locations', e)
      }
      try {
         this.properties = await getPropertiesList(dest_id, this.offset, this.search_id, numOfPersons, checkInDate, checkOutDate)
      } catch(e) {
         console.log('Error fetching properties', e)
      }
      try {
         hotelsList = getHotelsList(this.properties)
      } catch(e) {
         console.log('Error getting hotelsList', e)
      }
      try {
         search_id = getSearchId(this.properties)
         console.log(search_id)
      } catch(e) {
         console.log('Error getting search id', e)
      }
      try {
         this.setState(prevState => ({
            showList: true, 
            //hotelsList: [...prevState.hotelsList, ...hotelsList],
            //loading: false
         }))
         this.props.searchAccommodationSuccess(hotelsList)
         this.props.updateEvent(this.props.currentEvent)
         this.offset = this.offset + 30
         this.search_id = search_id
      } catch (e) {
         console.log(e)
      }
   }
   renderAccommodationOption = ({ item }) => {
      const { id, name, minPrice, currency } = item
      let selected
      if (id === this.props.chosenAccommOptionId) {
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
            properties={this.properties}
      />
      )   
   }
   handleCheck = () => {
      this.props.noNeedAccommodation()
      this.props.updateEvent(this.props.currentEvent)
      this.setState((prevState) => ({
         buttonDisabled: !prevState.buttonDisabled,
         paramsDisabled: !prevState.paramsDisabled
      }))
   }
   handleIncrease = () => {
      this.props.increaseNumOfPersons()
      this.props.updateEvent(this.props.currentEvent)
   }
   handleDecrease = () => {
      this.props.decreaseNumOfPersons()
      this.props.updateEvent(this.props.currentEvent)
   }
   render() {
      const { container } = accommodationStyles
      return (
         <ScrollView contentContainerStyle={container}>
            <CheckOption 
               checkTitle="I don't need accommodation"
               checked={this.props.noAccommodation}
               onPress={this.handleCheck}
            />
            <UnfoldOption 
               disabled={this.state.paramsDisabled}
               unfoldTitle="Number of persons" 
               value={this.props.numOfPersons.toString()}
               onIncrease={this.handleIncrease}
               onDecrease={this.handleDecrease} 
            />
            <InputOption
               iconDisabled={this.state.paramsDisabled}
               defaultValue={this.props.startDate}
               value={this.props.checkInDate==="" ? undefined : this.props.checkInDate}
               editable={false}
               icon="date-range"
               text="Check-in Date"
               placeholder="YYYY-MM-DD"
               onPress={() => this.pickDate(checkIn)}
            />
            <InputOption 
               iconDisabled={this.state.paramsDisabled}
               defaultValue={this.props.endDate}
               value={this.props.checkOutDate==="" ? undefined : this.props.checkOutDate}
               editable={false}
               icon="date-range"
               text="Check-out Date"
               placeholder="YYYY-MM-DD"
               onPress={() => this.pickDate(checkOut)}
            />
            <Button
               disabled={this.state.buttonDisabled}
               label="Find Accommodation"
               width={Dimensions.get('window').width - 100}
               height={60}
               radius={15}
               fontSize={20}
               onPress={this.searchAccommodation.bind(this)} 
            />
            <Calendar 
               renderCalendar={this.state.renderCalendar}
               showModal={this.state.showModal}
               onDateChange={this.onDateChange.bind(this)}
               handleOK={this.handleCloseCalendar.bind(this)}
            />
            {this.props.accommodationLoading && (
               <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" color={secondaryColor}/>
               </View>
            )}
            {this.state.showList && !this.props.accommodationLoading && (
                  <FlatList 
                     data={this.props.accommodationOptions}
                     keyExtractor={keyExtractor}
                     renderItem={this.renderAccommodationOption}
                     style={{
                        marginTop: marginTopBottom,
                        marginBottom: marginTopBottom //+ 10
                     }}
                  />              
            )}
            {this.state.showList && (
               <TouchableOpacity 
                  style={{
                     marginTop: marginTopBottom,
                     marginBottom: marginTopBottom + 10
                  }}
                  onPress={this.searchAccommodation}
               >
                  <Text style={{color: primaryColor, fontSize: 18}}>See more results</Text>
               </TouchableOpacity> 
            )}
         </ScrollView>
      )
   }
}
const accommodationStyles = StyleSheet.create({
   container: {
      alignItems: 'center',
      marginLeft: marginLeftRight,
      marginRight: marginLeftRight,
      marginTop: marginTopBottom,
      marginBottom: marginTopBottom
   }
})
const mapStateToProps = state => ({
   currentEvent: state.currentEvent,
   startDate: state.currentEvent.general.startDate,
   endDate: state.currentEvent.general.endDate,
   destinationCity: state.currentEvent.general.eventCity,
   noAccommodation: state.currentEvent.accommodation.noAccommodation,
   numOfPersons: state.currentEvent.accommodation.numOfPersons,
   checkInDate: state.currentEvent.accommodation.checkInDate,
   checkOutDate: state.currentEvent.accommodation.checkOutDate,
   accommodationLoading: state.currentEvent.accommodation.accommodationLoading,
   accommodationOptions: state.currentEvent.accommodation.accommodationOptions,
   chosenAccommOptionId: state.currentEvent.accommodation.chosenAccommOptionId,
   accommodationCosts: state.currentEvent.accommodation.accommodationCosts
})
const mapDispatchToProps = dispatch => {
   return {
      noNeedAccommodation: () => {
         dispatch(noNeedAccommodation())
      },
      increaseNumOfPersons: () => {
         dispatch(increaseNumOfPersons())
      },
      decreaseNumOfPersons: () => {
         dispatch(decreaseNumOfPersons())
      },
      addCheckinDate: (date) => {
         dispatch(addCheckinDate(date))
      },
      addCheckoutDate: (date) => {
         dispatch(addCheckoutDate(date))
      },
      searchingAccommodation: () => {
         dispatch(searchingAccommodation())
      },
      searchAccommodationSuccess: (listOfOptions) => {
         dispatch(searchAccommodationSuccess(listOfOptions))
      },
      searchAccommodationFail: () => {
         dispatch(searchAccommodationFail())
      },
      accommodationChosen: (id, cost) => {
         dispatch(accommodationChosen(id, cost))
      },
      accommodationUnchosen: () => {
         dispatch(accommodationUnchosen())
      },
      updateEvent: (event) => {
         dispatch(updateEvent(event))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Accommodation)