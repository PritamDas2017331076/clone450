import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

export default function About(){
    return (
        <View style={styles.container}>
          <Text style={styles.text}>This application is developed to take attendence of students</Text>
        </View>  
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 80,
        padding: 10,
        backgroundColor: '#fff'
    },
    text:{
        color: 'red',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
    }

})