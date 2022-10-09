import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectDepartment } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Studentlist({navigation}){
    const [list, setList] = useState([])
    const university = useSelector(selectUniversity)
    const [loading, setLoading] = useState(true)
    const department = useSelector(selectDepartment)
    let f=0

    useEffect(() => {
      let fl=1
      const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${ip}/approveS?university=${university}&department=${department}`)
            .then(res => {
                console.log('for ',university, department,' data ', res.data) 
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
            margin: 20,
            flexDirection: 'row'
           }} 
           onPress={()=>navigation.navigate('PrintS',{
                un: item._id,
                id: item.id
      })}>
          <View>
          <Text>Name: {item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Registration Number: {item.registration_number}</Text>
         </View>
         <View>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: item.avatar,
                 }}
            />
         </View>
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
                         contentContainerStyle={{paddingBottom:150}}
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
      backgroundColor: 'white',
      // padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
  });