import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import {ip} from '../ip'

export default function PrintSS({route, navigation}){
    const {id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')

    const effect = async()=>{
        try{
            const res=await axios.get(`${ip}/student/${id}`)
            console.log('data for this id ',res.data)
            setUse(res.data)
        }catch(error){
            console.log(error)
        }
       
    }


    useEffect(() => {
        navigation.setOptions({ title: "Student Information"})
        effect()
        // axios.get(`${ip}/student/${id}`)
        //     .then(res => {
        //         console.log('data for this id ',res.data)
        //         setUse(res.data)
        //     })
      
    },[])

    const Accept = async()=>{

        try{
            const res=await axios.delete(`${ip}/student/${id}`)
            console.log('data deleted in teacher ',res.data)
            navigation.goBack();
        }catch(error){
            console.log(error)
        }

        // axios.delete(`${ip}/student/${id}`)
        //    .then(res => {
        //         console.log('data deleted in teacher ',res.data)
        //         navigation.goBack();
        //     })
        
    }

    return(
        <View>
            <View style={styles.flat}>
                <View>
                    <Text>Name: {use.name}</Text>
                    <Text>Email: {use.email}</Text>
                    <Text>Phone: {use.phone}</Text>
                    {/* <Text>University: {use.university}</Text> */}
                    <Text>Department: {use.department}</Text>
                    {/* <Text>Post: {use.post}</Text> */}
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
      width: 110,
      height: 110,
    },
    logo: {
      width: 66,
      height: 58,
    },
    flat: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding:10,
        margin:10
      },
  });
  