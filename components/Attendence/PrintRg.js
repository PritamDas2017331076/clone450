import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { Card } from '@ui-kitten/components';
export default function PrintRg({route, navigation}){
    const { course_id, record, section } = route.params
    const [dist, setDist] = useState([])
    const [loading, setLoading] = useState(true)
    console.log('course id',course_id,record)
    const [list, setList]=useState([])
    const [total, setTotal]=useState(0)
    const present=record.length
    const [zdate,setZdate] = useState()
    let fl=1


    useEffect(() => {
        axios.get(`${ip}/course/${course_id}`)
          .then(res=>{
            console.log('course info ',course_id,res.data)
            let arr=res.data.record
            arr=arr.filter(ele=>(ele.section==section))
            setTotal(arr.length)
            setDist(arr.map((item,index)=>{
                let rec=record.filter(ele=>(ele.date==item.date))
                if(rec.length!=0){
                  return {date: item.date.split(" "),status:true,id:index }
                }
                else{
                  return {date: item.date.split(" "),status:false,id:index}
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
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <Text style={{marginRight :10}}>{item.date[1]} {item.date[2]} {item.date[4]}</Text>
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
            {loading?<Spinner
                      visible={true}
                      textContent={'Loading...'}
                      textStyle={styles.spinnerTextStyle}
                    />
                   :<FlatList
                         data={dist}
                         contentContainerStyle={{paddingBottom:150}}
                         renderItem={renderItem}
                         keyExtractor={item => item.id}
                         ListFooterComponent={
                          <Card>
                          <Text>Total Classes: {total}</Text>
                          <Text>Present: {present}</Text>
                          <Text>Percentage: {(present*1*100)/(total)}%</Text>
                          </Card>
                         }
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
    margin:20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});