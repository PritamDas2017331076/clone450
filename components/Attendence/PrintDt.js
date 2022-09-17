import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function PrintDt({route, navigation}){
    const { record, course_id, section,id,date } = route.params
    console.log(course_id,id,date)
    const [list, setList]=useState([])

    useEffect(() => {
      axios.get(`${ip}/course/${course_id}`)
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

    const func = ()=>{
      const chg={date: date }
      const chh={date: date, section: section }
      axios.delete(`${ip}/bydate/${id}`)
        .then(res=>{
          console.log('successfully deleted bydate')
          axios.patch(`${ip}/byreg/regd?course_id=${course_id}&section=${section}`,chg)
            .then(res=>{
              console.log('successfully updated in byreg')
              axios.patch(`${ip}/course/recordd/${course_id}`,chh)
                .then(res=>{
                  console.log('successfully updated in course record')
                })
                .catch(err=>{console.log('error occurred course record',err)})
                .finally(()=>{navigation.goBack()})
            })
            .catch(err=>{console.log('error occurred in byreg',err)})
        })
        .catch(err=>{console.log('error occurred bydate',err)})
      // axios.patch(`http://${ip}:5000/byreg/regd?course_id=${course_id}&section=${section}`,chg)
      //   .then(res=>{
      //     console.log('successfully updated in byreg')
      //   })
      //   .catch(err=>{console.log('error occurred in byreg',err)})
      // axios.patch(`http://${ip}:5000/course/recordd/${course_id}`,chh)
      //   .then(res=>{
      //     console.log('successfully updated in course record')
      //   })
      //   .catch(err=>{console.log('error occurred course record',err)})
    }

    const Item = ({ item }) => (
      <View style={styles.item}>
         <View style={{flexDirection:'row'}}>
               <View>
                  <Image
                      style={styles.tinyLogo}
                      source={{
                          uri: item.avatar,
                      }}
                  />
               </View>
               <Text style={{marginLeft :'10%'}}>{item.registration_number}</Text>
               {
                item.status==true? <Text style={{marginLeft:'20%'}}>Present</Text>: <Text style={{marginLeft:'20%'}}>Absent</Text>
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
            <Button
              title="Delete"
              onPress={func}
            />
       
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
    backgroundColor: 'white',
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