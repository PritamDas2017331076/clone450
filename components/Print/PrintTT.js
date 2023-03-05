import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import {ip} from '../ip'

export default function PrintTT({route, navigation}){
    const {id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')

    const effect = async()=>{
        try{
            const res=await axios.get(`${ip}/teacher/${id}`)
            console.log('data for this id ',res.data)
            setUse(res.data)
        }catch(error){
            console.log(error)
        }
       
    }

    useEffect(() => {
        navigation.setOptions({ title: "Teacher Information"})
        effect()
        // axios.get(`${ip}/teacher/${id}`)
        //     .then(res => {
        //         console.log('data for this id ',res.data)
        //         setUse(res.data)
        //     })
      
    },[])

    const Accept = async()=>{

        try{
            const res=await axios.delete(`${ip}/teacher/${id}`)
            console.log('data deleted in teacher ',res.data)
            navigation.goBack();
        }catch(error){
            console.log(error)
        }

        // axios.delete(`${ip}/teacher/${id}`)
        //    .then(res => {
        //         console.log('data deleted in teacher ',res.data)
        //         navigation.goBack();
        //     })
        
    }

    const Reject = async()=>{

        try{
            const res=await axios.delete(`${ip}/approveT/${un}`)
            console.log('data deleted in approve ',res.data)
        }catch(error){
            console.log(error)
        }

        // axios.delete(`${ip}/approveT/${un}`)
        //    .then(res => {
        //         console.log('data deleted in approve ',res.data)
        //     })

        try{
            const res=await axios.delete(`${ip}/teacher/${id}`)
            console.log('data deleted in teacher ',res.data)
        }catch(error){
            console.log(error)
        }

        // axios.delete(`${ip}/teacher/${id}`)
        //     .then(res => {
        //         console.log('data deleted in teacher ',res.data)
        //     })
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
      width: 120,
      height: 120,
      marginLeft:20
    },
    logo: {
      width: 66,
      height: 58,
    },
    flat: {
        flexDirection: 'row',
        margin:10,
        padding:10
    },
  });
  