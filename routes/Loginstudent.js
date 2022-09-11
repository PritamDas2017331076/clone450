import { createStackNavigator } from 'react-navigation-stack';
import Studentlogin from '../components/Studentlogin'
import Home from '../components/Home'
import About from '../components/About'
import React from 'react'
import Header from '../components/Header'


const screens = {
    Studentlogin: {
        screen: Studentlogin,
        navigationOptions: {
            headerTitle: () => < Header / >

        }
    },


}

const Loginstudent = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default Loginstudent;