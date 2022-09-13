import React from 'react';
import {useState} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'
import About from './About'
import Studentlogin from './Studentlogin';
import Teacherlogin from './TeacherLogin';
import Studentregister from './Studentregister'
import AsyncStorage from '@react-native-async-storage/async-storage';


const logoutClick = async ()=>{
  const pp=await AsyncStorage.getItem('status')
  axios.get(`${ip}/${pp}/logout`, {
      headers: {
        'Authorization': AsyncStorage.getItem('token')
      }
    })
  .then(
      async res => {
          await AsyncStorage.setItem('@token', '1a');
          await AsyncStorage.setItem('@state','st')
          console.log(res.data)
          await AsyncStorage.setItem('@log','n')
          navigation.navigate('Home')
      }
   ) 
   .catch(err =>{
       console.log(err)
   })
}

const getToken = async()=>{
  return await AsyncStorage.getItem('@token')

}


    const RenderMenu = async() => {
      
      if(await getLog()!='y'){
          const Drawer = createDrawerNavigator();
          return(
              <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                  <Drawer.Screen name="Home" component={Home} />
                  <Drawer.Screen name="About" component={About} />
                  <Drawer.Screen name="Student Login" component={Studentlogin} />
                  <Drawer.Screen name="Teacher Login" component={Teacherlogin} />
                  <Drawer.Screen name="Student Register" component={Studentregister} />
                </Drawer.Navigator>
              </NavigationContainer>
          )
      }else{
          const Drawer = createDrawerNavigator();
          return(
            <NavigationContainer>
              <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="About" component={About} />
                <Drawer.Screen name="Logout" component={Home} />
              </Drawer.Navigator>
            </NavigationContainer>
          )
      }
    }
export default function Drawer({navigation}){
    
    return (
        <RenderMenu/>

    )
}

