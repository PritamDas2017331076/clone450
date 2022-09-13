import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';

const Item = ({ item, university, navigation }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
          backgroundColor: '#f6f6f6',
     }} 
        onPress={()=>navigation.navigate('Session List',{
         university: university,
         department: item.department
        })}>
        <Text>{item.department}</Text>
     </TouchableOpacity>
    </View>
  );


export default function Department({route, navigation}){
    const [list, setList] = useState([])
    console.log(route.params)
    const { university } = route.params
    console.log(university)
    let f=0
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      let fl=1
      axios.get(`${ip}/department_head?university=${university}`)
        .then(res => {
            console.log('for ',university,' data ', res.data)
            if(fl==1) setList(res.data)
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false)
          fl=0 ;
        });

    }, []);

   if(loading==false) console.log('check it out ',f,list)
   const renderItem = ({ item }) => (
    <Item item={item} university={university} navigation={navigation} />
   );

    return(
        <View>
            {loading?<Text>loading</Text>
                   :<FlatList
                         data={list}
                         renderItem={renderItem}
                         keyExtractor={item => item._id}
                       />
                    }
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
  });
  