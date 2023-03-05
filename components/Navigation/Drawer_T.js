import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home'
import {ip} from '../ip'
import About from '../About'
import Studentlist from '../ApprovalList/Studentlist'
import PrintT from '../Print/PrintT'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Department from '../Lists/Department'
import Session from '../Lists/Session'
import Course from '../Lists/Course'
import AddStudents from '../Lists/AddStudents'
import Courses from '../Create/Course'
import Take from '../Attendence/Take'
import Utake from '../Attendence/Utake'
import Date from '../Attendence/DateF'
import PrintDt from '../Attendence/PrintDt'
import Reg from '../Attendence/Reg'
import PrintRg from '../Attendence/PrintRg'
import Section from '../Lists/Section'
import CollaboratorC from '../Lists/CollaboratorC'
import StudentC from '../Lists/StudentC'
import StudentlistL from '../Lists/Studentlist'
import Sectionform from '../Lists/Sectionform'
import Sections from '../Create/Section'
import Accesslist from '../ApprovalList/Accesslist'
import AccessTlist from '../ApprovalList/AccessTlist'
import PrintAc from '../Print/PrintAc'
import PrintAct from '../Print/PrintAct'
import PrintCol from '../Print/PrintCol'
import PrintSt from '../Print/PrintSt'
import Mycourses from './Mycourses'
import PasswordUpdate from '../EntityUpdate/PasswordUpdate';
import AvatarUpdate from '../EntityUpdate/AvatarUpdate';

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
  selectAvatar
  
} from '../Loginslice'

const Stack = createStackNavigator();

function AccessList(){
  return(
      <Stack.Navigator >
          <Stack.Screen name="Access List" component={Accesslist} />
          <Stack.Screen name="PrintAc" component={PrintAc} />
      </Stack.Navigator>
  )
}

function AccessListTeacher(){
  return(
      <Stack.Navigator >
          <Stack.Screen name="Access List Teacher" component={AccessTlist} />
          <Stack.Screen name="PrintAct" component={PrintAct} />
      </Stack.Navigator>
  )
}

function ApprovalList(){
  const university = useSelector(selectUniversity)
  return(
      <Stack.Navigator 
      >
          <Stack.Screen name="Department List" component={Department} initialParams={{university: university}} />
          <Stack.Screen name="Session List" component={Session} />
          <Stack.Screen name="Course List" component={Course} />
          <Stack.Screen name="Section List" component={Section} />
          <Stack.Screen name="Sectionform" component={Sectionform} />
          <Stack.Screen name="Student List" component={StudentlistL} />
          <Stack.Screen name="Create Section" component={Sections} />
          <Stack.Screen name="Take" component={Take} />
          <Stack.Screen name="Utake" component={Utake} />
          <Stack.Screen name="Date" component={Date} />
          <Stack.Screen name="Reg" component={Reg} />
          <Stack.Screen name="PrintDt" component={PrintDt} />
          <Stack.Screen name="PrintRg" component={PrintRg} />
          <Stack.Screen name="Collaborator List" component={CollaboratorC} />
          <Stack.Screen name="Print Collaborator" component={PrintCol} />
          <Stack.Screen name="Students List" component={StudentC} />
          <Stack.Screen name="Print Student" component={PrintSt} />
          <Stack.Screen component={Courses} name="Create Course" />
          <Stack.Screen component={AddStudents} name="Add Students" />
      </Stack.Navigator>
  )
}



  
export default function Drawer_T({navigation}){
    const token = useSelector(selectToken)
    const post = useSelector(selectPost)
    const dispatch = useDispatch()
    const name = useSelector(selectName)
    const email = useSelector(selectEmail)
    const avatar=useSelector(selectAvatar)
    console.log(token)

    const logoutClick = ()=>{
      console.log(post,token)
      console.log('token ',token)
      axios.get(`${ip}/${post}/logout`, {
          headers: {
            'Authorization': token
          }
        })
      .then(
          res => {
              console.log(res.data)
              dispatch(updatePost(''))
              dispatch(updateName(''))
              dispatch(updateEmail(''))
              dispatch(updateUniversity(''))
              dispatch(updateDepartment(''))
              dispatch(updateToken(''))
          }
       ) 
       .catch(err =>{
           console.log(err)
       })
  }
    const Drawer = createDrawerNavigator()

    const CustomDrawer = (props)=>{
      return (
            <View style={{flex:1}}>
              <DrawerContentScrollView {...props}>
              <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              backgroundColor:"#f6f6f6",
              marginBottom: 20
            }}>
              <View>
                <Text>{name}</Text>
                <Text>{email}</Text>
                <Image
                  style={styles.tinyLogo}
                  source={{
                      uri: avatar,
                  }}
              />
              </View>
            </View>
            <DrawerItemList {...props} />
           </DrawerContentScrollView>
           <TouchableOpacity style={{
              backgroundColor: '#f6f6f6',
              right:0,
              left:0,
              bottom:50,
              padding:20,
              
           }} 
           onPress={logoutClick}>
             <Text>Logout</Text>

           </TouchableOpacity>
            </View>
      )
    }
    const DrawerNavigator = ()=>{
      return (
        <Drawer.Navigator drawerContent = {(props)=><CustomDrawer {...props} />} screenOptions={({navigation}) => ({
          // headerShown:false,
          headerStyle: {
          backgroundColor: '#5C6BC0',
          },
          headerTintColor: '#fff',
     })}>
          <Drawer.Screen component={ApprovalList} name="Department List" />
          <Drawer.Screen component={AccessList} name="Student Access List" />
          <Drawer.Screen component={AccessListTeacher} name="Teacher Access List" />
          <Drawer.Screen component={Mycourses} name="My Courses" />
          <Drawer.Screen component={Home} name="Home" />
          <Drawer.Screen component={About} name="About" />
          <Drawer.Screen name="Update Password" component={PasswordUpdate}  />
          <Drawer.Screen name="Update Photo" component={AvatarUpdate}  />
        </Drawer.Navigator>
      )
    }

    return (
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>

    )
}

const styles=StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
})