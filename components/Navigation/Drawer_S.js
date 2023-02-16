import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home'
import {ip} from '../ip'
import About from '../About'
import Studentlist from '../ApprovalList/Studentlist'
import PrintT from '../Print/PrintT'
import PrintRg from '../Attendence/PrintRg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Session from '../Lists/Session'
import Course from '../Lists/Course'
import Courses from '../Create/Course'
import Section from '../Lists/Section'
import StudentlistL from '../Lists/Studentlist'
import Sectionform from '../Lists/Sectionform'
import Sections from '../Create/Section'
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
  selectDepartment
  
} from '../Loginslice'

const Stack = createStackNavigator();

/*function ApprovalList(){
  return(
      <Stack.Navigator>
          <Stack.Screen name="Teacher List" component={Teacherlist} />
          <Stack.Screen name="PrintTeacher" component={PrintT} />
      </Stack.Navigator>
  )
}*/

function ApprovalList(){
  const university = useSelector(selectUniversity)
  const department = useSelector(selectDepartment)
  return(
      <Stack.Navigator>
          <Stack.Screen name="Session List" component={Session} initialParams={{university: university, department: department}} />
          <Stack.Screen name="Course List" component={Course} />
          <Stack.Screen name="Section List" component={Section} />
          <Stack.Screen name="Sectionform" component={Sectionform} />
          <Stack.Screen name="Student List" component={StudentlistL} />
          <Stack.Screen name="Create Section" component={Sections} />
          <Stack.Screen name="PrintRg" component={PrintRg} />
          <Stack.Screen name="Create Course" component={Courses}  />
      </Stack.Navigator>
  )
}



  
export default function Drawer_S({navigation}){
    const token = useSelector(selectToken)
    const post = useSelector(selectPost)
    const name = useSelector(selectName)
    const email = useSelector(selectEmail)
    const dispatch = useDispatch()
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
        <Drawer.Navigator drawerContent = {(props)=><CustomDrawer {...props} />} >
          <Drawer.Screen component={ApprovalList} name="Sessions" />
          <Drawer.Screen component={Home} name="Home" />
          <Drawer.Screen component={About} name="About" />
          <Drawer.Screen name="Update Password" component={PasswordUpdate}  />
          <Drawer.Screen name="Update Avatar" component={AvatarUpdate}  />
        </Drawer.Navigator>
      )
    }

    return (
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>

    )
}