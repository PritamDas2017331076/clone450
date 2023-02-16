import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux'
import { Input,Icon} from '@ui-kitten/components';
import {View,StyleSheet,ScrollView, TouchableOpacity, Image,TouchableWithoutFeedback} from 'react-native'
import {Card,Button, Modal, Text } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';

import {ip} from '../ip'
import {
    toggleLoggedin, 
    updateLoggedinUser,
    updateEntity,
    updateToken,
    selectIsLoggedin,
    selectLoggedinUser,
    selectEntity,
    selectToken,
  } from '../Loginslice'
const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline'/>
);

const PasswordUpdate = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [post, setPost]=useState('')
    const [password, setPassword] = useState('')
    const [rpassword, setRPassword] = useState('')
    const [value, setValue] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [visible, setVisible] = React.useState(false);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
      };
    
      const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
          <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
      );
    
      const renderCaption = (s) => {
        return (
          <View style={styles.captionContainer}>
            {AlertIcon(styles.captionIcon)}
            <Text style={styles.captionText}>{s}</Text>
          </View>
        )
      }
    const onSubmit = async(e)=>{
        if(!email){
            alert('Please enter email')
            return
        }
  
        if(!password){
            alert('Please enter password')
            return
        }
  
        if(!rpassword){
            alert('Please enter password again')
            return
        }
  
        if(!post){
            alert('Please enter post')
            return
        }
        const Details = {
            email: email.trim(),
            post: post,
            password: password
          }
        console.log(Details)
        try{
            const res=await axios.post(`${ip}/${post}/pass`,Details)
            console.log(res.data)
            alert('check your mail')
            navigation.navigate('Home')
        }catch(error){
        console.log(error)
        alert(error.message)
        }
    }
    return (
        <View style={styles.container}>
                <ScrollView>
                <Form onButtonPress={onSubmit}>
                    <Input
                        label="Email"
                        isRequired
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        style={styles.input}
                    />
                
                    <Input
                        value={password}
                        label='Password'
                        placeholder='Enter a strong password'
                        caption={()=>renderCaption("Password must be 8 characters long")}
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setPassword(nextValue)}
                        style={styles.input}
                    />
                    <Input
                        value={rpassword}
                        label='Password'
                        placeholder='Enter the same password'
                        // caption={()=>renderCaption("Password must be 8 characters long")}
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setRPassword(nextValue)}
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


                    {/* /// */}
                    
                    
                </Form>
                {/* <Button onPress={force}>Force</Button> */}

                </ScrollView>
                <Modal visible={visible}>
                <Card disabled={true}>
                <Text>User Successfully Registered!</Text>
                <Text>A verification mail will be sent to your email address</Text>
                <Button size='small'status = 'success' onPress={() => setVisible(false)}>
                    DISMISS
                </Button>
                </Card>
            </Modal>
            </View>
    )
}

export default PasswordUpdate

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 50,
        padding: 30,
        border: '2px solid black',
        backgroundColor: '#fff',
        
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
        width:330,
        flex: 1,
        margin: 4
      },
      sel:{
        margin:5,
        justifyContent:'center'
      },
})