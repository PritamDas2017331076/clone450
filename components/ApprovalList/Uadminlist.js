import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'

export default function Uadminlist({navigation}){
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    let f=0

   

    useEffect(() => {
      let fl=1
      const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ip}:5000/approve`)
            .then(res => {
                console.log(res.data) 
                setList(res.data)
            })
            .catch((error) => console.error(error))
            .finally(() => {
               setLoading(false)
               fl=0 ;
             });
        });
    
        return unsubscribe;
      }, [navigation]);

   console.log('check it out ',f,list)

   const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
           backgroundColor: '#f6f6f6',
           }} 
           onPress={()=>navigation.navigate('PrintAdmin',{
                un: item._id,
                id: item.id
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