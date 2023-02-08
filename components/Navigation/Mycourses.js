import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { useSelector, useDispatch } from 'react-redux';
import {
    updateEmail,
    updateName,
    updateToken,
    updatePost,
    updateUniversity,
    updateDepartment,
    selectEmail,
    selectName,
    selectToken,
    selectId,
    selectPost,
    selectUniversity,
    selectDepartment
    
  } from '../Loginslice'  
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { Card } from '@ui-kitten/components';
import DatePicker from 'react-native-date-picker'
//import RNDateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { Datepicker, Layout,} from '@ui-kitten/components';

export default function Mycourses({route, navigation}){
    const [dist, setDist] = useState([])
    const [loading, setLoading] = useState(true)
    const [list, setList]=useState([])
    const id=useSelector(selectId)
    let fl=1
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/course`)
        // console.log('course info ',course_id,res.data)
        let arr=res.data,brr=[]
       // console.log('arr',arr)
        arr.forEach(ele=>{
            if(ele.teacher_id==id) brr.push(ele)
            else{
                let col=ele.collaborator
                let ccc=col.filter(clo=>(clo.id==id))
                if(ccc.length!=0) brr.push(ele)
            }
        })
        console.log('arrb',arr)
        arr=brr
        setDist(arr)
        
      }catch(error){
        console.error('error',error.message)
      }
    }

    const section = (id)=>{
        navigation.navigate('Section List',{
            course_id: id,
         })

    }

    useEffect(() => {
        effect()
        // axios.get(`${ip}/course/${course_id}`)
        //   .then(res=>{
        //     // console.log('course info ',course_id,res.data)
        //     let arr=res.data.record
        //     arr=arr.filter(ele=>(ele.section==section))
        //     setTotal(arr.length)
        //     setDist(arr.map((item,index)=>{
        //         let rec=record.filter(ele=>(ele.date==item.date))
        //         if(rec.length!=0){
        //           return {date: item.date.split(" "),status:true,id:index }
        //         }
        //         else{
        //           return {date: item.date.split(" "),status:false,id:index}
        //         }
        //     }))
        //   })
        //   .catch((error) => console.error('error',error.message))
        //   .finally(() => {
        //     setLoading(false)
        //     fl=0 ;
        //   });

  }, []);

  const Item = ({ item }) => (
    <View style={styles.item}>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <Text style={{marginRight :10}}>{item.name}</Text>
             <Text style={{marginRight :10}}>{item.department}</Text>
             <Button  onPress={()=>section(item._id)} title="section"  />
            
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
                   :<View>
                        <FlatList
                            data={dist}
                            contentContainerStyle={{paddingBottom:150}}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                          />
                    </View>
                    }
       
        </View>
    )
}

const styles = StyleSheet.create({
  dateContainer: {
    minHeight: 150,
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
    padding: 20,
    margin:20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  datePickerStyle: {
    width: 230,
  }
});