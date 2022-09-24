import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Button,Text } from '@ui-kitten/components';
import {ip} from '../ip'

export default function PrintS({route, navigation}){
    const {un, id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')

    useEffect(() => {
        let fl=1
      if(fl==1){axios.get(`${ip}/student/${id}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setUse(res.data)
            })}
            return () => {
                fl=0
                };
    },[])

    const Accept = ()=>{
        const chg = {
            activated: true
        }

        axios.patch(`${ip}/student/${id}`,chg)
            .then(res => {
                console.log('data updated in dhead ',res.data)
                setUse(res.data)
            })

        axios.delete(`${ip}/approveS/${un}`)
           .then(res => {
                console.log('data deleted in approveDh ',res.data)
            })
        navigation.goBack()
    }

    const Reject = ()=>{

        axios.delete(`${ip}/approveS/${un}`)
           .then(res => {
                console.log('data deleted in approve ',res.data)
            })

        axios.delete(`${ip}/student/${id}`)
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
                    <Text>Reg. Number: {use.registration_number}</Text>
                    <Text>Email: {use.email}</Text>
                    <Text>Phone: {use.phone}</Text>
                    <Text>University: {use.university}</Text>
                    <Text>Department: {use.department}</Text>
                    <Text>Post: {use.post}</Text>
                </View>
                <View style = {{}}>
                    <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: use.avatar,
                    }}
                    />
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Button
                onPress={Accept}
                status='success'
                >Accept</Button>
                <Button
                onPress={Reject}
                status='danger'
                >Refect</Button>
            </View>
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
      paddingTop: 5,
    },
    tinyLogo: {
      width: 150,
      height: 150,
    },
    // logo: {
    //   width: 66,
    //   height: 58,
    // },
    flat: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding:20,
      },
    
  });
  