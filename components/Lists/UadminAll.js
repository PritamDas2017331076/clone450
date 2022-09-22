import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity, CheckBox } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectDepartment, selectId } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';

export default function UadminAll({navigation}) {
  const [list, setList] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        axios.get(`${ip}/universities`)
        .then(res => {
            console.log(' data ', res.data) 
            setList(res.data)
         })
         .catch((error) => console.error(error))
    });

    return unsubscribe;

  }, [navigation]);

  const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
        backgroundColor: '#f6f6f6',
      }} 
        onPress={()=>navigation.navigate('University Info',{
        id: item._id,
    })}>
        <Text>{item.name}</Text>
        <Text>{item.email}</Text>
        <Text>{item.university}</Text>

    </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item item={item} />
    );



  return (
    <View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  