import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function PrintDt({route, navigation}){
    const { record, course_id, section } = route.params
    const [list, setList]=useState([])

    useEffect(() => {
      axios.get(`http://${ip}:5000/course/${course_id}`)
      .then(res=>{
        let arr=res.data.student
        arr=arr.filter(ele=>(ele.section==section))
        setList(arr.map((item, index)=>{
          let arr=record.filter((ele)=>(ele.registration_number==item.registration_number))
          if(arr.length==0){
            return {registration_number: item.registration_number, id: index, avatar: item.avatar, status: false}
          } else{
            return {registration_number: item.registration_number, id: index, avatar: item.avatar, status: true}
          }

        }))
      })
    },[])

    const Item = ({ item }) => (
      <View style={styles.item}>
         <View style={{flexDirection:'row'}}>
               <Text style={{marginRight :20}}>{item.registration_number}</Text>
               <View>
                  <Image
                      style={styles.tinyLogo}
                      source={{
                          uri: item.avatar,
                      }}
                  />
               </View>
               {
                item.status==true? <Text>Present</Text>: <Text>Absent</Text>
               }
          </View>
      </View>
    );
  
    const renderItem = ({ item }) => (
      <Item item={item}  />
     );
    


    return(
        <View>
            <View>
            {/*<ul>
                {
                    record.map((item,index) =>(
                        <li key={index}>
                            <View style={{flexDirection:'row'}}>
                               <Text style={{marginRight :20}}>{item.registration_number}</Text>
                               <Text>
                               {
                                item.status?'Present':'Absent'
                               }
                               </Text>
                            </View>
                           
                           
                        </li>
                       ))
                }
            </ul>*/}
              <FlatList
                  data={list}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
            </View>
       
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});