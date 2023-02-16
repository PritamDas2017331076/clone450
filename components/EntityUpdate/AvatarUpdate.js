import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux'
import { Input,Icon} from '@ui-kitten/components';
import {View,StyleSheet,ScrollView, TouchableOpacity, Image,TouchableWithoutFeedback} from 'react-native'
import {Card,Button, Modal, Text } from '@ui-kitten/components';

///
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';

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
  selectDepartment,
  selectId
} from '../Loginslice'

const AvatarUpdate = ({navigation}) => {
    const [file, setFile] = useState('');
    const [progress, setProgress] = useState(0);
    const [title,setTitle] = useState('no file choosen')
    const [value, setValue] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [visible, setVisible] = React.useState(false);
    const post=useSelector(selectPost)
    const id=useSelector(selectId)
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
    const onSubmit = async(e)=>{
        if(!file){
            alert('Please enter file')
            return
          }
          const formData = new FormData();
         // console.log('name,reg,email,pass',name,reg,email,password)
    
    
          console.log('file',file)
        
          // Update the formData object
          formData.append('avatar', {
            name: new Date() + '_profile',
            uri: file,
            type: 'image/png'
          });
          try{
            const res=await axios.patch(`${ip}/${post}/avatar/${id}`,formData,{
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
             })
             console.log(res.data)
  
                    ///
                   
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
                
                  {/* /// */}
                  <TouchableOpacity onPress={openImageLibrary}>
                 {file?
                  <Image source={{uri: file}} style={{height:50,width:50}}/> :
                  <Text style={{backgroundColor:'#a9a9a9',width:100, textAlign:'center',marginLeft:100}}>{title}</Text>}
                 </TouchableOpacity>
                   
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

export default AvatarUpdate

const styles = StyleSheet.create({})