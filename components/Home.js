import React,{useState, useEffect} from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

export default function Home({navigation}){

    return(
        <View style={styles.container}>
            {/* <Spinner
                visible={true}
                textContent={'Loading...'}
            /> */}
            <Text style = {{margin:10,fontSize:19,textAlign:'center'}}>
                Welcome to our attendance management application. 
            </Text>
            <Text style = {{marginVertical:40,textAlign:'center',fontSize:16}}>
                Please open the drawer and you will get necessary navigations to register and login.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 80,
        padding: 10,
        // justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
        backgroundColor: '#fff'
    },
    text:{
        color: 'red',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    button:{
        color: 'coral',
        width: 80,
        justifyContent: 'center',
    }

})