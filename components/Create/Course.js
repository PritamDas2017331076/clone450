import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Text,Form, FormItem, Picker } from 'react-native-form-component';
import { Input,Icon, Layout} from '@ui-kitten/components';
import {View, StyleSheet,ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import {ip} from '../ip'
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
  selectPost,
  selectUniversity,
  selectDepartment,
  selectId
  } from '../Loginslice'

export default function Courses({route, navigation}){
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [list, setList] = useState([])
    const [dist, setDist] = useState([])
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)
    const post=useSelector(selectPost)
    const token=useSelector(selectToken)
    const id=useSelector(selectId)
    const {session_id, session} = route.params
    console.log('post ',post,'token ',token)

    
    const onSubmit = async(e) => {
        //e.preventDefault()

        if(!code){
            alert('Please enter course code')
            return
        }

        if(!code){
          alert('Please enter course name')
          return
      }
      /*axios.get(`${ip}/${post}/me`,{
        headers: {
            'Authorization': token
          }
      })
       .then(res=>{
         console.log('what',res.data)
         setId(res.data._id)
       })*/

        


        const Details = {
          session_id: session_id,
          session: session,
          university: university,
          department: department,
          code: code,
          name: name,
          teacher_id: id
        }
        console.log(Details,ip)
        try{
          const res=await axios.post(`${ip}/course/add`,Details)
          console.log('course data ',res.data)
          navigation.goBack()
        }catch(error){
          console.log(error.message)
          alert('stop it')
        }

        //  axios.post(`${ip}/course/add`,Details)
        //   .then(res => {
        //     console.log('dhead data ',res.data)
        //        navigation.goBack()
        //      })
        //   .catch((error) => {
        //     console.log(error.message)
        //     alert('stop it')
        //   })

        /* onAdd({user,email,password,passwordr}) */

        setCode('')
        setName('')
        

        
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Form onButtonPress={onSubmit}>
                
                <Input
                    label="Course Code"
                    style={styles.input}
                    isRequired
                    value={code}
                    onChangeText={(code) => setCode(code)}
                    asterik
                  />
                <Input
                    label="Course Name"
                    style={styles.input}
                    isRequired
                    value={name}
                    onChangeText={(name) => setName(name)}
                    asterik
                  />
            </Form>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      height: 50,
      padding: 20,
      border: '1px solid black',
      backgroundColor: '#fff',
  },
  text:{
      color: 'red',
      fontSize: 20,
      justifyContent: 'center',
      fontWeight: 'bold',
  },
  input: {
    width:330,
    flex: 1,
    margin: 4
  },
  box:{
      //flex: 1,
      width: '100%',
      height: 40,
      margin: 5
  }

})