import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList  } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Date({route, navigation}){
    const { course_id,section } = route.params
    const [dist,setDist]=useState([])
    const [loading, setLoading] = useState(true)
    let fl=1


    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        axios.get(`http://${ip}:5000/bydate/sec?course_id=${course_id}&section=${section}`)
          .then(res=>{
            console.log(course_id,res.data)
            setDist(res.data.map((item,index)=>{
                return {date:item.date,record:item.record,id:item._id}
            }))
          })
          .catch((error) => console.error(error))
          .finally(() => {
            setLoading(false)
            fl=0 ;
          });
        })

  }, [navigation]);

  console.log(dist)
    const Item = ({ item }) => (
      <View style={styles.item}>
         <TouchableOpacity style={{backgroundColor:'#f6f6f6',margin:20}} 
              onPress={()=>navigation.navigate('PrintDt',{
              record: item.record,
              course_id: course_id,
              section: section
         })}>
          <View>
              <Text>{item.date}</Text>
              <View>
              <Button onPress={()=>{
                    navigation.navigate('Utake',{
                        course_id: course_id,
                        section: section,
                        record: item.record,
                        date: item.date,
                        pid: item.id
                    })
                }} title="update"/>
              </View>
          </View>
         </TouchableOpacity>
                           
         {/* <View style={styles.checkboxContainer}>
              <Text>{item.registration_number}</Text>
          </View> */}
      </View>
    );

    const renderItem = ({ item }) => (
      <Item item={item}   />
     );


    return(
        <View>
            {loading?<Text>loading</Text>
                   :<FlatList
                         data={dist}
                         renderItem={renderItem}
                         keyExtractor={item => item.id}
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
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
      marginRight:20
    },
    label: {
      margin: 8,
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