import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';

export default function PrintAct({route, navigation}){
    const {un, id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')
    const [acc, setAcc] = useState('')
    const effect = async()=>{
        try{
            const res=await axios.get(`${ip}/teacher/${id}`)
            console.log('data for this id ',res.data)
            setUse(res.data)
        }catch(error){
            console.log(error)
        }
        try{
            const res=await axios.get(`${ip}/approveCo/${un}`)
            console.log('data for this acc ',res.data)
            setAcc(res.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        navigation.setOptions({ title: "Add Collaborator"})
        effect()
    //     let fl=1
    //   if(fl==1){axios.get(`${ip}/teacher/${id}`)
    //         .then(res => {
    //             console.log('data for this id ',res.data)
    //             setUse(res.data)
    //         })

    //         axios.get(`${ip}/approveCo/${un}`)
    //         .then(res => {
    //             console.log('data for this acc ',res.data)
    //             setAcc(res.data)
    //         })}
    //         return () => {
    //             fl=0
    //             };
    },[])

    const Accept = async()=>{
        const chg = {
            id: acc.id,
            name: acc.name,
            email: acc.email,
            avatar: use.avatar
        }
        console.log(chg,acc.id,use._id)
        try{
            const res=await axios.patch(`${ip}/course/collaborator/${acc.course_id}`,chg)
            console.log(res.data)
        }catch(e){
            console.log('error patch',e)
        }
        try{
            const res=await axios.delete(`${ip}/approveCo/${un}`)
            console.log(res.data)
        }catch(e){
            console.log('error delete',e)
        }
        navigation.goBack();
    }

    const Reject = async()=>{

        try{
            const res=await axios.delete(`${ip}/approveCo/${un}`)
            console.log('data deleted teacher approval colab ',res.data)
        }catch(e){
            console.log('error delete',e)
        }


        navigation.goBack();
    }

    return(
        <View>
            <View style={styles.flat}>
                <View>
                    <Text>Name: {use.name}</Text>
                    <Text>Email: {use.email}</Text>
                    <Text>Phone: {use.phone}</Text>
                    <Text>Course Name: {acc.course_name}</Text>
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
  