import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity, CheckBox } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectId } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';

export default function StudentC({route, navigation}) {
  const { course_id, section } = route.params
  const [list, setList] = useState([])
  const effect = async()=>{
    try{
      const res=await axios.get(`${ip}/course/${course_id}`)
      console.log(' data ', res.data) 
      let dd=res.data.student
      dd=dd.filter(st=>st.section==section)
      let arr=dd
      arr.sort(function(a,b){
        if(a.registration_number<b.registration_number) return -1
        else return 0
      })
      console.log('all',arr)
      let obj=arr[arr.length-1].registration_number.substring(0,4)
      let brr=[]
      let crr=[]
      arr.forEach((a)=>{
        if(a.registration_number.substring(0,4)==obj)brr.push(a)
        else crr.push(a)
      })
      brr=brr.concat(crr)
      console.log(brr,'thennn',crr)
      arr=brr
      dd=arr
      setList(dd)
    }catch(error){
      console.log('error in studentc',error)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      effect()
        // axios.get(`${ip}/course/${course_id}`)
        // .then(res => {
        //     console.log(' data ', res.data) 
        //     let dd=res.data.student
        //     dd=dd.filter(st=>st.section==section)
        //     setList(dd)
        //  })
        //  .catch((error) => console.error(error))
    });

    return unsubscribe;

  }, [navigation]);
  const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
        backgroundColor: '#f6f6f6',
      }} 
        onPress={()=>navigation.navigate('Print Student',{
        id: item.id,
        reg: item.registration_number,
        course_id: course_id
    })}>
        <Text>{item.id}</Text>
        <Text>{item.registration_number}</Text>
        <Image
            style={styles.tinyLogo}
            source={{
                uri: item.avatar,
            }}
        />
    </TouchableOpacity>
    </View>
  );

    const renderItem = ({ item }) => (
    <Item item={item} />
    );

  return (
    <View>
      <FlatList
        data={list}
        contentContainerStyle={{paddingBottom:150}}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    tinyLogo: {
      width: 110,
      height: 150,
    },
  });
  