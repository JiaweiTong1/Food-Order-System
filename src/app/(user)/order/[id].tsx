import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from 'react-native';
import orders from '@/assets/data/orders';
import { FlatList } from 'react-native';
import OrderItemListItem from "@/src/components/OrderItemListItem";

export default function OrderScreen() {
  const { id } = useLocalSearchParams();

  const order = orders.find((order) => order.id.toString() === id);


    if (!order) {
    return (
        <View>
            <Text style={{ fontSize: 20 }}>Order not found</Text>
        </View>
        );
    }

  return (

    <View style={{ padding: 10 }}>
        <Stack.Screen options={{ title: `Order #${id}` }} />
        <OrderListItem order={order} />
        

        <FlatList 
            data={order.order_items}
            renderItem={({item})=> <OrderItemListItem item={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            />
    </View>
  );
}
