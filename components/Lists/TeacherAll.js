import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity, CheckBox } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectDepartment, selectId } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';

export default function TeacherAll({navigation}) {
  const university = useSelector(selectUniversity)
  const department = useSelector(selectDepartment)
  const [list, setList] = useState([])
  const effect = async()=>{
    try{
      const res=await axios.get(`${ip}/teacher?university=${university}&department=${department}`)
      console.log(' data ', res.data) 
      setList(res.data)
    }catch(error){
      console.log('error in teacherall',error)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      effect()
        // axios.get(`${ip}/teacher?university=${university}&department=${department}`)
        // .then(res => {
        //     console.log(' data ', res.data) 
        //     setList(res.data)
        //  })
        //  .catch((error) => console.error(error))
    });

    return unsubscribe;

  }, [navigation]);

  const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
        backgroundColor: 'white',
      }} 
        onPress={()=>navigation.navigate('Print Teacher',{
        id: item._id,
    })}>
        <Text>{item.name}</Text>
        <Text>{item.email}</Text>
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
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  