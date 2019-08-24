import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { transportChosen, transportUnchosen } from '../actions/TransportActions'
import { transportCostsCalculated } from '../actions/CostsActions'
import { updateEvent } from '../actions/EventActions'
import { primaryColor } from '../utils/colorsAndMargins'
import { convertCurrency } from '../utils/currencyData'
import RouteSegment from '../components/RouteSegment'
import CheckOption from '../components/CheckOption'
import { inputWidth, marginTopBottom } from '../utils/colorsAndMargins'

class TransportDetails extends React.Component {
   constructor(props) {
      super(props)
      const { navigation } = this.props
      const id = navigation.getParam('id')
      this.renderConnector = true
      this.state = { checked: this.props.chosenTransportOptionId === id ? true : false }
   }
   componentWillReceiveProps(nextProps) {
      nextProps.updateEvent(nextProps.currentEvent)
   }
   /*async handleChangeCurrency() {
      let transpCurFactor
      if (this.props.chosenCurrency !== "") {
         try {
            transpCurFactor = await convertCurrency(this.props.transpCurrency, cur)
         } catch(e) {
            console.log(e.message)
         }
         this.props.transportCostsCalculated(transpCurFactor * this.props.transportCosts)
      }
   }*/
   componentDidUpdate(prevProps, prevState) {
      const { navigation } = this.props
      const id = navigation.getParam('id')
      const totalPrice = navigation.getParam('totalPrice')
      const currency = navigation.getParam('currency')
      if (prevState.checked && !this.state.checked) {
         this.props.transportUnchosen()
         // if final currency is already chosen, update final transport costs to 0
         /*if (this.props.chosenCurrency !== "") {
            this.props.transportCostsCalculated(0)
         }*/
         this.props.updateEvent(this.props.currentEvent)
      }
      if (!prevState.checked && this.state.checked) {
         this.props.transportChosen(id, totalPrice, currency)
         // if final currency is already chosen, update final transport costs according to it
         //await this.handleChangeCurrency()
         this.props.updateEvent(this.props.currentEvent)
      }
      if (prevState.checked && this.state.checked) {
         //await this.handleChangeCurrency()
         this.props.updateEvent(this.props.currentEvent)
      }
      if (!prevState.checked && !this.state.checked) {
         this.props.updateEvent(this.props.currentEvent)
      }
   }
   renderItem = (item,index) => {
      const { navigation } = this.props
      const routeSegments = navigation.getParam('routeSegments')
      // for the last segment don't render connector:
      if (index ===  routeSegments.length - 1) {
         this. renderConnector = false
      } else {
         this.renderConnector = true
      }
      return (
         <RouteSegment 
            renderConnector={this.renderConnector}
            segment={item}
            key={item.id}
         />
      )
   }
   handleCheck = () => {
      this.setState(prevState => (
         {checked: !prevState.checked}
      ))
      this.props.updateEvent(this.props.currentEvent)
   }
   render() {
      const { checked } = this.state
      const { navigation } = this.props
      const routeSegments = navigation.getParam('routeSegments')
      const totalTime = navigation.getParam('totalTime')
      const totalPrice = navigation.getParam('totalPrice')
      const currency = navigation.getParam('currency')
      const { container, text, detailsContainer } = transportDetailsStyles
      return (
         <View style={[container, {flex:1}]}>
            <View style={detailsContainer}>
               <Text style={text}>Estimated total time</Text>
               <Text style={text}>{totalTime}</Text>
            </View>
            <View style={detailsContainer}>
               <Text style={text}>Estimated total price</Text>
               <Text style={text}>{`${currency} ${totalPrice}`}</Text>
            </View>
            <View style={{marginBottom: marginTopBottom, marginTop: marginTopBottom}}>
               <CheckOption checkTitle="Choose this transport option" checked={checked} onPress={this.handleCheck} />
            </View>
               <View style={{flex:1}}>
                  <ScrollView>
                     {routeSegments.map((item,index) => this.renderItem(item,index))}
                  </ScrollView>
               </View>
         </View>
      )
   }
}
const transportDetailsStyles = StyleSheet.create({
   container: {
      alignItems: 'center',
      marginTop: marginTopBottom,
      marginBottom: marginTopBottom
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
   }
})
const mapStateToProps = state => ({
   currentEvent: state.currentEvent,
   chosenTransportOptionId: state.currentEvent.transport.chosenTransportOptionId,
   transportCosts: state.currentEvent.transport.transportCosts,
   chosenCurrency: state.currentEvent.costs.chosenCurrency
})
const mapDispatchToProps = dispatch => {
   return {
      transportChosen: (id, cost, cur) => {
         dispatch(transportChosen(id, cost, cur))
      },
      transportUnchosen: () => {
         dispatch(transportUnchosen())
      },
      updateEvent: (event) => {
         dispatch(updateEvent(event))
      },
      transportCostsCalculated: (cost) => {
         dispatch(transportCostsCalculated(cost))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransportDetails)