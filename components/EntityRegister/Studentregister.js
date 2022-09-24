import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux'
import { Input,Icon, Layout } from '@ui-kitten/components';
import {Text, View, StyleSheet,ScrollView, TouchableOpacity,Button, Image,TouchableWithoutFeedback} from 'react-native'

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
const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline'/>
);
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
    const [fist, setFist] = useState([])
    const [temp,setTemp] = useState()
    const [file, setFile] = useState('');
    const [progress, setProgress] = useState(0);
    const [title,setTitle] = useState('no file choosen')
    const [value, setValue] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true)
      
    useEffect(() => {
          axios.get(`${ip}/universities`)
          .then(res => {
              console.log('data university', res.data) 
              setList(res.data.map( (s) => {
                return {value:s.abbreviation, label:s.university}
            }))
            console.log(list)
         }) ;
  
    }, []);
    useEffect(() => {

     axios.get(`${ip}/departments/uni?university=${university}`)
      .then(res => {
          console.log('data department ', res.data) 

          setDist(res.data.map( (s) => {
            return {value:s.abbreviation, label:s.department}
        }))
        console.log(dist)
     }) ;

    }, [university]);

    useEffect(() => {

      axios.get(`${ip}/session/ud?university=${university}&department=${department}`)
       .then(res => {
           console.log('data department ', res.data) 
 
           setFist(res.data.map( (s) => {
             return {value:s.session, label:s.session}
         }))
         console.log(dist)
      }) ;
 
     }, [department]);

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
        // e.preventDefault()
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
      console.log('name,reg,email,pass',name,reg,email,password)


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
        
        console.log(ip,university,department)

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

    const force = (e) => {
      // e.preventDefault()
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
    console.log('name,reg,email,pass',name,reg,email,password)


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
      
      console.log(ip,university,department)

       axios.post(`${ip}/student/addd`,formData,{
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
                <Input
                    label="Email"
                    isRequired
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    style={styles.input}
                  />
                <Input
                    label="Registration Number"
                    isRequired
                    value={reg}
                    style={styles.input}
                    onChangeText={(email) => setReg(email)}
                    asterik
                  />
                <Input
                    label="Name"
                    style={styles.input}
                    isRequired
                    value={name}
                    onChangeText={(user) => setName(user)}
                    asterik
                  />
                <Input
                    label="Phone"
                    style={styles.input}
                    isRequired
                    value={phone}
                    onChangeText={(user) => setPhone(user)}
                    asterik
                  />
                <Picker
                    items={list}
                    label="Pick a University"
                    selectedValue={university}
                    onSelection={(item) => setUniversity(item.value)}
                   />
                <Picker
                    items={fist}
                    label="Pick a session"
                    // style={styles.box}
                    selectedValue={session}
                    onSelection={(item) => setSession(item.value)}
                   />
                <Picker
                    items={dist}
                    label="Pick a Department"
                    // style={styles.box}
                    selectedValue={department}
                    onSelection={(item) => setDepartment(item.value)}
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


                  {/* /// */}
                  <TouchableOpacity onPress={openImageLibrary}>
                 {file?
                  <Image source={{uri: file}} style={{height:50,width:50}}/> :
                  <Text style={{backgroundColor:'#a9a9a9',width:100, textAlign:'center',marginLeft:100}}>{title}</Text>}
                 </TouchableOpacity>
                   
            </Form>
            {/* <Button onPress={force} title='force' /> */}

            </ScrollView>
        </View>
    )
}

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
});
