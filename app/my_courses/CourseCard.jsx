import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'; // change this in cli
const courseImage = require('../assets/images/56.png');  


export default function CourseCard({ Img, name }) {
    console.log(Img)
  async function HandleNav() {
    try {
      await AsyncStorage.setItem('course_name', name);
    } catch (err) {
      console.log('error: ', err);
    }
    router.push("/course_details/CourseDetails")
  }

  return (
    <Pressable onPress={HandleNav} style={styles.container}>
      <Image style={styles.image} source={courseImage} />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
});