import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList  } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function Date({route, navigation}){
    const { course_id, section } = route.params
    const [list,setList]=useState([])
    const [low,setLow]=useState('')
    const [high,setHigh]=useState('')
    const [loading, setLoading] = useState(true)
    const effect = async()=>{
      try{
        console.log(course_id,section)
        const res=await axios.get(`${ip}/byreg/srr?course_id=${course_id}&section=${section}`)
       // console.log(' data ', res.data)
        var lo,hi
        if(low=='') lo='1'
        else lo=low
        if(high=='') hi='999999999999'
        else hi=high
        let arr=res.data
        arr.sort(function(a,b){
          if(a.registration_number<b.registration_number) return -1
          else return 0
        })
        let obj;
        console.log('all',arr)
        if(arr.length == 0){
          obj = "0000";
        }
        else
          obj=arr[arr.length-1].registration_number.substring(0,4)
        console.log('testt',obj)
        let brr=[]
        let crr=[]
        arr.forEach((a)=>{
          if(a.registration_number.substring(0,4)==obj)brr.push(a)
          else crr.push(a)
        })
        console.log('brrrrrrrrrrrrrrrrr',brr)
        console.log('crrrrrrrrrrrrrrrrr',crr)
        brr=brr.concat(crr)
     //   console.log(brr,'thennn',crr)
        arr=brr
      //  console.log(arr)
        arr=arr.filter(item=>(item.registration_number>=lo && item.registration_number<=hi))
      //  console.log(arr)
        setList(arr.map((item,index)=>{
            return {registration_number:item.registration_number,record:item.record,avatar:item.avatar,id:index}
        }))
        setLoading(false)
      }catch(err){
        console.log('error reg.js',err)
      }
    }

    useEffect(() => {
        effect()
      //   let fl=1
      //   console.log(course_id,section)
      //   axios.get(`${ip}/byreg/srr?course_id=${course_id}&section=${section}`)
      //   .then(res => {
      //       console.log(' data ', res.data)
      //       let arr=res.data
      //       console.log(arr)
      //    //   arr=arr.filter(item=>(item.section==section))
      //       console.log(arr)
      //       setList(arr.map((item,index)=>{
      //           return {registration_number:item.registration_number,record:item.record,avatar:item.avatar,id:index}
      //       }))
      //  })
      //  .catch(err=>{console.log('error reg.js',err)})
      //  .finally(()=>{setLoading(false) })

  }, []);
  console.log(list)

  const Item = ({ item }) => (
    <View style={styles.item}>
       <TouchableOpacity style={{backgroundColor:'white',margin:20,flexDirection:'row'}} 
          onPress={()=>navigation.navigate('PrintRg',{
                                record: item.record,
                                course_id: course_id,
                                section: section
        })}>
            <View>
                  <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: item.avatar,
                      }}
                      />
            </View>
            <Text style={{marginLeft:'15%'}}>{item.registration_number}</Text>
        </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item item={item}  />
   );


    return(
        <View>
            {loading?<Spinner
                      visible={true}
                      textContent={'Loading...'}
                      textStyle={styles.spinnerTextStyle}
                    />
                   :
                   <View>
                    {/* <TextInput
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
                    }} title="Reset" /> */}

                    <FlatList
                         data={list}
                         contentContainerStyle={{margin:30}}
                         renderItem={renderItem}
                         keyExtractor={item => item.id}
                         ListHeaderComponent={
                          <View>
                            <TextInput style = {styles.queryText}
                              onChangeText={setLow}
                              value={low}
                              placeholder="Enter Lower Registration"
                            />
                            <TextInput style = {styles.queryText}
                              onChangeText={setHigh}
                              value={high}
                              placeholder="Enter Higher Registration"
                            />
                            <Button onPress={() => effect()} title="Filter" />
                            <Button onPress={() => {
                              setLow(''); setHigh('') ; effect();
                            }} title="Reset" />
                          </View>
                        }
                       />
                   </View>
                    }
          
        </View>
    )
}

const styles = StyleSheet.create({
  queryText: {
    padding:10,
    marginBottom:10
  },
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
    padding: 10,
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