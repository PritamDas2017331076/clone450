import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, StyleSheet, TouchableOpacity, Pressable, TextInput, SafeAreaView, StatusBar, FlatList, Image } from 'react-native';
import {ip} from '../ip'
import { Card, Text } from '@ui-kitten/components';
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function Utake({route, navigation}){
    const { course_id, section, record, date, pid } = route.params
    const [dist, setDist] = useState([])
    const [lost,setLost]=useState([])
    console.log('dist',dist)
    let f=0
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/course/${course_id}`)
        console.log('data',res.data.student)
        let arr=res.data.student
        arr=arr.filter(ele=>(ele.section==section))
        arr.sort(function(a,b){
          if(a.registration_number<b.registration_number) return -1
          else return 0
        })
        console.log('all',arr)
        let obj=arr[arr.length-1].registration_number.substring(0,4)
        let brr=[]
        let crr=[]
        arr.forEach((a)=>{
          if(a.registration_number.substring(0,4)==obj)brr.push(a)
          else crr.push(a)
        })
        brr=brr.concat(crr)
        console.log(brr,'thennn',crr)
        arr=brr
        setDist(arr.map((item,index)=>{
          let br=record.filter(ele=>(item.registration_number==ele.registration_number))
          if(br.length==0){
              return {registration_number: item.registration_number, avatar: item.avatar, id: item.id, status: false}
          }else{
              return {registration_number: item.registration_number, avatar: item.avatar, id: item.id, status: true}
          }
        }))
        
      }
      catch(err){
        console.log('could not find data',err)
      }
    }

    useEffect(() => {
      navigation.setOptions({ title: "Update Attendance"})
      effect()
      // axios.get(`${ip}/course/${course_id}`)
      //  .then(res=>{
      //     console.log('data',res.data.student)
      //     let arr=res.data.student
      //     arr=arr.filter(ele=>(ele.section==section))
      //     arr.sort(function(a,b){
      //       if(a.registration_number<b.registration_number) return -1
      //       else return 0
      //     })
      //     console.log('all',arr)
      //     let obj=arr[arr.length-1].registration_number.substring(0,4)
      //     let brr=[]
      //     let crr=[]
      //     arr.forEach((a)=>{
      //       if(a.registration_number.substring(0,4)==obj)brr.push(a)
      //       else crr.push(a)
      //     })
      //     brr=brr.concat(crr)
      //     console.log(brr,'thennn',crr)
      //     arr=brr
      //     setDist(arr.map((item,index)=>{
      //       let br=record.filter(ele=>(item.registration_number==ele.registration_number))
      //       if(br.length==0){
      //           return {registration_number: item.registration_number, avatar: item.avatar, id: item.id, status: false}
      //       }else{
      //           return {registration_number: item.registration_number, avatar: item.avatar, id: item.id, status: true}
      //       }
      //     }))
      //  })
      //  .catch(err=>{
      //   console.log('could not find data',err)
      //  })


  }, []);

   const Submit = async()=>{
    console.log('hello')
    console.log('record',record)
    let dd=[]
    let dld=[]
    let dpd=[]
    dist.forEach(ele=>{
      if(ele.status==true) {
        dd.push({registration_number: ele.registration_number,avatar: ele.avatar})
        dld.push({registration_number: ele.registration_number,date: dat})
      }else{
        dpd.push({registration_number: ele.registration_number,date: dat})
      }
    })
    console.log(dd)
    const data={
      record: dd,
    }
    try{
      const res=await axios.patch(`${ip}/bydate/${pid}`,data)
      console.log('suucess while updating byate',res.data)
    }catch(e){
      console.log('error in bydate',e) 
    }
    try{
      const res=await axios.patch(`${ip}/byreg/srd?course_id=${course_id}&section=${section}`,dpd)
      console.log('suucess while updating byregsrd',res.data)
    }catch(e){
      console.log('error in byregsrd',e) 
    }
    // axios.patch(`${ip}/bydate/${pid}`,data)
    //  .then(res=>{
    //    console.log('recorded data',res.data)
    //  })
    try{
      const res=await axios.patch(`${ip}/byreg/sr?course_id=${course_id}&section=${section}`,dld)
      console.log('suucess while updating byregsr',res.data)
    }catch(e){
      console.log('error in byregsr',e) 
    }
    //  dist.map(async(ele)=>{
    //   const chg={
    //     date: date,
    //   }
    //   console.log('registration',ele.registration_number,chg)
    //   if(ele.status==true){
    //     try{
    //       const res=await axios.patch(`${ip}/byreg/sr?course_id=${course_id}&section=${section}&registration_number=${ele.registration_number}`,chg)
    //       console.log('suucess while updating byregsr',res.data)
    //     }catch(e){
    //       console.log('error in byregsr',e) 
    //     }
    //     // axios.patch(`${ip}/byreg/sr?course_id=${course_id}&section=${section}&registration_number=${ele.registration_number}`,chg)
    //     // .then(res=>{
    //     //   console.log('date udated sr ',res.data)
    //     // })
    //   }
    //   else{
    //     try{
    //       const res=await axios.patch(`${ip}/byreg/srd?course_id=${course_id}&section=${section}&registration_number=${ele.registration_number}`,chg)
    //       console.log('suucess while updating byregsrd',res.data)
    //     }catch(e){
    //       console.log('error in byregsrd',e) 
    //     }
        
    //     // axios.patch(`${ip}/byreg/srd?course_id=${course_id}&section=${section}&registration_number=${ele.registration_number}`,chg)
    //     // .then(res=>{
    //     //   console.log('date updated srd ',res.data)
    //     // })
    //   }
    // })
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
    <View style={{flexDirection: 'row'}} >
    {/* <Pressable
       style={[styles.checkboxBase, item.status && styles.checkboxChecked]}
       onPress={()=>setVal(item.id)}>
       {item.status && <Ionicons name="checkmark" size={24} color="white" /> } 
    </Pressable> */}
    <Card onPress={()=>setVal(item.id)} footer={
      <Pressable onPress={()=>setVal(item.id)}>
        <Text>{item.registration_number}</Text>
          <Pressable
            style={[styles.checkboxBase, item.status && styles.checkboxChecked]}
            onPress={()=>setVal(item.id)}>
            {item.status && <Ionicons name="checkmark" size={32} color="white" /> }
          </Pressable>
      </Pressable>
    } style={{marginBottom:20}}>
        <Image
            style={styles.tinyLogo}
            source={{
                uri: item.avatar,
            }}
        />
    </Card>
</View>
  );

  const renderItem = ({ item }) => (
    <Item item={item}  />
   );


    return(
        <View style = {{padding:10,margin:5,marginHorizontal:'10%'}}>

            <Text style={{marginHorizontal:'25%',padding:5}}>{date[1]} {""} {date[2]} {""} {date[4]}</Text>
            <View>
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
    // flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding:10
  },
  checkboxContainer: {
    // flexDirection: "row",
    margin: 20,
    // alignItems: 'center',
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
  checkboxBase: {
    width: 40,
    height: 40,
    // padding:10,
    marginLeft:170,
    marginTop:-20,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
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
    fontWeight: 5,
    fontSize: 18,
  },
  tinyLogo: {
    width: 250,
    height: 250,
  },
});