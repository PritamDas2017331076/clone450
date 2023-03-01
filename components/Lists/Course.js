import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {View,Button,Text,StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
// import { Card, Layout, Modal} from '@ui-kitten/components';

import {ip} from '../ip'
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
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function Course({route, navigation}){
    const [list, setList] = useState([])
    const post = useSelector(selectPost)
    const email = useSelector(selectEmail)
    const name = useSelector(selectName)
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)
    const avatar = useSelector(selectAvatar)
    const id = useSelector(selectId)
    const { session_id,session } = route.params
    console.log('session id in course ',session_id)
    let f=0
    const [loading, setLoading] = useState(true)
    const effect = async()=>{
        try{
          const res=await axios.get(`${ip}/course/session?session_id=${session_id}`)
          console.log(' data ', res.data, session) 
          setList(res.data)
          setLoading(false)
        }catch(error){
          console.error(error)
        }
      }


    useEffect(() => {
        let fl=1
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('in course it is working')
            effect()
            // axios.get(`${ip}/course/session?session_id=${session_id}`)
            // .then(res => {
            //     console.log(' data ', res.data, session) 
            //     setList(res.data)
            //  })
            //  .catch((error) => console.error(error))
            //  .finally(() => {
            //    setLoading(false)
            //    fl=0 ;
            //  });
        });
    
        return unsubscribe;
    }, [navigation]);

   console.log('check it out ',f,list)

    const accept = async(item)=>{

        try{
            const res=await axios.get(`${ip}/access`)
            let data=res.data
            data=data.filter(ele => (ele.course_id==item._id && ele.teacher==item.teacher_id && ele.id==id))
            if(data.length==0){
                navigation.navigate('Sectionform',{
                    course_id: item._id,
                 })
            }else{
                alert('you have already requested')
            }
        }catch(error){
            console.log('error in coursejs accet func',error)
        }

        // axios.get(`${ip}/access`)
        //  .then(res=>{
        //     let data=res.data
        //     data=data.filter(ele => (ele.course_id==item._id && ele.teacher==item.teacher_id && ele.id==id))
        //     if(data.length==0){
        //         navigation.navigate('Sectionform',{
        //             course_id: item._id,
        //          })
        //     }else{
        //         alert('you have already requested')
        //     }
        //  })

        


    }

    const section = (id)=>{
        navigation.navigate('Section List',{
            course_id: id,
         })

    }

    const fun = (col)=>{
        col = col.filter(ele => (ele.id==id))
        if(col.length==0) return false
        else return true
    }

    const funn = async(dat)=>{
        try{
            const ress=await axios.post(`${ip}/approveCo/add`,dat)
            console.log('approval for colaboration',ress.data)

        }catch(err){
            console.log('error in coursejs funn',err)
        }
    }

    const colab = async(item)=>{
        try{
            const res=await axios.get(`${ip}/approveCo/`)
            let data=res.data
            data=data.filter(ele=>(ele.course_id==item._id && ele.teacher==item.teacher_id && ele.id==id))
            if(data.length==0){
                const dat = {
                    id: id,
                    name: name,
                    email: email, 
                    university: university,
                    department: department,
                    course_id: item._id,
                    course_name: item.name,
                    teacher: item.teacher_id,
                    avatar: avatar
                }
                funn(dat)
        
                // axios.post(`${ip}/approveCo/add`,dat)
                //   .then(res=>{
                //     console.log('approval for colaboration',res.data)
                //   })
                //   .catch(err=>{
                //     console.log('error while colab approval',err)
                //   })
            }
            else{
                alert('you have requested already')
            }

        }catch(error){
            console.log('error in coursejs colab func',error)
        }
        // axios.get(`${ip}/approveCo/`)
        //  .then(res =>{
        //     let data=res.data
        //     data=data.filter(ele=>(ele.course_id==item._id && ele.teacher==item.teacher_id && ele.id==id))
        //     if(data.length==0){
        //         const dat = {
        //             id: id,
        //             name: name,
        //             email: email, 
        //             university: university,
        //             department: department,
        //             course_id: item._id,
        //             course_name: item.name,
        //             teacher: item.teacher_id,
        //             avatar: avatar
        //         }
        
        //         axios.post(`${ip}/approveCo/add`,dat)
        //           .then(res=>{
        //             console.log('approval for colaboration',res.data)
        //           })
        //           .catch(err=>{
        //             console.log('error while colab approval',err)
        //           })
        //     }
        //     else{
        //         alert('you have requested already')
        //     }

        //  })


    }

    const Delcourse = (id) =>{
        navigation.navigate('Course Info',{
            id: id
        })
    }

    const colas = (ele) => {
        const course_id=ele._id
        let student=ele.student;
        student = student.filter(item =>{
            return (item.id==id)
        })
        student.forEach(async(item) => {
            let section = item.section
            let registration_number = item.registration_number
            try{
                const res=await axios.get(`${ip}/byreg/srro?course_id=${course_id}&section=${section}&registration_number=${registration_number}`)
                const data=res.data
                console.log(data)
                navigation.navigate('PrintRg',{
                    record: data.record,
                    course_id: course_id,
                    section: section
                })
            }catch(error){
                console.log('error in coursejs colas function',error)
            }
            // axios.get(`${ip}/byreg/srro?course_id=${course_id}&section=${section}&registration_number=${registration_number}`)
            //  .then(res=>{
            //     const data=res.data
            //     console.log(data)
            //     navigation.navigate('PrintRg',{
            //         record: data.record,
            //         course_id: course_id,
            //         section: section
            //     })
            //  })
        })
    }

    const Item = ({ item, university, navigation }) => (
        <View style={styles.item}>
            <View>
                <Text style={{fontSize:25,textAlign:'center',marginBottom:10}}>{item.code}</Text>
                <Text style={{textAlign:'center'}}>{item.name}</Text>
            </View>
            <View style={{maxWidth:'80%',marginHorizontal:'10%'}}>

            {
                post=='teacher' ? (id==item.teacher_id || fun(item.collaborator)) 
                ?<Button  onPress={()=>section(item._id)} title="section"  />:null:null
            }
            {
                post ==='teacher' ? !(id==item.teacher_id || fun(item.collaborator))
                ?<Button onPress={()=>colab(item)} title="collaboration access"  />:null:null
            }
            {
                post=='student' ? fun(item.student)
                ?<Button onPress={()=>colas(item)} title="View Attendence"  />:null:null
            }
            {
                post=='student' ? !fun(item.student)
                ?<Button onPress={()=>accept(item)} title="access request"/>:null:null
            }
            {
                post!='student' ? post !='teacher'
                ?<Button onPress={()=>section(item._id)} title="section"/>:null :null
            }
            {
                post=='department_head'
                ?<Button  onPress={()=>Delcourse(item._id)} title="Course Delete"/>:null
            }
           
            </View>

        </View>
      );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return(
     
     <View>
            {loading?<Spinner
                visible={true}
                textContent={'Loading...'}
            />
                   :<FlatList
                         data={list}
                         contentContainerStyle={{paddingBottom:200}}
                         renderItem={renderItem}
                         keyExtractor={item => item._id}
                         ListFooterComponent={
                            <View style={{maxWidth:200,marginHorizontal:'23%',paddingTop:20}}>
                            {
                                post=='teacher'?<Button onPress={()=>{
                                    navigation.navigate('Create Course',{
                                        session_id: session_id,
                                        session: session
                                    })
                                }} title="create  course"/>:null
                            }
                            </View>
                        }
                       />
                    }

            {/* <View style={{maxWidth:250,marginHorizontal:'18%'}}>
            {
                post=='teacher'?<Button onPress={()=>{
                    navigation.navigate('Create Course',{
                        session_id: session_id,
                        session: session
                    })
                }} title="create  course"/>:null
            }
            </View> */}
            
        </View>
    )




}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      margin:20,
      marginBottom:0,
      
      
    },
    title: {
      fontSize: 32,
    },
  });
  