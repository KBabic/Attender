import React from 'react'
import { Dimensions, Image, View, Text, ImageBackground, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Gallery from 'react-native-image-gallery'
import { primaryColor } from '../utils/colorsAndMargins'

const windowWidth = Dimensions.get('window').width
const imagesPerRow = 3

export default class ImageGrid extends React.PureComponent {
   state = {
      showGallery: false
   }
   calculatedSize = () => {
      const size = (windowWidth - 40) / imagesPerRow
      return { width: size, height: size, margin: 1 }
   }
   getNumOfPhotos = (photosArray) => {
      return photosArray.length - 6
   }
   renderImagesInRow = (arr, i) => {
     return (
      <View style={{ flexDirection: 'row'}}>
         {arr.slice(i,i+3).map((image, index) => {
            if (arr.indexOf(image) !== 5) {
               return (
                  <Image 
                     key={index}
                     style={this.calculatedSize()}
                     source={{ uri: image.source.uri }}
                  />
               )
            } else {
               return (
                  <TouchableOpacity onPress={() => {
                     this.setState({ showGallery: true})}}>
                     <ImageBackground 
                        key={index}
                        style={[this.calculatedSize(), {justifyContent: 'center', alignItems: 'center'}]}
                        imageStyle={{ opacity: 0.5 }}
                        source={{ uri: image.source.uri }}
                     >
                        <Text 
                           key={index}
                           style={{ fontSize: 40, textAlign: 'center', color: primaryColor}}
                        >
                           {`+${this.getNumOfPhotos(arr)}`}
                        </Text>
                     </ImageBackground>
                  </TouchableOpacity>
               )
            }   
         })}
      </View>
     )
   } 
   render() {
      if (this.state.showGallery) {
         return (
            <Modal
               visible={this.state.showGallery}
            >
               <TouchableOpacity 
                  onPress={() => this.setState({showGallery: false})}
                  style={{ backgroundColor: 'white', alignItems: 'flex-end' }}
               >
                  <Icon name="cancel" size={40} color={primaryColor} />
               </TouchableOpacity>
               <Gallery 
                  style={{ flex: 1, backgroundColor: 'white' }}
                  initialPage={5}
                  images={this.props.images}
                  maxScale={3}
               /> 
            </Modal>
            
         )
      } else {
         return (
            <View>  
               {this.renderImagesInRow(this.props.images,0)}
               {this.renderImagesInRow(this.props.images,3)}
            </View>
         ) 
      }
   }
}