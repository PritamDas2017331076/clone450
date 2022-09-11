import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';

export default function Header({navigation}){
   /* const openMenu = () => {
        //navigation.dispatch(DrawerActions.openDrawer())
        navigation.openDrawer();
      }*/
    return (
        <View style={styles.header}>
            
            <Text style={styles.title}>Attendence App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'red'
    },
    title:{
        fontWeight:'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },
    icon: {
        position: 'absolute',
        left: 16,
      }
})