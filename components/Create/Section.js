import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView} from 'react-native'
import { Form, FormItem, Picker } from 'react-native-form-component';
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
    const [section, setSection] = useState('')
    const [list, setList] = useState([])
    const [dist, setDist] = useState([])
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)
    const post=useSelector(selectPost)
    const token=useSelector(selectToken)
    const id=useSelector(selectId)
    const {course_id} = route.params
    console.log('post ',post,'token ',token)

    
    const onSubmit = (e) => {
        //e.preventDefault()

        if(!section){
            alert('Please enter section')
            return
        }
      /*axios.get(`http://${ip}:5000/${post}/me`,{
        headers: {
            'Authorization': token
          }
      })
       .then(res=>{
         console.log('what',res.data)
         setId(res.data._id)
       })*/

        


        const Details = {
          course_id: course_id,
          section: section
        }
        console.log(Details,ip)

         axios.patch(`http://${ip}:5000/course/section/${course_id}`,Details)
          .then(res => {
            console.log('section data ',res.data)
               navigation.goBack()
             })
          .catch((error) => {
            console.log(error.message)
            alert('stop it')
          })

        /* onAdd({user,email,password,passwordr}) */

        setSection('')
        

        
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Form onButtonPress={onSubmit}>
                
                <FormItem
                    label="Section"
                    style={styles.box}
                    isRequired
                    value={section}
                    onChangeText={(section) => setSection(section)}
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
  box:{
      //flex: 1,
      width: '100%',
      height: 40,
      margin: 5
  }

})