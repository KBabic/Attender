import React from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { accommodationChosen, accommodationUnchosen } from '../actions/AccommodationActions'
import { updateEvent } from '../actions/EventActions'
import CheckOption from '../components/CheckOption'
import ImageGrid from '../components/ImageGrid'
import { primaryColor, marginTopBottom, inputWidth, marginLeftRight, secondaryColor } from '../utils/colorsAndMargins'
import { getHotelDetails, getHotelDescription, getPhotoData, getPhotosList, getFacilities} from '../utils/accommodationData'

class AccommodationDetails extends React.Component {
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
      console.log(this.hotel)
      
      if (Object.entries(this.hotel).length === 0 && this.hotel.constructor === Object) {
         const hotelInit = getHotelDetails(hotel, properties.result)
         this.hotel = await getHotelDescription(hotelInit)
         console.log(this.hotel)
         try {
            const [prefix, data] = await getPhotoData({ id: this.hotel.id })
            const photosList = getPhotosList(prefix, data)
            this.hotel.photos = photosList
         } catch(e) {
            console.log(e.message)
         }
         try {
            const facilities = await getFacilities({ id: this.hotel.id })
            this.hotel.facilities = facilities
         } catch(e) {
            console.log(e.message)
         }
         this.setState({loading: false})
      } else {
         this.setState({loading: false})
      }
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
               <ActivityIndicator size="large" color={secondaryColor}/>
            </View>
         )
      } else {
         return (
            <View style={[container, {flex:1}]}>
               <CheckOption checkTitle="Choose this accommodation" checked={checked} onPress={this.handleCheck}/>
               <Text style={[text, { fontWeight: 'bold', textAlign: 'center'}]}>{name}</Text>
               <View style={detailsContainer}>
                  <Text style={text}>Minimal total price</Text>
                  <Text style={text}>{`${currency} ${minPrice}`}</Text>
               </View>
               <View style={descriptionContainer}>
                  <ScrollView>
                     <Text style={[descriptionStyle, {paddingBottom: 20}]}>{description}</Text>
                     <ImageGrid images={photos} />
                     <Text style={[text, { fontWeight: 'bold', paddingTop: 20, paddingBottom: 20 }]}>Facilities:</Text>
                     {facilities.sort().map((facility, i) => {
                        return (
                           <Text key={i} style={descriptionStyle}>{facility}</Text>
                     )})}
                  </ScrollView>
               </View>
            </View>
         )
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
const mapDispatchToProps = dispatch => {
   return {
      accommodationChosen: (accommOption) => {
         dispatch(accommodationChosen(accommOption))
      },
      accommodationUnchosen: () => {
         dispatch(accommodationUnchosen())
      },
      updateEvent: (event) => {
         dispatch(updateEvent(event))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccommodationDetails)