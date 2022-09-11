import { createStackNavigator } from 'react-navigation-stack';
import Teacherlogin from '../components/TeacherLogin'
import Home from '../components/Home'
import About from '../components/About'
import React from 'react'
import Header from '../components/Header'


const screens = {
    Teacherlogin: {
        screen: Teacherlogin,
        navigationOptions: {
            headerTitle: () => < Header / >

        }
    },


}

const Loginteacher = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default Loginteacher;