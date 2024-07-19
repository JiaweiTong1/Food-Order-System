import Button from '../../../components/Button'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router'


const createProductScreen = () => {
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [errors, setErrors] = React.useState('')
  const [image, setImage] = useState<string|null>(null);

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.log('Create Product')
    resetFields()
  }

  const resetFields = () => {
    setName('')
    setPrice('')
  };
  
  const validateInput = () => {
    setErrors('')
    if (!name) {
      setErrors('Name is required')
      return false;
    }

    if (!price) {
      setErrors('Price is required')
      return false; 
    }

    if(isNaN(parseFloat(price))) {
      setErrors('Price must be a number')
      return false;
    }

    return true;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Create Product'}}/>
      <Image source={{ uri: image || defaultPizzaImage}} style={styles.image} />
      <Text style={styles.textButton} onPress={pickImage}>Select Image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput 
      value={name}
      onChangeText={setName}
      placeholder="Name" 
      style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput 
      value={price}
      onChangeText={setPrice}
      placeholder="9.99" 
      style={styles.input}
      keyboardType="numeric"
      />

      <Text style={{color: 'red'}}>{errors}</Text> 
      <Button text="Create Product" onPress={onCreate}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,

  },

  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },

  label: {
    color: 'gray',
    fontSize: 18,
  },

  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },

  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint, 
    marginVertical: 10,
  },

});

export default createProductScreen