import axios from 'axios'
import { Button, View,StyleSheet, TouchableOpacity, Pressable, TextInput, SafeAreaView, StatusBar, FlatList, Image } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import React, {useState, useEffect} from 'react'
import {ip} from '../ip'
import { useSelector, useDispatch } from 'react-redux';
import {
    selectEmail,
    selectName,
    selectToken,
    selectPost,
    selectUniversity,
    selectDepartment,
    selectId,
    selectAvatar
    } from '../Loginslice';
const AddStudents = ({route, navigation}) => {
    const {course_id, section} = route.params
    const [session, setSession]=useState('')
    const [students, setStudents]=useState([])
    const [studentInCourse, setStudentInCourse]=useState([])
    const [dist, setDist]=useState([])
    const uni=useSelector(selectUniversity)
    const dept=useSelector(selectDepartment)
    const effect = async()=>{
        try{
            const res1=await axios.get(`${ip}/course/${course_id}`)
            setSession(res1.data.session)
            setStudentInCourse(res1.data.student)
            const res2=await axios.get(`${ip}/student?university=${uni}&department=${dept}`)
            setStudents(res2.data)
            let tmp=students
            tmp=tmp.filter((ele)=>ele.session==session)
            setStudents(tmp)
            arr=[]
            tmp.forEach((ele)=>{
                let tpp=studentInCourse.filter(stu=>(stu.registration_number=ele.registration_number))
                if(tpp.length==0) arr.push(ele)
            })
            tmp=arr
            setStudents(tmp)
            setDist(tmp)
        }catch(e){

        }
    }

    useEffect(()=>{
        effect()
    },[])


    const Item = ({ item }) => (
        <View>
          <View style={{flexDirection: 'row'}} >
              {/* <Pressable
                 style={[styles.checkboxBase, item.status && styles.checkboxChecked]}
                 onPress={()=>setVal(item.id)}>
                 {item.status && <Ionicons name="checkmark" size={24} color="white" /> } 
              </Pressable> */}
              <Card footer={
                  <Text>{item.registration_number}</Text>
              } style={{marginBottom:20}}>
                  <Image
                      style={styles.tinyLogo}
                      source={{
                          uri: item.avatar,
                      }}
                  />
              </Card>
          </View>
        </View>
      );
    
      const renderItem = ({ item }) => (
        <Item item={item}  />
       );
    

    return (
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
            {/* <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
              <Text>{zdat[1]} {zdat[2]}</Text>
              <Text> {zdat[4]}</Text>
            </View> */}
            <View>
              <FlatList style={{backgroundColor:'white',padding:'5%'}}
                data={dist}
                contentContainerStyle={{paddingBottom:150}}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                ListFooterComponent={<Button onPress={Submit} title="Submit" />}
                ListHeaderComponent={
                    <Picker
                    items={[
                        {value:'All', label:'All'},
                        {value:'Even', label:'Even'},
                        {value:'Odd', label:'Odd'},
                    ]}
                    label="Pick a filter parameter"
                    // style={styles.box}
                    selectedValue={department}
                    onSelection={(item) => {
                        if(item.value=='All') setDist(students)
                        else if(item.value=='Even') setDist(students.filter(ele=>((ele.registration_number*1)%2==0)))
                        else setDist(students.filter(ele=>((ele.registration_number*1)%2==1)))
                    }}
                    />
                }
              />
              {/* <Button style={{marginBottom:-100}}  onPress={Submit} title="Submit" /> */}
            </View>
            
        </View>
    )
}

export default AddStudents

const styles = StyleSheet.create({})