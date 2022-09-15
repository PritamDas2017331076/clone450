import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';

export default function PrintSt({route, navigation}){
    const {id, course_id,reg} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')
    const [acc, setAcc] = useState('')

    useEffect(() => {
        axios.get(`${ip}/student/${id}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setUse(res.data)
            })

            
    },[])

    const Accept = async()=>{
        const chg = {
            registration_number: reg
        }
        console.log(chg)
        try{
            const res = await axios.patch(`${ip}/course/studentd/${course_id}`,chg)
            console.log(res.data)

        }catch(err){
            console.log(err.message)
        }

        try{
            const res = await axios.delete(`${ip}/byreg/del?registration_number=${reg}&course_id=${course_id}`)
            console.log(res.data)

        }catch(err){
            console.log(err.message)
        }
        navigation.goBack()


        // axios.patch(`${ip}/course/studentd/${course_id}`,chg)
        //     .then(res => {
        //         console.log('data deleted in colaborator ',res.data)
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
  