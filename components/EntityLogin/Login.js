import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormItem, Picker } from 'react-native-form-component';
import { Input,Icon, Layout} from '@ui-kitten/components';
import {Text, View, StyleSheet,ScrollView, TouchableOpacity, Image,TouchableWithoutFeedback} from 'react-native'
import {ip} from '../ip'
import {
  updateEmail,
  updateName,
  updateToken,
  updatePost,
  updateUniversity,
  updateDepartment,
  updateId,
  updateAvatar,
  selectEmail,
  selectName,
  selectToken,
  selectPost,
  selectUniversity,
  selectDepartment
} from '../Loginslice'
import axios from 'axios'

/*
selectIsLoggedin,
  selectLoggedinUser,
  selectEntity,
  selectToken,
*/

export default function Studentlogin({navigation}){
    const [email, setEmail] = useState('')
    const [post, setPost]=useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    console.log(ip)

    const dispatch = useDispatch()

    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };
    const EmailIcon = (props) => (
      <Icon {...props} name='email'/>
    );
    const LockIcon = (props) => (
      <Icon {...props} name='lock'/>
    );
    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
      </TouchableWithoutFeedback>
    );
  
    const renderCaption = () => {
      return (
        <View style={styles.captionContainer}>
          {AlertIcon(styles.captionIcon)}
          <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
        </View>
      )
    }
    const onSubmit = (e) => {
       // e.preventDefault()

        if(!email){
            alert('Please enter email')
            return
        }

        if(!post){
            alert('Please enter post')
        }

        if(!password){
            alert('Please enter password')
            return
        }
        /* onAdd({user,email,password,passwordr}) */

        const Details = {
            email: email.trim(),
            post: post,
            password: password
          }

        console.log("ip = ",Details,ip)
        
        const pp=ip

        axios.post(`${ip}/${post}/login`,Details)
          .then(
              res => {
               //   dispatch({type:"USER",payload:user})
                //  console.log(state)

                  console.log('data ',res.data)
                //  console.log('post ',res.data.admin.post)
                  console.log('data token ',res.data.token)
                  dispatch(updateToken(res.data.token))
                  dispatch(updatePost(res.data.post))
                  dispatch(updateId(res.data.id))
                  if(res.data.university) dispatch(updateUniversity(res.data.university))
                  if(res.data.department) dispatch(updateDepartment(res.data.department))
                  if(res.data.name) dispatch(updateName(res.data.name))
                  if(res.data.email) dispatch(updateEmail(res.data.email))
                  if(res.data.avatar) dispatch(updateAvatar(res.data.avatar))
                  navigation.navigate('Home')
              }
           ) 
           .catch(err =>{
              console.log('hah')
              console.log(err)
           })

        setEmail('')
        setPost('')
        setPassword('')
    }
    return(
        <View style={styles.container}>
            <Form onButtonPress={onSubmit}>
            <Input
                label="Email"
                placeholder='Enter email'
                value={email}
                onChangeText={(email) => setEmail(email)}
                accessoryLeft={EmailIcon}
                style={styles.input}
              />
              <Input
                value={password}
                label='Password'
                placeholder='Enter password'
                // caption={()=>renderCaption("Password must be 8 characters long")}
                accessoryRight={renderIcon}
                accessoryLeft={LockIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={nextValue => setPassword(nextValue)}
                style={styles.input}
              />
              <Picker
                    style={styles.input}
                    items={[
                    { label: 'admin', value: 'admin' },
                    { label: 'university_admin', value: 'university_admin' },
                    { label: 'department_head', value: 'department_head' },
                    { label: 'teacher', value: 'teacher' },
                    { label: 'student', value: 'student' }
                   ]}
                    label="post"
                    selectedValue={post}
                    onSelection={(item) => setPost(item.value)}
                   />
            </Form>
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    padding: 30,
    border: '2px solid black',
    backgroundColor: '#e3e3e3'
    
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#8F9BB3",
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
  },
  input: {
    width:'100%',
    marginBottom:23,
  },
});
