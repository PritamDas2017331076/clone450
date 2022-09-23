import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, SafeAreaView, StatusBar, FlatList, Image } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function Utake({route, navigation}){
    const { course_id, section, record, date, pid } = route.params
    const [dist, setDist] = useState([])
    const [lost,setLost]=useState([])
    console.log('dist',dist)
    let f=0

    useEffect(() => {
      axios.get(`${ip}/course/${course_id}`)
       .then(res=>{
          console.log('data',res.data.student)
          let arr=res.data.student
          arr=arr.filter(ele=>(ele.section==section))
          setDist(arr.map((item,index)=>{
            let br=record.filter(ele=>(item.registration_number==ele.registration_number))
            if(br.length==0){
                return {registration_number: item.registration_number, avatar: item.avatar, id: item.id, status: false}
            }else{
                return {registration_number: item.registration_number, avatar: item.avatar, id: item.id, status: true}
            }
          }))
       })
       .catch(err=>{
        console.log('could not find data',err)
       })


  }, []);

   const Submit = ()=>{
    console.log('hello')
    console.log('record',record)
    let dd=[]
    dist.forEach(ele=>{
      if(ele.status==true) {
        dd.push({registration_number: ele.registration_number,avatar: ele.avatar})
      }
    })
    console.log(dd)
    const data={
      record: dd,
    }
    axios.patch(`${ip}/bydate/${pid}`,data)
     .then(res=>{
       console.log('recorded data',res.data)
     })
     dist.map((ele)=>{
      const chg={
        date: date,
      }
      console.log('registration',ele.registration_number,chg)
      if(ele.status==true){
        axios.patch(`${ip}/byreg/sr?course_id=${course_id}&section=${section}&registration_number=${ele.registration_number}`,chg)
        .then(res=>{
          console.log('date udated sr ',res.data)
        })
      }
      else{
        axios.patch(`${ip}/byreg/srd?course_id=${course_id}&section=${section}&registration_number=${ele.registration_number}`,chg)
        .then(res=>{
          console.log('date updated srd ',res.data)
        })
      }
    })
     navigation.goBack()

   }

   const setVal = (id)=>{
    setDist(
        dist.map((item) =>
                // Here you accept a id argument to the function and replace it with hard coded 🤪 2, to make it dynamic.
                item.id === id
                    ? { ...item, status: !item.status }
                    : { ...item }
            )
    )
   }

   const Item = ({ item }) => (
    <View style={styles.checkboxContainer}>
      <View style={{flexDirection: 'row'}}>
          <Pressable
             style={[styles.checkboxBase, item.status && styles.checkboxChecked]}
             onPress={()=>setVal(item.id)}>
             {item.status && <Ionicons name="checkmark" size={24} color="white" /> } 
          </Pressable>
          <View>
              <Image
                  style={styles.tinyLogo}
                  source={{
                      uri: item.avatar,
                  }}
              />
          </View>
          <Text>{item.registration_number}</Text>
      </View>
          {/* <Pressable
             style={[styles.checkboxBase, checked && styles.checkboxChecked]}
             onPress={onCheckmarkPress}>
             {item.status && <Ionicons name="checkmark" size={24} color="white" /> } <Text>{item.registration_number}</Text>
          </Pressable>
          <CheckBox
              value={item.status}
              onValueChange={()=>setVal(item.id)}
              style={styles.checkbox}
          />
              <Text>{item.registration_number}</Text> */}
    </View>
  );

  const renderItem = ({ item }) => (
    <Item item={item}  />
   );


    return(
        <View>
            {/*<ul>
                {
                    list.map(item =>(
                        <li key={item._id}>
                            {item.registration_number}
                        </li>
                    ))
                }
            </ul>*/}
            <Text>{date}</Text>
            <View>
            {/*<ul>
                {
                    dist.map((item,index) =>(
                        <li key={index}>
                           
                               <View style={styles.checkboxContainer}>
                               <CheckBox
                                  value={item.status}
                                  onValueChange={()=>setVal(item.id)}
                                  style={styles.checkbox}
                                />
                                  <Text>{item.registration_number}</Text>
                                </View>
                        </li>
                       ))
                }
            </ul>*/}
              <FlatList
                data={dist}
                contentContainerStyle={{paddingBottom:150}}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<Button onPress={Submit} title="Submit" />}
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
    alignItems: 'center',
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
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: 'coral',
  },

  appContainer: {
    flex: 1,
    alignItems: 'center',
  },

  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});