import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectPost, selectId } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { Button } from '@ui-kitten/components';
export default function Section({route, navigation}){
    const [list, setList] = useState([])
    const { course_id } = route.params
    const post= useSelector(selectPost)
    const [loading, setLoading] = useState(true)
    const id= useSelector(selectId)
    const [tid, setTid]=useState()

    let f=0
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/course/${course_id}`)
        console.log(' data ', res.data) 
        setList(res.data.section)
        setTid(res.data.teacher_id)
        setLoading(false)
      }catch(error){
        console.log('error in dheadall',error)
      }
    }

    useEffect(() => {
      let fl=1
      const unsubscribe = navigation.addListener('focus', () => {
            console.log('in section it is not')
            effect()
            // axios.get(`${ip}/course/${course_id}`)
            // .then(res => {
            //     console.log(' data ', res.data) 
            //     setList(res.data.section)
            //     setTid(res.data.teacher_id)
            //  })
            //  .catch((error) => console.error(error))
            //  .finally(() => {
            //    setLoading(false)
            //    fl=0 ;
            //  });
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
        </TouchableOpacity>
            {post=='department_head'?<Button style={{width:200,alignSelf:'center'}} onPress={()=>{
              navigation.navigate('Section Info',{
                id: course_id,
                section: item.section
              })
            }}>Section Details</Button>:null}
        </View>
      );

   if(loading==false) console.log('check it out ',f,list)
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
                         contentContainerStyle={{paddingBottom:150}}
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
                }}>Create Section</Button>:null
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
      padding: 5,
      width:350,
      marginVertical: 8,
      flex:1,
      marginHorizontal:'10%',
      // flexDirection:'row'
    },
    title: {
      fontSize: 32,
    },
  });
  