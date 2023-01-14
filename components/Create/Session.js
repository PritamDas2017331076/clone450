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
  selectDepartment
  } from '../Loginslice'

export default function Sessions({navigation}){
    const [session, setSession] = useState('')
    const [list, setList] = useState([])
    const [dist, setDist] = useState([])
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)

    
    const onSubmit = async(e) => {
        //e.preventDefault()

        if(!session){
            alert('Please enter session')
            return
        }

        


        const Details = {
          session: session,
          university: university,
          department: department
          
        }
        
        console.log(Details,ip)
        try{
          const res=await axios.post(`${ip}/session/add`,Details)
          console.log('session data ',res.data)
          navigation.navigate('Home')
        }catch(error){
          console.log(error.message)
          alert('stop it')
        }

        //  axios.post(`${ip}/session/add`,Details)
        //   .then(res => {
        //     console.log('session data ',res.data)
        //        navigation.navigate('Home')
        //      })
        //   .catch((error) => {
        //     console.log(error.message)
        //     alert('stop it')
        //   })

        /* onAdd({user,email,password,passwordr}) */

        setSession('')
        

        
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Form onButtonPress={onSubmit}>
                
                <FormItem
                    label="Email"
                    style={styles.box}
                    isRequired
                    value={session}
                    onChangeText={(session) => setSession(session)}
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