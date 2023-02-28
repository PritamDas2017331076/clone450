import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function Session({route, navigation}){
    const [list, setList] = useState([])
    const post =useSelector(selectPost)
    const { university, department } = route.params
    const [loading, setLoading] = useState(true)

    let f=0
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/session/ud?university=${university}&department=${department}`)
        console.log(' data ', res.data)
        setList(res.data)
        setLoading(false)
      }catch(error){
        console.log('error in sessionjs',error)
      }
    }

    useEffect(() => {
      console.log('we are here in session list')
      let fl=1
      effect()
      // axios.get(`${ip}/session/ud?university=${university}&department=${department}`)
      //   .then(res => {
      //       console.log(' data ', res.data)
      //       if(fl) setList(res.data)
      //   })
      //   .catch((error) => console.error(error))
      //   .finally(() => {
      //     setLoading(false)
      //     fl=0 ;
      //   });
    }, []);

   if(loading==false) console.log('check it out ',f,list)

   const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
            backgroundColor: 'white',
        }}
        onPress={()=>navigation.navigate('Course List',{
        session_id: item._id,
        session: item.session
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
            {loading?<Spinner
                visible={true}
                textContent={'Loading...'}
            />
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
      marginTop: StatusBar.currentHeight || 20,
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      paddingHorizontal:'15%',
      marginVertical: 8,
      marginHorizontal: "10%",
      width:250
    },
    title: {
      fontSize: 32,
    },
  });