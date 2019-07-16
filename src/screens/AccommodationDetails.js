import React from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { accommodationChosen, accommodationUnchosen } from '../actions/AccommodationActions'
import CheckOption from '../components/CheckOption'
import ImageGrid from '../components/ImageGrid'
import { primaryColor, marginTopBottom, inputWidth, marginLeftRight, secondaryColor } from '../utils/colorsAndMargins'
import { getHotelDetails, getHotelDescription, getPhotoData, getPhotosList, getFacilities} from '../utils/accommodationData'

export default class AccommodationDetails extends React.Component {
   constructor(props) {
      super(props)
      this.hotel = {}
      this.state = {
         loading: true,
         checked: false
      }
      this.photos = []
      this.facilities = []
   }
   async componentDidMount() {
      const { navigation } = this.props
      const hotel = navigation.getParam('item')
      const properties = navigation.getParam('properties')
      const hotelInit = getHotelDetails(hotel, properties.result)
      this.hotel = await getHotelDescription(hotelInit)
      const [prefix, data] = await getPhotoData({ id: this.hotel.id })
      const photosList = getPhotosList(prefix, data)
      this.photos = photosList
      const facilities = await getFacilities({ id: this.hotel.id })
      this.facilities = facilities
      this.setState({loading: false})
   }
   handleCheck = () => {
      this.setState(prevState => (
         {checked: !prevState.checked}
      ))
   }
   render() {
      const { checked } = this.state
      const { name, minPrice, currency, description } = this.hotel
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
                     <ImageGrid images={this.photos} />
                     <Text style={[text, { fontWeight: 'bold', paddingTop: 20, paddingBottom: 20 }]}>Facilities:</Text>
                     {this.facilities.sort().map((facility, i) => {
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