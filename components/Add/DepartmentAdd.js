import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView,TouchableOpacity,Image} from 'react-native'
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
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';

export default function DepartmentAdd({navigation}){
    
    const [department, setDepartment] = useState('')
    const [abbreviation, setAbbreviation] = useState('')
    const university = useSelector(selectUniversity)
    const dispatch = useDispatch()
    useEffect(() => {
          axios.get(`http://${ip}:5000/university_admin`)
          .then(res => {
              console.log('data ', res.data) 

              setList(res.data.map( (s) => {
                return {value:s.university, label:s.university}
            }))
            console.log(list)
         }) ;

         axios.get(`http://${ip}:5000/departments`)
          .then(res => {
              console.log('data ', res.data) 

              setDist(res.data.map( (s) => {
                return {value:s.department, label:s.department}
            }))
            console.log(dist)
         }) ;
  
    }, []);


    const onSubmit = (e) => {
        
        if(!department){
            alert('Please enter department')
            return
        }

        if(!abbreviation){
            alert('Please enter password')
            return
        }

     
        const Details = {
          department: department,
          university: university,
          abbreviation: abbreviation,
        }
        
        console.log(Details,ip)

         axios.post(`http://${ip}:5000/departments/add`,Details)
          .then(res => {
            console.log(res.data)
            navigation.navigate('Home')
          })
          .catch((error) => {
            console.log(error.message)
            alert('failed to add department')
          })

        /* onAdd({user,email,password,passwordr}) */

      
        setDepartment('')
        setAbbreviation('')
        

        
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Form onButtonPress={onSubmit}>
                
                <FormItem
                    label="Department Name"
                    style={styles.box}
                    isRequired
                    value={department}
                    onChangeText={(department) => setDepartment(department)}
                    asterik
                  />
                <FormItem
                    label="Department Abbreviation"
                    style={styles.box}
                    isRequired
                    value={abbreviation}
                    onChangeText={(abbreviation) => setAbbreviation(abbreviation)}
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