import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import {ip} from '../ip'

export default function PrintAdmin({route, navigation}){
    const {un, id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')
    const effect = async()=>{
        try{
            const res=await axios.get(`${ip}/university_admin/${id}`)
            console.log('data for this id ',res.data)
            setUse(res.data)
        }catch(error){
            console.log(error)
        }
       
    }

    useEffect(() => {
        effect()
    //     let fl=1
    //   if(fl==1){axios.get(`${ip}/university_admin/${id}`)
    //         .then(res => {
    //             console.log('data for this id ',res.data)
    //             setUse(res.data)
    //         })}
    //         return () => {
    //             fl=0
    //             };
    },[])

    const Accept = async()=>{
        const chg = {
            activated: true
        }
        try{
            const res=await axios.patch(`${ip}/university_admin/${id}`,chg)
            console.log('data updated in uadmin ',res.data)
            setUse(res.data)
        }catch(error){
            console.log(error)
        }
        // axios.patch(`${ip}/university_admin/${id}`,chg)
        //     .then(res => {
        //         console.log('data updated in uadmin ',res.data)
        //         setUse(res.data)
        //     })

        try{
            const res=await axios.delete(`${ip}/approve/${un}`)
            console.log('data deleted in approve ',res.data)
        }catch(error){
            console.log(error)
        }

        // axios.delete(`${ip}/approve/${un}`)
        //    .then(res => {
        //         console.log('data deleted in approve ',res.data)
        //     })
        navigation.goBack();
    }

    const Reject = async()=>{

        try{
            const res=await axios.delete(`${ip}/approve/${un}`)
            console.log('data deleted in approve ',res.data)
        }catch(error){
            console.log(error)
        }

        // axios.delete(`${ip}/approve/${un}`)
        //    .then(res => {
        //         console.log('data deleted in approve ',res.data)
        //     })
        try{
            const res=await axios.delete(`${ip}/university_admin/${id}`)
            console.log('data deleted in uadmin ',res.data)
        }catch(error){
            console.log(error)
        }

        // axios.delete(`${ip}/university_admin/${id}`)
        //     .then(res => {
        //         console.log('data deleted in uadmin ',res.data)
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
              title="Accept"
              onPress={Accept}
            />
            <Button
              title="Reject"
              onPress={Reject}
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
  