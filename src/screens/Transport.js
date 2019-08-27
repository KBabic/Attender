import React from 'react'
import { View, StyleSheet, Dimensions, FlatList, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addOriginCity, noNeedTransport, searchingTransport, searchTransportSuccess, searchTransportFail, changeDestinationCity} from '../actions/TransportActions'
import { updateEvent } from '../actions/EventActions'
import CheckOption from '../components/CheckOption'
import InputOption from '../components/InputOption'
import Button from '../components/Button'
import ListItem from '../components/ListItem'
import { modes, getTransportData } from '../utils/transportData'
import { marginTopBottom, secondaryColor } from '../utils/colorsAndMargins'

const keyExtractor = ({ id }) => id.toString()

class Transport extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         buttonDisabled: this.props.noTransport,
         originDisabled: this.props.noTransport
      }
   }
   componentWillReceiveProps(nextProps) {
      nextProps.updateEvent(nextProps.currentEvent)
   }
   searchTransport = async () => {
      this.props.searchingTransport()
      const re = /^[a-zA-Z]+/
      if (!this.props.originCity.match(re) || !this.props.destinationCity.match(re)) {
         this.props.searchTransportFail()
         Alert.alert('Error','Please specify origin and destination cities correctly.',[{text: 'OK'}])
      } else {
         let transpData = await getTransportData(modes, this.props.originCity, this.props.destinationCity)
         if (transpData) {
            let places = transpData[0]
            let vehicles = transpData[1]
            let transpList = transpData[2]
            await this.props.searchTransportSuccess([transpList, places, vehicles])
            this.props.updateEvent(this.props.currentEvent)
         } else {
            this.props.searchTransportFail()
         }
      } 
   }
   renderTransportOption = ({ item: { id, icons, currency, totalTime, minPrice, maxPrice, price, segments } }) => {
      let priceRange
      if (minPrice !== "" && maxPrice !== "") {
         priceRange = `${currency} ${minPrice}-${maxPrice}`
      } else {
         priceRange = ""
      }
      let selected
      if (id === this.props.chosenTransportOptionId) {
         selected = true
      } else {
         selected = false
      }
      return (
         <ListItem 
            key={id}
            id={id}
            selected={selected}
            text1={totalTime} 
            text2={priceRange}
            icons={icons}
            navigation={this.props.navigation}
            places={this.props.transportOptions[1]}
            vehicles={this.props.transportOptions[2]}
            segments={segments}
            totalTime={totalTime}
            totalPrice={price}
            currency={currency}
         />
      )
   }
   handleCheck = () => {
      this.props.noNeedTransport()
      this.setState((prevState) => ({
         buttonDisabled: !prevState.buttonDisabled,
         originDisabled: !prevState.originDisabled
      }))
   }
   render() {
      const { container } = transportStyles
      return (
         <View style={container}>
            <CheckOption 
               checkTitle="I don't need transport" 
               checked={this.props.noTransport} 
               onPress={() => this.handleCheck()}
            />
            <InputOption 
               iconDisabled={this.state.originDisabled}
               editable={!this.state.originDisabled}
               text={"Origin City"} 
               placeholder={"e.g.Paris"} 
               value={this.props.originCity} 
               onChangeText={(txt) => this.props.addOriginCity(txt)} 
            />
            <InputOption 
               iconDisabled={this.state.originDisabled}
               editable={!this.state.originDisabled}
               text={"Destination City"} 
               placeholder={"e.g.Berlin"} 
               value={this.props.destinationCity} 
               onChangeText={(txt) => this.props.changeDestinationCity(txt)} 
            />
            <Button
               disabled={this.state.buttonDisabled} 
               label="Find Transport Options"
               onPress={this.searchTransport.bind(this)}
               width={Dimensions.get('window').width - 100}
               height={50}
               radius={15}
               fontSize={18}
            />
            {this.props.transportLoading && (
               <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" color={secondaryColor}/>
               </View>
            )}
            {!this.props.transportLoading && (
               <FlatList
                  data={this.props.transportOptions[0]}
                  renderItem={this.renderTransportOption}
                  keyExtractor={keyExtractor}
                  style={{ marginTop: marginTopBottom }}
               />
            )}
         </View>
      )
   }
}
const transportStyles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: marginTopBottom,
      marginBottom: marginTopBottom
   }
})
const mapStateToProps = state => ({
   currentEvent: state.currentEvent,
   eventCity: state.currentEvent.general.eventCity,
   destinationCity: state.currentEvent.transport.destinationCity,
   originCity: state.currentEvent.transport.originCity,
   noTransport: state.currentEvent.transport.noTransport,
   transportLoading: state.currentEvent.transport.transportLoading,
   transportOptions: state.currentEvent.transport.transportOptions,
   chosenTransportOptionId: state.currentEvent.transport.chosenTransportOptionId,
   transportCosts: state.currentEvent.transport.transportCosts
})
const mapDispatchToProps = dispatch => {
   return {
      addOriginCity: (city) => {
         dispatch(addOriginCity(city))
      },
      noNeedTransport: () => {
         dispatch(noNeedTransport())
      },
      searchingTransport: () => {
         dispatch(searchingTransport())
      },
      searchTransportSuccess: (listOfOptions) => {
         dispatch(searchTransportSuccess(listOfOptions))
      },
      searchTransportFail: () => {
         dispatch(searchTransportFail())
      },
      updateEvent: (event) => {
         dispatch(updateEvent(event))
      },
      changeDestinationCity: (city) => {
         dispatch(changeDestinationCity(city))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transport)