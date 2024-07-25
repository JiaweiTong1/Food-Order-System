import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, Text, View } from 'react-native';
import orders from '@/assets/data/orders';
import { FlatList } from 'react-native';
import OrderItemListItem from "@/src/components/OrderItemListItem";
import Colors from "@/src/constants/Colors";
import { OrderStatusList } from "@/src/types";

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
            ListHeaderComponent={()=> <OrderListItem order={order}/>}
            ListFooterComponent={()=> (
              <>
              <Text style={{ fontWeight: 'bold' }}>Status</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => console.warn('Update status')}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        order.status === status
                          ? Colors.light.tint
                          : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          order.status === status ? 'white' : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
            )}
            />
    </View>
  );
}
