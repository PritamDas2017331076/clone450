import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectDepartment } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@ui-kitten/components';
export default function PrintAc({route, navigation}){
    const {un, id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')
    const [acc, setAcc] = useState('')
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)

    useEffect(() => {
        let fl=1
      if(fl==1){axios.get(`${ip}/student/${id}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setUse(res.data)
            })

            axios.get(`${ip}/access/${un}`)
            .then(res => {
                console.log('data for this acc ',res.data)
                setAcc(res.data)
            })}
            return () => {
                fl=0
                };
    },[])

    const Accept = ()=>{
        const chg = {
            registration_number: use.registration_number,
            id: use._id, 
            section: acc.section,
            avatar: use.avatar
        }
        console.log(chg)

        const chk = {
            section: acc.section,
            registration_number: use.registration_number,
            course_id: acc.course_id,
            course_name: acc.course_name,
            avatar: use.avatar,
            university: university,
            department: department,
            record: []
        }

        axios.patch(`${ip}/course/student/${acc.course_id}`,chg)
            .then(res => {
                console.log('data added in studentlist ',res.data)
            })

        axios.post(`${ip}/byreg/add`,chk)
            .then(res => {
                console.log('data added in byreg ',res.data)
            })

        axios.delete(`${ip}/access/${un}`)
           .then(res => {
                console.log('data deleted in approve access ',res.data)
            })
        navigation.goBack();
    }

    const Reject = ()=>{


        axios.delete(`${ip}/access/${un}`)
            .then(res => {
                console.log('data deleted in teacher ',res.data)
            })
        navigation.goBack();
    }

    return(
        <View >
            <View style={styles.flat}>
                <View>
                    <Text>Name: {use.name}</Text>
                    <Text>Registration Number: {use.registration_number}</Text>
                    <Text>Email: {use.email}</Text>
                    <Text>Phone: {use.phone}</Text>
                    <Text>Course Name: {acc.course_name}</Text>
                    <Text>Section: {acc.section}</Text>
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
            <TextInput
              onChangeText={onChangeText}
              value={text}
            />
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Button
                    status='success'
                    onPress={Accept}
                    >Accept
                </Button>
                <Button
                    status='danger'
                    onPress={Reject}
                    >Reject
                </Button>
            </View>
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
    },
    logo: {
      width: 66,
      height: 58,
    },
    flat: {
        padding:15,
        flexDirection: 'row',
        justifyContent:'space-between',

      },
  });
  