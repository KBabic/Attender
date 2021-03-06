import React from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import { accommodationChosen, accommodationUnchosen } from '../actions/AccommodationActions'
import { updateEvent } from '../actions/EventActions'
import CheckOption from '../components/CheckOption'
import ImageGrid from '../components/ImageGrid'
import { primaryColor, marginTopBottom, inputWidth, marginLeftRight, secondaryColor } from '../utils/colorsAndMargins'
import { getHotelDetails, getHotelDescription, getPhotoData, getPhotosList, getFacilities} from '../utils/accommodationData'

class AccommodationDetails extends React.PureComponent {
   constructor(props) {
      super(props)
      this.id = this.props.navigation.getParam('item').id
      this.state = {
         loading: this.props.chosenAccommOptionId === this.id ? false : true,
         checked: this.props.chosenAccommOptionId === this.id ? true : false
      }
      this.hotel =   this.props.chosenAccommOptionId === this.id ?
                     this.props.chosenAccommOption :
                     {}
   }
   async componentDidMount() {
      const { navigation } = this.props
      const hotel = navigation.getParam('item')
      const properties = navigation.getParam('properties')
      
      if (Object.entries(this.hotel).length === 0 && this.hotel.constructor === Object) {
         try {
            const hotelInit = getHotelDetails(hotel, properties.result)
            this.hotel = await getHotelDescription(hotelInit)
            try {
               const [prefix, data] = await getPhotoData({ id: this.hotel.id })
               const photosList = getPhotosList(prefix, data)
               this.hotel.photos = photosList
               try {
                  const facilities = await getFacilities({ id: this.hotel.id })
                  this.hotel.facilities = facilities
               } catch(e) {
                  this.setState({loading: false})
                  Alert.alert('Error','No facilities are available for this option.',[{text: 'OK'}])
               }
            } catch(e) {
               this.setState({loading: false})
               Alert.alert('Error','No photos are available for this option.',[{text: 'OK'}])
            }
         } catch(e) {
            Alert.alert('Error','No description is available for this option.',[{text: 'OK'}])
            this.setState({loading: false})
         }
         this.setState({loading: false})
      } else {
         this.setState({loading: false})
         //Alert.alert('Error', 'No description is available for this option.',[{text: 'OK'}])
      }
   }
   componentDidUpdate(prevProps, prevState) {
      if (this.props.currentEvent !== prevProps.currentEvent) {
         this.props.updateEvent(this.props.currentEvent)
      }
   }
   handleWillFocus() {
      const { navigation, currentEvent } = this.props
      navigation.setParams({ 
         title:   currentEvent.general.eventName.length <= 16 ?
                  currentEvent.general.eventName :
                  currentEvent.general.eventName.slice(0,17) + "..."
      })
   }
   componentDidUpdate(prevProps, prevState) {
      const { navigation } = this.props
      const item = navigation.getParam('item')
      if (prevState.checked && !this.state.checked) {
         this.props.accommodationUnchosen()
         this.props.updateEvent(this.props.currentEvent)
      }
      if (!prevState.checked && this.state.checked) {
         this.props.accommodationChosen(item)
         this.props.updateEvent(this.props.currentEvent)
      }
   }
   handleCheck = () => {
      this.setState(prevState => (
         {checked: !prevState.checked}
      ))
   }
   render() {
      const { checked } = this.state
      const { name, minPrice, currency, description, photos, facilities } = this.hotel
      const { container, text, detailsContainer, descriptionContainer, descriptionStyle } = accommodationDetailsStyles
      if (this.state.loading) {
         return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <NavigationEvents onWillFocus={() => this.handleWillFocus()}/>
               <ActivityIndicator size="large" color={secondaryColor}/>
            </View>
         )
      } else {
         if (Object.entries(this.hotel).length !== 0) {
            return (
               <View style={[container, {flex:1}]}>
                  <NavigationEvents onWillFocus={() => this.handleWillFocus()}/>
                  <CheckOption checkTitle="Choose this accommodation" checked={checked} onPress={this.handleCheck}/>
                  <Text style={[text, { fontWeight: 'bold', textAlign: 'center'}]}>{name}</Text>
                  <View style={detailsContainer}>
                     <Text style={text}>Minimal total price</Text>
                     <Text style={text}>{`${currency} ${minPrice}`}</Text>
                  </View>
                  <View style={descriptionContainer}>
                     <ScrollView>
                        <Text style={[descriptionStyle, {paddingBottom: 20}]}>{description}</Text>
                        {photos && <ImageGrid images={photos} />}
                        <Text style={[text, { fontWeight: 'bold', paddingTop: 20, paddingBottom: 20 }]}>Facilities:</Text>
                        {facilities && facilities.sort().map((facility, i) => {
                           return (
                              <Text key={i} style={descriptionStyle}>{facility}</Text>
                        )})}
                     </ScrollView>
                  </View>
               </View>
            )
         } else {
            return (
               <View style={[container, {flex:1}]}/>
            )
         }
      } 
   }
}
const accommodationDetailsStyles = StyleSheet.create({
   container: {
      alignItems: 'center',
      marginTop: marginTopBottom,
      marginBottom: marginTopBottom,
      marginLeft: marginLeftRight,
      marginRight: marginLeftRight
   },
   detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: inputWidth - 20,
      marginTop: marginTopBottom,
   },
   text: {
      color: primaryColor,
      fontSize: 20
   },
   descriptionContainer: {
      flex:1, 
      marginTop: marginTopBottom,
      marginBottom: marginTopBottom
   },
   descriptionStyle: {
      fontSize: 18,
      color: primaryColor,
   }
})
const mapStateToProps = state => ({
   currentEvent: state.currentEvent,
   chosenAccommOption: state.currentEvent.accommodation.chosenAccommOption,
   chosenAccommOptionId: state.currentEvent.accommodation.chosenAccommOptionId,
   accommodationCosts: state.currentEvent.accommodation.accommodationCosts
})
const mapDispatchToProps = {
   accommodationChosen,
   accommodationUnchosen,
   updateEvent
}
export default connect(mapStateToProps, mapDispatchToProps)(AccommodationDetails)