import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { useSelector, useDispatch } from 'react-redux';
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
    selectDepartment,
    selectId
} from '../Loginslice'


export default function AccessTlist({navigation}){
    const [list, setList] = useState([])
    const university = useSelector(selectUniversity)
    const id= useSelector(selectId)
    let f=0
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        console.log(id)
        let fl=1
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ip}:5000/approveCo/teacher?teacher=${id}`)
            .then(res => {
                console.log('for ',university,' data ', res.data) 
                setList(res.data)
             })
             .catch((error) => console.error(error))
             .finally(() => {
               setLoading(false)
               fl=0 ;
             });
        });
    
        return unsubscribe;

      }, [navigation]);

   console.log('check it out ',f,list)

   const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
            backgroundColor: '#f6f6f6',
            }} 
            onPress={()=>navigation.navigate('PrintAct',{
                un: item._id,
                id: item.id
        })}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.course_name}</Text>
      </TouchableOpacity>
    </View>
  );

   const renderItem = ({ item }) => (
    <Item item={item} />
   );


    return(
        <View>
            {loading?<Text>loading</Text>
                   :<FlatList
                         data={list}
                         renderItem={renderItem}
                         keyExtractor={item => item._id}
                       />
                    }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  