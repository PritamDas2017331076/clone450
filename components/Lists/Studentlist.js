import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectId, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function StudentlistL({route, navigation}){
    const [list, setList] = useState([])
    const [cur, setCur] = useState([])
    const { course_id, section } = route.params
    const [col, setCol]=useState([])
    const [stu, setStu]=useState([])
    const [tid, setTid] = useState('')
    const [date, setDate]=useState(new Date())
    const id=useSelector(selectId)
    const post = useSelector(selectPost)
    let f=0

    useEffect(() => {
        console.log('section',section)
      axios.get(`${ip}/course/${course_id}`)
        .then(res => {
            console.log(' data ', res.data.student)
            let arr=res.data.student
            console.log('arr',arr)
            arr=arr.filter(item=>(item.section==section))
            console.log(arr)
            setCol(res.data.collaborator)
            setStu(res.data.student)
            setTid(res.data.teacher_id)
            setList(arr.map((item,index)=>{
                return {registration_number:item.registration_number,status:false,avatar:item.avatar,id:index}
            }))
       }) ;
    }, []);

   console.log('check it out ',f,list)

    return(
            <View>
                {post=='teacher' ?
                <Button onPress={()=>navigation.navigate('Take',{
                    course_id: course_id,
                    list: list, // student list
                    section: section
                })} title="take attendence" />:null}
                <Button onPress={()=>navigation.navigate('Date',{
                    course_id: course_id,
                    section: section
                })} title="show dates" />
                <Button onPress={()=>navigation.navigate('Reg',{
                    course_id: course_id,
                    section: section
                })} title="show registration numbers" />
                {
                    (id==tid)?
                    <View>
                        <Button onPress={()=>navigation.navigate('Collaborator List',{
                           course_id: course_id,
                           section: section
                        })} title="collaborator list" />
                        <Button onPress={()=>navigation.navigate('Students List',{
                           course_id: course_id,
                           section: section
                         })} title="student list" />
                    </View>:null

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
  });