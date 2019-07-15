import React from 'react'
import { 
   ImageBackground, 
   StyleSheet, 
   View, 
   Dimensions, 
   TouchableOpacity,
   StatusBar
 } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { primaryColor, buttonColor } from '../utils/colorsAndMargins'

const inputWidth = Dimensions.get('window').width - 90
const inputHeight = Dimensions.get('window').height - 150

export default class Start extends React.Component {
   
   static navigationOptions = ({ navigation }) => {
      return {
         header: () => null
      }
   }
   /*handlePress = () => {
      this.props.navigation.navigate('EventList')
   }*/
   render() {
      return (
         <View style={startStyles.container}>
         <StatusBar backgroundColor={primaryColor} />
            <ImageBackground 
               source={require('../assets/Home.png')}
               style={startStyles.imageContainer}
               imageStyle={startStyles.image}
            >
               <TouchableOpacity 
                  style={startStyles.arrowContainer}
                  onPress={() => this.props.navigation.navigate('EventList')}
               >
                  <Icon 
                     name="arrow-forward"
                     size={70}
                     color={buttonColor}
                  />
               </TouchableOpacity>
            </ImageBackground>
         </View>
      )
   }
}
startStyles = StyleSheet.create({
   container: {
      flex: 1
   },
   imageContainer: {
      flex: 1,
   },
   image: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
   },
   arrowContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      marginLeft: inputWidth,
      marginTop: inputHeight,
      marginBottom: 150,
   }
}) 