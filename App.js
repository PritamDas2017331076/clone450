import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, {useContext} from 'react'
import MainNavigator from './components/Navigation/MainNavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {store} from './components/store';
import Drawerout from './components/Navigation/Drawerout'
import Drawer from './components/Navigation/Drawer'

export default function App() {
  return (
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 25,
    backgroundColor: '#fff'
},
text:{
    color: 'red',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
}
});
