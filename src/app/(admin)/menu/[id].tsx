import { View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Link, Stack, useLocalSearchParams} from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useCart } from '../../Providers/CartProvider';
import { PizzaSize } from '@/src/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/src/constants/Colors';

const sizes: PizzaSize[]=['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
    const {id} = useLocalSearchParams();


    const product = products.find((product) => product.id.toString() === id);


    if (!product) {
        return (
            <View>
                <Text style={{ fontSize: 20 }}>Product not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
            options={{ title: 'Menu', 
              headerRight: () => (
                <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                  <Pressable> 
                    {({ pressed }) => ( 
                      <FontAwesome
                        name="pencil"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
             }}
        />

   
            
            <Stack.Screen options={{ title: product.name }} />

            <Image 
            source={{ uri: product.image || defaultPizzaImage}}
            style={styles.image} />
            <Text style={styles. textsize}>${product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
          

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
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textsize: {
        fontSize: 20,
        fontWeight: 500,
    },
});

export default ProductDetailScreen;