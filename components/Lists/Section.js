import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectPost, selectId } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Section({route, navigation}){
    const [list, setList] = useState([])
    const { course_id } = route.params
    const post= useSelector(selectPost)
    const [loading, setLoading] = useState(true)
    const id= useSelector(selectId)
    const [tid, setTid]=useState()

    let f=0

    useEffect(() => {
      let fl=1
      const unsubscribe = navigation.addListener('focus', () => {
            console.log('in section it is not')
            axios.get(`${ip}/course/${course_id}`)
            .then(res => {
                console.log(' data ', res.data) 
                setList(res.data.section)
                setTid(res.data.teacher_id)
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
            backgroundColor: 'white',alignItems:'center'
          }} 
            onPress={()=>navigation.navigate('Student List',{
            course_id: course_id, 
            section: item.section
        })}>
            <Text>{item.section}</Text>
            {post=='department_head'?<Button onPress={()=>{
              navigation.navigate('Section Info',{
                id: course_id,
                section: item.section
              })
            }} title="Section Details"/>:null}
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
            <View style={{Width:50,marginHorizontal:'10%'}}>
            {
                post=='teacher'?<Button
                onPress={()=>{
                    navigation.navigate('Create Section',{
                        course_id: course_id
                    })
                }} title="Create Section" />:null
            }
            </View>
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
      // display:'flex',
      marginTop: StatusBar.currentHeight || 0,
      // flexDirection:'row'
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      width:350,
      marginVertical: 8,
      flex:1,
      marginHorizontal:'10%',
      // flexDirection:'row'
    },
    title: {
      fontSize: 32,
    },
    flexType:{
      backgroundColor:'red',
      display:'flex',
      flexDirection:'column'
    }
  });
  