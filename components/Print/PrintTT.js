import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import {ip} from '../ip'

export default function PrintTT({route, navigation}){
    const {id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')

    useEffect(() => {
        axios.get(`${ip}/teacher/${id}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setUse(res.data)
            })
      
    },[])

    const Accept = ()=>{

        axios.delete(`${ip}/teacher/${id}`)
           .then(res => {
                console.log('data deleted in teacher ',res.data)
                navigation.goBack();
            })
        
    }

    const Reject = ()=>{

        axios.delete(`${ip}/approveT/${un}`)
           .then(res => {
                console.log('data deleted in approve ',res.data)
            })

        axios.delete(`${ip}/teacher/${id}`)
            .then(res => {
                console.log('data deleted in teacher ',res.data)
            })
        navigation.goBack();
    }

    return(
        <View>
            <View style={styles.flat}>
                <View>
                    <Text>Name: {use.name}</Text>
                    <Text>Email: {use.email}</Text>
                    <Text>Phone: {use.phone}</Text>
                    <Text>University: {use.university}</Text>
                    <Text>Department: {use.department}</Text>
                    <Text>Post: {use.post}</Text>
                </View>
                <View>
                    <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: use.avatar,
                    }}
                    />
                </View>
            </View>
            <Button
              title="Delete"
              onPress={Accept}
            />

        </View>
    )



}
const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
    flat: {
        flexDirection: 'row'
      },
  });
  