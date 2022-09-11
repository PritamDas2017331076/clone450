import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView} from 'react-native'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux';
import {ip} from './ip'
import {
    toggleLoggedin, 
    updateEmail,
    updateName,
    updateToken,
    selectIsLoggedin,
    selectEmail,
    selectName,
    selectToken,
  } from './Loginslice'

  export default function Admin({navigation}){
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [rpassword, setRPassword] = useState('')

    const onSubmit = (e) => {
        //e.preventDefault()

        if(!phone){
            alert('Please enter phone number')
            return
        }

        if(!email){
            alert('Please enter email')
            return
        }

        if(!password){
            alert('Please enter password')
            return
        }

        if(!rpassword){
            alert('Please enter password again here')
            return
        }


        if(password!==rpassword){
            alert('wrong password entered')
            return
        }

        const adminDetails = {
          email: email,
          phone: phone,
          password: password,
        }
        
        console.log(adminDetails,ip)

         axios.post(`http://${ip}:5000/admin/add`,adminDetails)
          .then(res => {
            console.log(res.data)
            console.log(res.data.token)
            dispatch(updatePost(res.data.post))
            dispatch(updateToken(res.data.token))
            dispatch(updateEmail(res.data.email))
            dispatch(updateName('admin'))
            navigation.navigate('Home')
          })
          .catch((error) => {
            console.log(error.message)
            alert('stop it')
          })

        /* onAdd({user,email,password,passwordr}) */

        setPhone('')
        setEmail('')
        setPassword('')
        setRPassword('')
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Form onButtonPress={onSubmit}>
                
                <FormItem
                    label="Email"
                    style={styles.box}
                    isRequired
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    asterik
                  />
                <FormItem
                    label="Phone Number"
                    style={styles.box}
                    isRequired
                    value={phone}
                    onChangeText={(phone) => setPhone(phone)}
                    asterik
                  />
            
                <FormItem
                    label="Password"
                    style={styles.box}
                    isRequired
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    asterik
                  />
                  <FormItem
                    label="Repeat Password"
                    style={styles.box}
                    isRequired
                    value={rpassword}
                    onChangeText={(password) => setRPassword(password)}
                    asterik
                  />
                  
                   
            </Form>
            </ScrollView>
        </View>
    )
  }