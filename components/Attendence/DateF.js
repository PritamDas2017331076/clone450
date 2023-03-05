import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList  } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { Button } from '@ui-kitten/components';
import { Datepicker, Layout,} from '@ui-kitten/components';
// const getParsedDate = (strDate)=>{
//   var strSplitDate = String(strDate).split(' ');
//   var date = new Date(strSplitDate[0]);
//   // alert(date);
//   var dd = date.getDate();
//   var mm = date.getMonth() + 1; //January is 0!

//   var yyyy = date.getFullYear();
//   if (dd < 10) {
//       dd = '0' + dd;
//   }
//   if (mm < 10) {
//       mm = '0' + mm;
//   }
//   date =  dd + "-" + mm + "-" + yyyy;
//   return date.toString();
// }
export default function DateF({route, navigation}){
    const { course_id,section } = route.params
    const [dist,setDist]=useState([])
    const [loading, setLoading] = useState(true)
    const [d1, setD1] = useState('')
    const [d2, setD2] = useState('')
    const [date, setDate] = useState(new Date());
    let fl=1
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/bydate/sec?course_id=${course_id}&section=${section}`)
        console.log('got my stuff',course_id,res.data)
        let arr=res.data
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
        setD1('')
        setD2('')
        arr=arr.filter(ele=>{
          const d3=new Date(ele.date)
          let y=d3.getFullYear(),m=d3.getMonth()+1,dd=d3.getDate()
          let z="0";
          if(m<10) m=z.concat(m)
          if(dd<10) dd=z.concat(dd)
          let dd3=y+'-'+m+'-'+dd
          return (dd3>=dd1 && dd3<=dd2)

        })
        setDist(arr.map((item,index)=>{
          // let splitDate = item.date.split(' ')
          // console.log('split date',splitDate)
          return {dat:item.date,date:item.date.split(" "),record:item.record,id:item._id}
        }))
       // console.log('dist',dist)
        setLoading(false)
      }catch(error){
        console.log(error)
      }
    }
    useEffect(() => {
      navigation.setOptions({ title: "Query on Dates"})
      console.log('i have enterd in date list')
      const unsubscribe = navigation.addListener('focus', () => {
        effect()
      })

  }, [navigation]);

  // console.log(dist)
    const Item = ({ item }) => (
      <View style={styles.item}>
         <TouchableOpacity style={{backgroundColor:'white',margin:20}} 
              onPress={()=>navigation.navigate('PrintDt',{
              record: item.record,
              course_id: course_id,
              section: section,
              id:item.id,
              date: item.dat
         })}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}> */}
              <Text>{item.date[1]} {item.date[2]}</Text>
              <Text>{item.date[4]}</Text>
            {/* </View> */}
          <View>
              <Button style={{width:100,backgroundColor:'green'}} onPress={()=>{
                    navigation.navigate('Utake',{
                        course_id: course_id,
                        section: section,
                        record: item.record,
                        date: item.date,
                        pid: item.id
                    })
                }}>Update</Button>
              </View>
          </View>
         </TouchableOpacity>
                           
         {/* <View style={styles.checkboxContainer}>
              <Text>{item.registration_number}</Text>
          </View> */}
      </View>
    );

    const renderItem = ({ item }) => (
      <Item item={item}   />
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
                        
                      </Layout> */}
                      {/* <Button onPress={() => effect()}>Filter</Button>
                        <Button onPress={() => {
                          setD1('') ; setD2('') ; effect();
                        }}>Reset</Button> */}
                       <FlatList
                         data={dist}
                         contentContainerStyle={{paddingBottom:150}}
                         renderItem={renderItem}
                         ListHeaderComponent={
                          <View>
                            <Layout style={styles.dateContainer} level='1'>
                              <Text category='h6' style={{marginBottom:10}}>
                                Selected date: {date.toLocaleDateString()}
                              </Text>

                              <Datepicker style={{marginBottom:15}}
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
                              
                            </Layout>
                            <Button style={styles.button}onPress={() => effect()}>Filter</Button>
                            <Button style={styles.button} onPress={() => {
                              setD1('') ; setD2('') ; effect();
                            }}>Reset</Button>
                          </View>
                         }
                         keyExtractor={item => item.id}
                       />
                    </View>
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
    dateContainer: {
      minHeight: 150,
      padding:20,
      margin:10
    },
    datePickerStyle: {
      width: 230,
    },
    button:{
        width:300,
        marginVertical:5,
        // backgroundColor:'green',
        marginHorizontal:'10%'      
      }
  });