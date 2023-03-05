import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import {ip} from '../ip'

export default function CourseDelete({route, navigation}){
    const {id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')
    const effect = async()=>{
        try{
            const res=await axios.get(`${ip}/course/${id}`)
            console.log('data for this id ',res.data)
            setUse(res.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        navigation.setOptions({ title: "Delete Course"})
        console.log('came in delete')
        effect()
        // axios.get(`${ip}/course/${id}`)
        //     .then(res => {
        //         console.log('data for this id ',res.data)
        //         setUse(res.data)
        //     })
      
    },[])

    const Accept = async()=>{

        const dept=use.department
        try{
            const r1 = await axios.delete(`${ip}/course/${id}`)
            console.log('success',r1.data)
            navigation.goBack()
        }catch(e){
            console.log('faile to delete in courses',e)
        }
        

        // axios.delete(`${ip}/universities/${id}`)
        //    .then(res => {
        //         console.log('data deleted in university ',res.data)
        //         navigation.goBack();
        //     })
        
    }

    return(
        <View>
            <View style={styles.flat}>
                <View>
                    <Text>Name: {use.name}</Text>
                    <Text>Code: {use.code}</Text>
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
  