import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { primaryColor } from '../utils/colorsAndMargins'
import RouteSegment from '../components/RouteSegment'
import CheckOption from '../components/CheckOption'
import { inputWidth, marginTopBottom } from '../utils/colorsAndMargins'

export default class TransportDetails extends React.Component {
   constructor(props) {
      super(props)
      this.renderConnector = true
      this.state = { checked: false }
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
   }
   render() {
      const { checked } = this.state
      const { navigation } = this.props
      const id = navigation.getParam('id')
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