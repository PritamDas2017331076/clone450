import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Section({route, navigation}){
    const [list, setList] = useState([])
    const { course_id } = route.params
    const post= useSelector(selectPost)
    const [loading, setLoading] = useState(true)

    let f=0

    useEffect(() => {
      let fl=1
      const unsubscribe = navigation.addListener('focus', () => {
            console.log('in section it is not')
            axios.get(`${ip}/course/${course_id}`)
            .then(res => {
                console.log(' data ', res.data) 
                setList(res.data.section)
             })
             .catch((error) => console.error(error))
             .finally(() => {
               setLoading(false)
               fl=0 ;
             });
        });
    
        return unsubscribe;
    }, [navigation]);


    const Item = ({ item }) => (
        <View style={styles.item}>
          <TouchableOpacity style={{
            backgroundColor: '#f6f6f6',
          }} 
            onPress={()=>navigation.navigate('Student List',{
            course_id: course_id, 
            section: item.section
        })}>
            <Text>{item.section}</Text>
        </TouchableOpacity>
        </View>
      );

   if(loading==false) console.log('check it out ',f,list)
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
            <Text>
            {
                post=='teacher'?<Button onPress={()=>{
                    navigation.navigate('Create Section',{
                        course_id: course_id
                    })
                }} title="create section" />:''
            }
            </Text>
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
  