import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function PrintDt({route, navigation}){
    const { record, course_id, section,id,date } = route.params
    console.log('kkd',course_id,id,date)
    const [list, setList]=useState([])
    const [total, setTotal]=useState(0)
    const [low,setLow]=useState('')
    const [high,setHigh]=useState('')
    const present=record.length

    const effect = async()=>{
      console.log('got it na??')
      try{
        const res=await axios.get(`${ip}/course/${course_id}`)
        console.log('student data in printdt',res.data.student)
        var lo,hi
        if(low=='') lo='1'
        else lo=low
        if(high=='') hi='999999999999'
        else hi=high
        let arr=res.data.student
        arr=arr.filter(ele=>(ele.section==section))
        //console.log('arr',arr)
        arr.sort(function(a,b){
          if(a.registration_number<b.registration_number) return -1
          else return 0
        })
       // console.log('all arry',arr)
        let obj=arr[arr.length-1].registration_number.substring(0,4)
        let brr=[]
        let crr=[]
        arr.forEach((a)=>{
          if(a.registration_number.substring(0,4)==obj)brr.push(a)
          else crr.push(a)
        })
        brr=brr.concat(crr)
        arr=brr
        console.log('sorted array arr',brr)
        arr=arr.filter(item=>(item.registration_number>=lo && item.registration_number<=hi))
        //console.log('sortted in printdt',arr)
        setList(arr.map((item, index)=>{
          let arr=record.filter((ele)=>(ele.registration_number==item.registration_number))
          if(arr.length==0){
            return {registration_number: item.registration_number, id: index, avatar: item.avatar, status: false}
          } else{
            return {registration_number: item.registration_number, id: index, avatar: item.avatar, status: true}
          }

        }))
      }catch(error){
        console.log(error)
      }

    }


    useEffect(() => {
      effect()
      
      // axios.get(`${ip}/course/${course_id}`)
      // .then(res=>{
      //   console.log('student data in printdt',res.data.student)
      //   let arr=res.data.student
      //   arr=arr.filter(ele=>(ele.section==section))
      //   //console.log('arr',arr)
      //   arr.sort(function(a,b){
      //     if(a.registration_number<b.registration_number) return -1
      //     else return 0
      //   })
      //  // console.log('all arry',arr)
      //   let obj=arr[arr.length-1].registration_number.substring(0,4)
      //   let brr=[]
      //   let crr=[]
      //   arr.forEach((a)=>{
      //     if(a.registration_number.substring(0,4)==obj)brr.push(a)
      //     else crr.push(a)
      //   })
      //   brr=brr.concat(crr)
      //   arr=brr
      //   console.log('sorted array arr',brr)
      //   //console.log('sortted in printdt',arr)
      //   setList(arr.map((item, index)=>{
      //     let arr=record.filter((ele)=>(ele.registration_number==item.registration_number))
      //     if(arr.length==0){
      //       return {registration_number: item.registration_number, id: index, avatar: item.avatar, status: false}
      //     } else{
      //       return {registration_number: item.registration_number, id: index, avatar: item.avatar, status: true}
      //     }

      //   }))
      // })
    },[])

    const func = async()=>{
      const chg={date: date }
      const chh={date: date, section: section }
      try{
        const res=await axios.delete(`${ip}/bydate/${id}`)
        console.log('successfully deleted bydate')
        console.log(res.data)
      }catch(err){
        console.log('error occurred in bydate while delete',err)
      }
      try{
        const res=await axios.patch(`${ip}/byreg/regd?course_id=${course_id}&section=${section}`,chg)
        console.log('successfully updated in byreg')
        console.log(res.data)
      }catch(err){
        console.log('error occurred byreg while patch',err)
      }
      try{
        const res=await axios.patch(`${ip}/course/recordd/${course_id}`,chh)
        console.log('successfully updated in course record')
        console.log(res.data)
        navigation.goBack()
      }catch(err){
        console.log('error occurred course record while patch',err)
      }
      // axios.delete(`${ip}/bydate/${id}`)
      //   .then(res=>{
      //     console.log('successfully deleted bydate')
      //     axios.patch(`${ip}/byreg/regd?course_id=${course_id}&section=${section}`,chg)
      //       .then(res=>{
      //         console.log('successfully updated in byreg')
      //         axios.patch(`${ip}/course/recordd/${course_id}`,chh)
      //           .then(res=>{
      //             console.log('successfully updated in course record')
      //           })
      //           .catch(err=>{console.log('error occurred course record',err)})
      //           .finally(()=>{navigation.goBack()})
      //       })
      //       .catch(err=>{console.log('error occurred in byreg',err)})
      //   })
      //   .catch(err=>{console.log('error occurred bydate',err)})


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
              <TextInput
                onChangeText={setLow}
                value={low}
                placeholder="Enter Lower Registration"
              />
              <TextInput
                onChangeText={setHigh}
                value={high}
                placeholder="Enter Higher Registration"
              />
              <Button onPress={() => effect()} title="Filter" />
              <Button onPress={() => {
                setLow(''); setHigh('') ; effect();
              }} title="Reset" />
              <FlatList
                  data={list}
                  contentContainerStyle={{paddingBottom:150}}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  ListFooterComponent={<Button onPress={func} title="Delete" />}
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