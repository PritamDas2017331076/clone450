import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View,StyleSheet, TouchableOpacity, Pressable, TextInput, SafeAreaView, StatusBar, FlatList, Image } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import {ip} from '../ip'
import { selectUniversity, selectDepartment} from '../Loginslice';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function Take({route, navigation}){
    const { course_id,list,section } = route.params
    const [date, setDate]=useState('')
    const dat=new Date().toString()
    const zdat = dat.split(" ")
    const [dist, setDist] = useState(list)
    const [record,setRecord]=useState([])
    const [lost,setLost]=useState([])
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)
    const [acc, setAcc] = useState('')
    let tt=new Date()
    // console.log('dist',dist,dat)
    let f=0

    const func = async()=>{
      try{
        // console.log('i am here to do it**********************************')
        const rs=await axios.get(`${ip}/course/${course_id}`)
         console.log('course in this case',rs.data)
        setAcc(rs.data)
      }catch(e){
        console.log('error in take effect',e)
      }

    }

    useEffect(() => {
      func()


  }, []);

   const Submit = async()=>{
    // console.log('hello')
    // console.log('record',record)
    let dd=[]
    dist.forEach(ele=>{
      if(ele.status==true) {
        dd.push({registration_number: ele.registration_number,avatar: ele.avatar})
      }
    })
    const dap={
      date: dat,
      section: section
    }
   // console.log('date',dat,date,dap)
    // axios.patch(`${ip}/course/record/${course_id}`,dap)
    //  .then(res=>{
    //    console.log('record updated in course',res.data)
    //  })
    //  .catch(err=>{
    //   console.log('error while updating record',err.message)
    //  })
    try{
      const res=await axios.patch(`${ip}/course/record/${course_id}`,dap);
      console.log('record updated in course',res.data)
    }catch(e){
      console.log('error while updating record',err.message)

    }
    const data={
      date: dat,
      record: dd,
      course_id: course_id,
      section: section,
      course_name: acc.name,
      department: department,
      university: university
    }
    // console.log('data = ',data)

    // axios.post(`${ip}/bydate/add`,data)
    //  .then(res=>{
    //     console.log('recorded data',res.data)
    //  })
    //  .catch(e=>{
    //   console.log('bydate',e)
    // })
    try{
      const res=await axios.post(`${ip}/bydate/add`,data)
      console.log('recorded data',res.data)
    }
    catch(e){
      console.log('bydate',e)
    }
     dd.map(async(ele)=>{
      const chg={
        date: dat,
      
      }
      // console.log('registration',ele.registration_number,chg)
      // axios.patch(`${ip}/byreg/sr?course_id=${course_id}&section=${section}&registration_number=${ele.registration_number}`,chg)
      //   .then(res=>{
      //      console.log('for each ',res.data)
      //   })
      //   .catch(e=>{
      //     console.log('byreg',e.message)
      //   })
      try{
        const res= await axios.patch(`${ip}/byreg/sr?course_id=${course_id}&section=${section}&registration_number=${ele.registration_number}`,chg)
        console.log('byreg succeeded')
      }
      catch(e){
        console.log('error in byreg',e.message)
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
    <View >
      <View style={{flexDirection: 'row'}}>
          {/* <Pressable
             style={[styles.checkboxBase, item.status && styles.checkboxChecked]}
             onPress={()=>setVal(item.id)}>
             {item.status && <Ionicons name="checkmark" size={24} color="white" /> } 
          </Pressable> */}
          <Card footer={
            <View >
              <Text>{item.registration_number}</Text>
                <Pressable
                  style={[styles.checkboxBase, item.status && styles.checkboxChecked]}
                  onPress={()=>setVal(item.id)}>
                  {item.status && <Ionicons name="checkmark" size={32} color="white" /> }
                </Pressable>
            </View>
          } style={{marginBottom:20}}>
              <Image
                  style={styles.tinyLogo}
                  source={{
                      uri: item.avatar,
                  }}
              />
          </Card>
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
        <View style={{marginHorizontal:10}}>
            {/*<ul>
                {
                    list.map(item =>(
                        <li key={item._id}>
                            {item.registration_number}
                        </li>
                    ))
                }
            </ul>*/}
            <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
              <Text>{zdat[1]} {zdat[2]}</Text>
              <Text> {zdat[4]}</Text>
            </View>
            <View>
              <FlatList style={{backgroundColor:'white',padding:'5%'}}
                data={dist}
                contentContainerStyle={{paddingBottom:150}}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<Button onPress={Submit} title="Submit" />}
              />
              {/* <Button style={{marginBottom:-100}}  onPress={Submit} title="Submit" /> */}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent:'space-between',
    flexDirection:'row'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    // alignSelf: "center",
    // marginRight:20
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