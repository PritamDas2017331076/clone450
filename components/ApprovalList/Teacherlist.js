import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectDepartment } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Teacherlist({navigation}){
    const [list, setList] = useState([])
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)
    const [loading, setLoading] = useState(true)
    let f=0
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/approveT?university=${university}&department=${department}`)
        console.log('for ',university, department,' data ', res.data) 
        setList(res.data)
        setLoading(false)
      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
      navigation.setOptions({ title: "Teacher Access List"}) 
      let fl=1
      const unsubscribe = navigation.addListener('focus', () => {
            effect()
            // axios.get(`${ip}/approveT?university=${university}&department=${department}`)
            // .then(res => {
            //     console.log('for ',university, department,' data ', res.data) 
            //     setList(res.data)
            // })
            // .catch((error) => console.error(error))
            // .finally(() => {
            //    setLoading(false)
            //    fl=0 ;
            //  });
        });
    
        return unsubscribe;
      }, [navigation]);

   console.log('check it out ',f,list)

   const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
          backgroundColor: 'white',
          margin: 20,
          flexDirection: 'row'
        }} 
        onPress={()=>navigation.navigate('PrintT',{
            un: item._id,
            id: item.id
      })}>
         <View>
          <Text>Name: {item.name}</Text>
          <Text>Email: {item.email}</Text>
         </View>
         <View>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: item.avatar,
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
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    tinyLogo: {
      width: 150,
      height: 150,
    },
  });