import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { Card } from '@ui-kitten/components';
//import RNDateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { Datepicker, Layout,} from '@ui-kitten/components';

export default function PrintRg({route, navigation}){
    const { course_id, record, section } = route.params
    const [dist, setDist] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    console.log('course id',course_id,record)
    const [list, setList]=useState([])
    const [total, setTotal]=useState(0)
    const [present, setPresent] = useState(0)
    const [zdate,setZdate] = useState()
    const [d1, setD1] = useState('')
    const [d2, setD2] = useState('')
    const [date, setDate] = useState(new Date());
    let fl=1
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/course/${course_id}`)
        // console.log('course info ',course_id,res.data)
        let arr=res.data.record
        arr=arr.filter(ele=>(ele.section==section))
        setTotal(arr.length)
        let dd1,dd2
        if(d1=='') dd1='2000-01-01'
        else
        {
          let y=d1.getFullYear(),m=d1.getMonth()+1,dd=d1.getDate()
          let z="0";
          if(m<10) m=z.concat(m)
          if(dd<10) dd=z.concat(dd)
          dd1=y+'-'+m+'-'+dd
        }
        if(d2=='') dd2='5000-01-01'
        else
        {
          let y=d2.getFullYear(),m=d2.getMonth()+1,dd=d2.getDate()
          let z="0";
          if(m<10) m=z.concat(m)
          if(dd<10) dd=z.concat(dd)
          dd2=y+'-'+m+'-'+dd
        }
        console.log('dd1',dd1,'dd2',dd2)
        arr=arr.filter(ele=>{
          const d3=new Date(ele.date)
          let y=d3.getFullYear(),m=d3.getMonth()+1,dd=d3.getDate()
          let z="0";
          if(m<10) m=z.concat(m)
          if(dd<10) dd=z.concat(dd)
          let dd3=y+'-'+m+'-'+dd
          return (dd3>=dd1 && dd3<=dd2)

        })

        let brr=record.filter(ele=>{
          const d3=new Date(ele.date)
          let y=d3.getFullYear(),m=d3.getMonth()+1,dd=d3.getDate()
          let z="0";
          if(m<10) m=z.concat(m)
          if(dd<10) dd=z.concat(dd)
          let dd3=y+'-'+m+'-'+dd
          return (dd3>=dd1 && dd3<=dd2)

        })
        console.log('brr',brr)
        setD1('')
        setD2('')

        setDist(arr.map((item,index)=>{
            let rec=record.filter(ele=>(ele.date==item.date))
            if(rec.length!=0){
              return {date: item.date.split(" "),status:true,id:index }
            }
            else{
              return {date: item.date.split(" "),status:false,id:index}
            }
        }))
        setTotal(arr.length)
        setPresent(brr.length)
        console.log('dist',dist)
        setLoading(false)
      }catch(error){
        console.error('error',error.message)
      }
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
                   :<View>
                     {/* <Layout style={styles.dateContainer} level='1'>
                        <Text category='h6'>
                          Selected date: {date.toLocaleDateString()}
                        </Text>

                        <Datepicker
                          date={d1}
                          onSelect={nextDate => setD1(nextDate)}
                          min = {new Date("2010/1/1")}
                          max = {new Date("2050/1/1")}
                        />
                        <Datepicker
                          date={d2}
                          onSelect={nextDate => setD2(nextDate)}
                          min = {new Date("2010/1/1")}
                          max = {new Date("2050/1/1")}
                        />
                        <Button onPress={() => effect()} title="Filter" />
                        <Button onPress={async() => {
                          setD1('') ; setD2('') ; effect();
                        }} title="Reset" />
                      </Layout> */}
                        
                        <FlatList
                            data={dist}
                            contentContainerStyle={{paddingBottom:150}}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            ListFooterComponent={
                              <Card style={{margin:10}}>
                                <Text>Total Classes: {total}</Text>
                                <Text>Present: {present}</Text>
                                <Text>Percentage: {((present*1*100)/(total)).toFixed(2)}%</Text>
                              </Card>
                            }
                            ListHeaderComponent={
                            <Layout style={styles.dateContainer} level='1'>
                                <Text category='h6'>
                                  Selected date: {date.toLocaleDateString()}
                                </Text>
        
                                <Datepicker
                                  date={d1}
                                  onSelect={nextDate => setD1(nextDate)}
                                  min = {new Date("2010/1/1")}
                                  max = {new Date("2050/1/1")}
                                />
                                <Datepicker
                                  date={d2}
                                  onSelect={nextDate => setD2(nextDate)}
                                  min = {new Date("2010/1/1")}
                                  max = {new Date("2050/1/1")}
                                />
                                <Button onPress={() => effect()} title="Filter" />
                                <Button onPress={async() => {
                                  setD1('') ; setD2('') ; effect();
                                }} title="Reset" />
                          </Layout>}
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