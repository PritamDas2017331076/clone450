import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function PrintRg({route, navigation}){
    const { course_id, record, section } = route.params
    const [dist, setDist] = useState([])
    const [loading, setLoading] = useState(true)
    console.log('course id',course_id,record)
    let fl=1


    useEffect(() => {
        axios.get(`${ip}/course/${course_id}`)
          .then(res=>{
            console.log('course info ',course_id,res.data)
            let arr=res.data.record
            arr=arr.filter(ele=>(ele.section==section))
            setDist(arr.map((item,index)=>{
                let rec=record.filter(ele=>(ele.date==item.date))
                if(rec.length!=0){
                  return {date: item.date,status:true,id:index }
                }
                else{
                  return {date: item.date,status:false,id:index}
                }
            }))
          })
          .catch((error) => console.error('error',error.message))
          .finally(() => {
            setLoading(false)
            fl=0 ;
          });

  }, []);

  const Item = ({ item }) => (
    <View style={styles.item}>
       <View style={{flexDirection:'row'}}>
             <Text style={{marginRight :10}}>{item.date}</Text>
                <Text>
                {
                  item.status?'Present':'Absent'
                }
             </Text>
        </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item item={item}  />
   );
    


    return(
        <View>
            {loading?<Text>loading</Text>
                   :<FlatList
                         data={dist}
                         contentContainerStyle={{paddingBottom:150}}
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
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});