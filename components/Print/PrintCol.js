import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';

export default function PrintCol({route, navigation}){
    const {id, course_id} = route.params

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
       
    }

    useEffect(() => {
        effect()
        // axios.get(`${ip}/teacher/${id}`)
        //     .then(res => {
        //         console.log('data for this id ',res.data)
        //         setUse(res.data)
        //     })

            
    },[])

    const Accept = async()=>{
        const chg = {
            id: id,
        }
        console.log(chg)

        try{
            const res=await axios.patch(`${ip}/course/collaboratord/${course_id}`,chg)
            console.log('data deleted in colaborator ',res.data)
            navigation.goBack();
        }catch(error){
            console.log(error)
        }

        // axios.patch(`${ip}/course/collaboratord/${course_id}`,chg)
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
      width: 100,
      height: 100,
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
  