import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import Department from './Department'
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function University({navigation}){
    const [list, setList] = useState([])
    let f=0
    const [loading, setLoading] = useState(true)

    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/universities`)
        console.log(' data ', res.data) 
        setList(res.data)
      }catch(error){
        console.log('error in univerity',error)
      }
    }

    useEffect(() => {
      let fl=1
      effect()
      // axios.get(`${ip}/universities`)
      //   .then(res => {
      //       console.log(' data ', res.data) 
      //       setList(res.data)
      //    })
      //    .catch((error) => console.error(error))
      //    .finally(() => {
      //          setLoading(false)
      //          fl=0 ;
      //     });
    }, []);

   console.log('check it out ',f,list)

   const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
        backgroundColor: '#f6f6f6',
        }} 
        onPress={()=>navigation.navigate('Department List',{
            university: item.university
      })}>
       <Text>{item.university}</Text>
    </TouchableOpacity>
    </View>
  );

   const renderItem = ({ item }) => (
    <Item item={item} />
   );

    return(
        <View>
            {loading?<Spinner
              visible={true}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />

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