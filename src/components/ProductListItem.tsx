import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';
import {  Product } from '../types';

export const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';
   
type ProductListItemProps = {
    product: Product;
}


const ProductListItem = ({product}: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image 
      source={{uri: product.image || defaultPizzaImage}}
      style={styles.image} 
      resizeMode="contain"
    />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
  </View>
  );
};


export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    maxWidth: '50%',
  },

  image: {
    width: '100%',
    aspectRatio: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  price: {
    fontWeight: 'bold',
    color: Colors.light.tint,
  }
});
