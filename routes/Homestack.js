import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../components/Home'
import About from '../components/About'
import Header from '../components/Header'



const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: () => < Header / >

        }
    },
    About: {
        screen: About,
        navigationOptions: {
            title: 'About'
        }
    }

}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default HomeStack;