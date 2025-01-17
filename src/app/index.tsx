import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from './Providers/AuthProvider';
import { supabase } from '../lib/superbase';

const index = () => {
  const {session, loading} = useAuth();
  console.log(session);

  if(loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>

      <Link href={'/(auth)/sign-in'} asChild>
        <Button text="Sign In" />
      </Link>

      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={()=>supabase.auth.signOut()} text="Sign Out" />
    </View>
  );
};

export default index;