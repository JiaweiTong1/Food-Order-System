import { View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Stack, useLocalSearchParams} from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';

const sizes=['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
    const {id} = useLocalSearchParams();

    const [selectedSize, setSelectedSize] = React.useState('');

    const product = products.find((product) => product.id.toString() === id);

    const addToCart = () => {
        console.warn('Added to cart');
    };

    if (!product) {
        return (
            <View>
                <Text style={{ fontSize: 20 }}>Product not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />

            <Image 
            source={{ uri: product.image || defaultPizzaImage}}
            style={styles.image} />

            <Text>Select Size</Text>
            <View style={styles.sizes}>

            {sizes.map((size) => (
              <Pressable 
                onPress={() => setSelectedSize(size)}
                style={[styles.size, 
                {backgroundColor: selectedSize === size ? 'lightblue' : 'gainsboro' }
              ]} key={size}>
                <Text style={[styles.textsize, 
                    {color: selectedSize === size ? 'black' : 'gray'}
                    ]} key={size}>{size}</Text>
              </ Pressable>
            ))}
            </View>

            <Text style={styles.price}>${product.price}</Text>
            <Button text="Add to Cart" onPress={addToCart} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        marginTop: 'auto',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sizes:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'gainsbror',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textsize: {
        fontSize: 20,
        fontWeight: 500,
    },
});

export default ProductDetailScreen;