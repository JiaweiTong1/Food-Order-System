import React from 'react';
import { Stack, Link } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/src/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function OrderStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Orders' }} />
        </Stack> 
    );
}