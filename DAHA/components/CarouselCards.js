import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../assets/data'
import { StyleSheet, Text } from 'react-native'
import { useState } from 'react'


export default function CarouselCards({images}){
    
  const isCarousel = React.useRef(null)
  const [index, setIndex] = React.useState(0)
  const numImages = images.length;

  return (
    <View style = {styles.container}>

      <Carousel 
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={images}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
          onSnapToItem={(index) => setIndex(index)}
      />
      {(images.length > 1)? 
        <Pagination
          dotsLength={images.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "orange"
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
        :
        <MaterialCommunityIcons name="circle" color="orange" size= {12} style={{marginTop: 27, marginBottom: 33}}/>
    }
        

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }
  });


