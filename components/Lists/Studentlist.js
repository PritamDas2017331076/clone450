import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {View,StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectId, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import {Card,Button,Text} from '@ui-kitten/components';


export default function StudentlistL({route, navigation}){
  const [list, setList] = useState([])
  const [cur, setCur] = useState([])
    const { course_id, section } = route.params
    const [col, setCol]=useState([])
    const [stu, setStu]=useState([])
    const [tid, setTid] = useState()
    const [date, setDate]=useState(new Date())
    const id=useSelector(selectId)
    const post = useSelector(selectPost)
    let f=0
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/course/${course_id}`)
        console.log(' data ', res.data.student,'tid',res.data.teacher_id)
        // setCol(res.data.collaborator)
        // setStu(res.data.student)
        setTid(res.data.teacher_id)
        let arr=res.data.student
        //console.log('arr',arr)
        arr=arr.filter(item=>(item.section==section))
        arr.sort(function(a,b){
          if(a.registration_number<b.registration_number) return -1
          else return 0
        })
        //   console.log('all',arr)
        let obj=arr[arr.length-1].registration_number.substring(0,4)
        let brr=[]
        let crr=[]
        arr.forEach((a)=>{
          if(a.registration_number.substring(0,4)==obj)brr.push(a)
          else crr.push(a)
        })
        brr=brr.concat(crr)
        //console.log(brr,'thennn',crr)
        arr=brr
        setCol(res.data.collaborator)
        setStu(res.data.student)
       // setTid(res.data.teacher_id)
       setList(arr.map((item,index)=>{
            return {registration_number:item.registration_number,status:false,avatar:item.avatar,id:index}
          }))
        }catch(error){
        console.log('error in studentlist',error)
      }
    }
    
    useEffect(() => {
      //   console.log('section',section)
      effect()
      // axios.get(`${ip}/course/${course_id}`)
      //   .then(res => {
        //       console.log(' data ', res.data.student)
        //       let arr=res.data.student
    //       console.log('arr',arr)
    //       arr=arr.filter(item=>(item.section==section))
    //       arr.sort(function(a,b){
    //         if(a.registration_number<b.registration_number) return -1
    //         else return 0
    //       })
    //       console.log('all',arr)
    //       let obj=arr[arr.length-1].registration_number.substring(0,4)
    //       let brr=[]
    //       let crr=[]
    //       arr.forEach((a)=>{
    //         if(a.registration_number.substring(0,4)==obj)brr.push(a)
    //         else crr.push(a)
    //       })
    //       brr=brr.concat(crr)
    //       console.log(brr,'thennn',crr)
    //       arr=brr
    //       setCol(res.data.collaborator)
    //       setStu(res.data.student)
    //       setTid(res.data.teacher_id)
    //       setList(arr.map((item,index)=>{
    //           return {registration_number:item.registration_number,status:false,avatar:item.avatar,id:index}
    //       }))
    //  }) ;
  }, []);

   //console.log('check it out ',f,list)

    return(
            <View style={{flexDirection:'row',justifyContent:'flex-start',flexWrap:'wrap',marginHorizontal:'5%',marginVertical:'12%'}}>
                {post=='teacher' ?
                // <Button onPress={()=>navigation.navigate('Take',{
                //     course_id: course_id,
                //     list: list, // student list
                //     section: section
                // })} title=" take attendence" />:null
                  <Card style = {styles.child}
                  onPress={()=>navigation.navigate('Take',{
                    course_id: course_id,
                    list: list, // student list
                    section: section
                  })}
                    >
                      <Text style={{textAlign:'center'}}>Take Attendance</Text>
                  </Card>:null
                }
                {/* <Button onPress={()=>navigation.navigate('Date',{
                    course_id: course_id,
                    section: section
                })} title="show dates" /> */}


                  <Card style={styles.child}
                    onPress={()=>navigation.navigate('Date',{
                      course_id: course_id,
                      section: section
                  })}
                    >
                      <Text style={{textAlign:'center'}}>Attendance list</Text>
                  </Card>
                {/* <Button onPress={()=>navigation.navigate('Reg',{
                    course_id: course_id,
                    section: section
                })} title="show registration numbers" /> */}


                <Card style={styles.child}
                   onPress={()=>navigation.navigate('Reg',{
                    course_id: course_id,
                    section: section
                })} 
                    >
                      <Text style={{textAlign:'center'}}>Student list</Text>
                  </Card>
                {
                    (id===tid)?
                    // <View>
                    //     <Button onPress={()=>navigation.navigate('Collaborator List',{
                    //        course_id: course_id,
                    //        section: section
                    //     })} title="collaborator list" />
                    //     <Button onPress={()=>navigation.navigate('Students List',{
                    //        course_id: course_id,
                    //        section: section
                    //      })} title="student list" />
                    // </View>:null
                    <Card style={styles.child}
                    onPress={()=>navigation.navigate('Collaborator List',{
                      course_id: course_id,
                      section: section
                   })} 
                     >
                       <Text style={{textAlign:'center'}}>Collaborators</Text>
                   </Card>:null
                }
                {
                    (id==tid)?
                    <Card style={styles.child}
                    onPress={()=>navigation.navigate('Add Students',{
                      course_id: course_id,
                      section: section
                   })} 
                     >
                       <Text style={{textAlign:'center'}}>Add student</Text>
                   </Card>:null
                }
                {
                    (id==tid)?
                    <Card style={styles.child}
                    onPress={()=>navigation.navigate('Students List',{
                      course_id: course_id,
                      section: section
                   })} 
                     >
                       <Text style={{textAlign:'center'}}>Delete student</Text>
                   </Card>:null
                }
            </View>
           
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
    child:{
      width:155,
      height:80,
      marginHorizontal:'2%',
      marginVertical:'3%',
      borderRadius:12,
    }
  });