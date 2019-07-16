import React from 'react'
import { View, StyleSheet, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { addOriginCity, noNeedTransport, searchingTransport, searchTransportSuccess, searchTransportFail} from '../actions/TransportActions'
import CheckOption from '../components/CheckOption'
import InputOption from '../components/InputOption'
import Button from '../components/Button'
import ListItem from '../components/ListItem'
import { modes, getTransportData } from '../utils/transportData'
import { marginTopBottom } from '../utils/colorsAndMargins'

const keyExtractor = ({ id }) => id.toString()

class Transport extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         buttonDisabled: false,
         originDisabled: false
      }
      this.places = []
      this.vehicles = []
   }
   searchTransport = async () => {
      this.props.searchingTransport()
      let transpData = await getTransportData(modes, this.props.originCity, this.props.destinationCity)
      this.places = transpData[0]
      this.vehicles = transpData[1]
      let transpList = transpData[2]
      await this.props.searchTransportSuccess(transpList)
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
            places={this.places}
            vehicles={this.vehicles}
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
   handleChangeOrigin = (city) => {
      this.props.addOriginCity(city)
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
               placeholder={"e.g.Berlin"} 
               value={this.props.originCity} 
               onChangeText={(txt) => this.handleChangeOrigin(txt)} 
            />
            <Button
               disabled={this.state.buttonDisabled} 
               label="Find Transport Options"
               onPress={this.searchTransport.bind(this)}
               width={Dimensions.get('window').width - 100}
               height={60}
               radius={15}
               fontSize={20}
            />
            {!this.props.transportLoading && (
               <FlatList
                  data={this.props.transportOptions}
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
   destinationCity: state.event.city,
   originCity: state.transport.originCity,
   noTransport: state.transport.noTransport,
   transportLoading: state.transport.transportLoading,
   transportOptions: state.transport.transportOptions,
   chosenTransportOptionId: state.transport.chosenTransportOptionId,
   transportCosts: state.transport.transportCosts
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
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transport)