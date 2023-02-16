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
import Uadminlist from '../ApprovalList/Uadminlist'
import PrintAdmin from '../Print/PrintAdmin'
import UniversityAdd from '../Add/UniversityAdd'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Date from '../Attendence/DateF'
import PrintDt from '../Attendence/PrintDt'
import Reg from '../Attendence/Reg'
import PrintRg from '../Attendence/PrintRg'
import Department from '../Lists/Department'
import Session from '../Lists/Session'
import Course from '../Lists/Course'
import Section from '../Lists/Section'
import StudentlistL from '../Lists/Studentlist'
import University from '../Lists/University'
import UadminAll from '../Lists/UadminAll'
import UadminDelete from '../Print/UadminDelete'
import PasswordUpdate from '../EntityUpdate/PasswordUpdate';
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


function NavList(){
  return(
      <Stack.Navigator>
          <Stack.Screen name="University List" component={University}  />
          <Stack.Screen name="Department List" component={Department}  />
          <Stack.Screen name="Session List" component={Session} />
          <Stack.Screen name="Course List" component={Course} />
          <Stack.Screen name="Section List" component={Section} />
          <Stack.Screen name="Student List" component={StudentlistL} />
          <Stack.Screen name="Date" component={Date} />
          <Stack.Screen name="Reg" component={Reg} />
          <Stack.Screen name="PrintDt" component={PrintDt} />
          <Stack.Screen name="PrintRg" component={PrintRg} />
      </Stack.Navigator>
  )
}

function ApprovalList(){
  return(
      <Stack.Navigator>
          <Stack.Screen name="University Admin List" component={Uadminlist} />
          <Stack.Screen name="PrintAdmin" component={PrintAdmin} />
      </Stack.Navigator>
  )
}

function DeleteUadmin(){
  return(
      <Stack.Navigator>
          <Stack.Screen name="University admin List" component={UadminAll} />
          <Stack.Screen name="University Info" component={UadminDelete} />
      </Stack.Navigator>
  )
}



  
export default function Drawer({navigation}){
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
        <Drawer.Navigator drawerContent = {(props)=><CustomDrawer {...props} />} screenOptions={({navigation}) => ({
          headerStyle: {
          backgroundColor: '#5C6BC0',
          },
          headerTintColor: '#fff',
          headerRight: () => {
            return (
               <TouchableOpacity
                 style={{paddingRight: 8}}
                 onPress={() => navigation.toggleDrawer()}>
                  <Text>toggle</Text>
               </TouchableOpacity>
             );
          },
})}>
          <Drawer.Screen component={NavList} name="Departments" />
          <Drawer.Screen component={Home} name="Home" />
          <Drawer.Screen component={About} name="About" />
          <Drawer.Screen component={ApprovalList} name="Approvals" />
          <Drawer.Screen component={UniversityAdd} name="UniversityAdd" />
          <Drawer.Screen component={DeleteUadmin} name="University Admin List" />
          <Drawer.Screen name="Update Password" component={PasswordUpdate}  />
        </Drawer.Navigator>
      )
    }

    return (
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>

    )
}