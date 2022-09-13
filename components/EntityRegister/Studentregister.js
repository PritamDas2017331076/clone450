import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView, TouchableOpacity, Image} from 'react-native'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux'

///
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
export default function Studentregister({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [university, setUniversity] = useState('')
    const [session, setSession] = useState('')
    const [reg, setReg] = useState('')
    const [department, setDepartment] = useState('')
    const [rpassword, setRPassword] = useState('')
    const [list, setList] = useState([])
    const [dist, setDist] = useState([])
    const [sist, setSist] = useState([])
    ///
    const [file, setFile] = useState('');
    const [progress, setProgress] = useState(0);
    const [title,setTitle] = useState('no file choosen')


    useEffect(() => {
          axios.get(`${ip}/university_admin`)
          .then(res => {
              console.log('data university', res.data) 

              setList(res.data.map( (s) => {
                return {value:s.university, label:s.university}
            }))
            console.log(list)
         }) ;

         axios.get(`${ip}/departments`)
          .then(res => {
              console.log('data department ', res.data) 

              setDist(res.data.map( (s) => {
                return {value:s.department, label:s.department}
            }))
            console.log(dist)
         }) ;
  
    }, []);

    ///
    const openImageLibrary = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
  
      if (status === 'granted') {
        const response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
        });
  
        if (!response.cancelled) {
          console.log(response)
          setFile(response.uri);
          console.log(response.uri)
        }
      }
    };
  

    const onFileChange = e => {
    
      // Update the state
      console.log('value',e.target.files[0])
      setFile(e.target.files[0]);
      console.log('file updated',e.target.files[0])
      console.log(file)
    
    };

    const dispatch = useDispatch()
    const onSubmit = (e) => {
        //e.preventDefault()

        
        if(!name){
          alert('Please enter name')
          return
      }

      if(!phone){
          alert('Please enter phone')
          return
      }

      if(!university){
          alert('Please enter university')
          return
      }

      if(!department){
          alert('Please enter department')
          return
      }

      if(!email){
          alert('Please enter email')
          return
      }

      if(!session){
        alert('Please enter session')
        return
      }

      if(!reg){
        alert('Please enter registration number')
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

      if(!file){
        alert('Please enter file')
        return
      }
      const formData = new FormData();
      console.log(name,reg,email)
      console.log('file',file)
    
      // Update the formData object
      formData.append('avatar', {
        name: new Date() + '_profile',
        uri: file,
        type: 'image/png'
      });

      // formData.append(
      //   "files",
      //   file
      // )
      formData.append(
        "name",
         name
      );
      formData.append(
        "registration_number",
         reg
      );
      formData.append(
        "email",
         email
      );
      formData.append(
        "phone",
         phone
      );

      formData.append(
        "university",
         university
      );
      formData.append(
        "session",
         session
      );
      formData.append(
        "department",
         department
      );
      formData.append(
        "password",
         password
      );

        // const studentDetails = {
        //   name: name,
        //   registration_number: reg,
        //   email: email,
        //   phone: phone,
        //   university: university,
        //   session: session,
        //   department: department,
        //   password: password,
        // }
        
        console.log(formData,ip)

         axios.post(`${ip}/student/add`,formData,{
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
         })
          .then(res => {
                  console.log(res.data)

                  ///
                  if (res.data.success) {
                    navigation.dispatch(StackActions.replace('UserProfile'));
                  }
                  navigation.navigate('Home')
          })
          .catch((error) => {
            console.log(error,error.message)
          })

        /* onAdd({user,email,password,passwordr}) */

        setName('')
        setPhone('')
        setUniversity('')
        setDepartment('')
        setEmail('')
        setPassword('')
        setRPassword('')
        setSession('')
        setReg('')
        setFile('')
        

        
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
                    label="Registration Number"
                    style={styles.box}
                    isRequired
                    value={reg}
                    onChangeText={(email) => setReg(email)}
                    asterik
                  />
                <FormItem
                    label="Name"
                    style={styles.box}
                    isRequired
                    value={name}
                    onChangeText={(user) => setName(user)}
                    asterik
                  />
                <FormItem
                    label="Phone"
                    style={styles.box}
                    isRequired
                    value={phone}
                    onChangeText={(user) => setPhone(user)}
                    asterik
                  />
                <Picker
                    items={list}
                    label="Pick a University"
                    style={styles.box}
                    selectedValue={university}
                    onSelection={(item) => setUniversity(item.value)}
                   />
                <Picker
                    items={[
                    { label: '2017-18', value: '2017-18' },
                    { label: '2018-19', value: '2018-19' },
                    { label: '2019-20', value: '2019-20' },
                    { label: '2020-21', value: '2020-21' },
                    { label: '2021-22', value: '2021-22' },
                   ]}
                    label="Pick a session"
                    style={styles.box}
                    selectedValue={session}
                    onSelection={(item) => setSession(item.value)}
                   />
                <Picker
                    items={dist}
                    label="Pick a Department"
                    style={styles.box}
                    selectedValue={department}
                    onSelection={(item) => setDepartment(item.value)}
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

                  {/* /// */}
                  <TouchableOpacity onPress={openImageLibrary}>
                 {file?
                  <Image source={{uri: file}} style={{height:50,width:50}}/> :
                  <Text style={{backgroundColor:'#a9a9a9',width:100, textAlign:'center'}}>{title}</Text>}
                 </TouchableOpacity>
                   
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