import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Image,View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
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


export default function Accesslist({navigation}){
    const [list, setList] = useState([])
    const university = useSelector(selectUniversity)
    const id= useSelector(selectId)
    let f=0
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let fl=1
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${ip}/access/teacher?teacher=${id}`)
            .then(res => {
                // console.log('for ',university,' data ', res.data) 
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

  //  console.log('check it out ',f,list)

   const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
            flexDirection:'row',justifyContent:'space-between'
            }} 
            onPress={()=>navigation.navigate('PrintAc',{
                un: item._id,
                id: item.id
        })}>
          <View>
            <Text>{item.registration_number}</Text>
            <Text>{item.name}</Text>
            <Text>{item.course_name}</Text>
            <Text>{item.section}</Text>
          </View>
          <View>
              <Image
              style={styles.tinyLogo}
              source={{
                  uri:item.avatar,
              }}
              />
          </View>
            
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
                         contentContainerStyle={{paddingBottom:150}}
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
      backgroundColor: 'white',
      padding: 20,
      margin:20
    },
    title: {
      fontSize: 32,
    },
    tinyLogo:{
      width:80,
      height:80,
    }
  });
  