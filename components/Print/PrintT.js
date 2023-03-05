import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import {ip} from '../ip'

export default function PrintT({route, navigation}){
    const {un, id} = route.params

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
        navigation.setOptions({ title: "Add Teacher"})
        effect()
    //     let fl=1
    //   if(fl==1){axios.get(`${ip}/teacher/${id}`)
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
            const res=await axios.patch(`${ip}/teacher/${id}`,chg)
            console.log('data updated in dhead ',res.data)
            setUse(res.data)
        }catch(error){
            console.log(error)
        }

        // axios.patch(`${ip}/teacher/${id}`,chg)
        //     .then(res => {
        //         console.log('data updated in dhead ',res.data)
        //         setUse(res.data)
        //     })

        try{
            const res=await axios.delete(`${ip}/approveT/${un}`)
            console.log('data deleted in approveDh ',res.data)
        }catch(error){
            console.log(error)
        }

        // axios.delete(`${ip}/approveT/${un}`)
        //    .then(res => {
        //         console.log('data deleted in approveDh ',res.data)
        //     })
        navigation.goBack();
    }

    const Reject = async()=>{

        try{
            const res=await axios.delete(`${ip}/approveT/${un}`)
            console.log('data deleted in approveT ',res.data)
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
      width: 150,
      height: 150,
    },
    logo: {
      width: 166,
      height: 158,
    },
    flat: {
        flexDirection: 'row',
      },
  });
  