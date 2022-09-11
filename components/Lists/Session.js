import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Session({route, navigation}){
    const [list, setList] = useState([])
    const post =useSelector(selectPost)
    const { university, department } = route.params
    const [loading, setLoading] = useState(true)

    let f=0

    useEffect(() => {
      let fl=1
      axios.get(`http://${ip}:5000/session/ud?university=${university}&department=${department}`)
        .then(res => {
            console.log(' data ', res.data)
            if(fl) setList(res.data)
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false)
          fl=0 ;
        });
    }, []);

   if(loading==false) console.log('check it out ',f,list)

   const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
            backgroundColor: '#f6f6f6',
        }} 
        onPress={()=>navigation.navigate('Course List',{
        session_id: item._id
      })}>
            <Text>{item.session}</Text>
        </TouchableOpacity>
    </View>
  );

   const renderItem = ({ item }) => (
    <Item item={item} />
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