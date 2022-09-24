import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView,TouchableOpacity,Image,Button} from 'react-native'
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

export default function UAdminRegister({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [university, setUniversity] = useState('')
    const [rpassword, setRPassword] = useState('')
    const [activated, setActivated] = useState(false)
    const [list, setList] = useState([])
    const [dist, setDist] = useState([])
    const [file, setFile] = useState('');
    const [progress, setProgress] = useState(0);
    const [title,setTitle] = useState('no file choosen')


    useEffect(() => {
          axios.get(`${ip}/universities`)
          .then(res => {
              console.log('data ', res.data) 

              setList(res.data.map( (s) => {
                return {value:s.abbreviation, label:s.university}
            }))
            console.log(list)
         }) ;

        
  
    }, []);

    useEffect(() => {
     axios.get(`${ip}/departments/uni?university=${university}`)
      .then(res => {
          console.log('data ', res.data)

          setDist(res.data.map( (s) => {
            return {label:s.department, value:s.abbreviation}
        }))
        console.log(dist)
     }) ;

    }, [university]);

    const dispatch = useDispatch()

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

    const onSubmit = (e) => {
        //e.preventDefault()

        if(!name){
            alert('Please enter name')
            return
        }

        if(!email){
            alert('Please enter email')
            return
        }

        if(!phone){
            alert('Please enter phone number')
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
      console.log(name,email)
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
        "department",
         department
      );
      formData.append(
        "password",
         password
      );
      console.log(department)



        // const Details = {
        //   name: name,
        //   email: email,
        //   phone: phone,
        //   university: university,
        //   department: department,
        //   password: password,
        // }
        
        console.log(formData,ip)

         axios.post(`${ip}/department_head/add`,formData,{
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
            console.log(error.message)
            alert('stop it')
          })

        /* onAdd({user,email,password,passwordr}) */

        setName('')
        setPhone('')
        setEmail('')
        setPassword('')
        setDepartment('')
        setRPassword('')
        setUniversity('')
        setFile('')
        

        
    }

    const force = (e) => {
      //e.preventDefault()

      if(!name){
          alert('Please enter name')
          return
      }

      if(!email){
          alert('Please enter email')
          return
      }

      if(!phone){
          alert('Please enter phone number')
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
    console.log(name,email)
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
      "department",
       department
    );
    formData.append(
      "password",
       password
    );
    console.log(department)



      // const Details = {
      //   name: name,
      //   email: email,
      //   phone: phone,
      //   university: university,
      //   department: department,
      //   password: password,
      // }
      
      console.log(formData,ip)

       axios.post(`${ip}/department_head/addd`,formData,{
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
          console.log(error.message)
          alert('stop it')
        })

      /* onAdd({user,email,password,passwordr}) */

      setName('')
      setPhone('')
      setEmail('')
      setPassword('')
      setDepartment('')
      setRPassword('')
      setUniversity('')
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
                    label="Name"
                    style={styles.box}
                    isRequired
                    value={name}
                    onChangeText={(name) => setName(name)}
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
                <Picker
                    items={list}
                    label="Pick a University"
                    style={styles.box}
                    selectedValue={university}
                    onSelection={(item) => setUniversity(item.value)}
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
                  <TouchableOpacity onPress={openImageLibrary}>
                 {file?
                  <Image source={{uri: file}} style={{height:50,width:50}}/> :
                  <Text style={{backgroundColor:'#a9a9a9',width:100, textAlign:'center'}}>{title}</Text>}
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