import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList  } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Date({route, navigation}){
    const { course_id, section } = route.params
    const [list,setList]=useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let fl=1
        console.log(course_id,section)
        axios.get(`${ip}/byreg/srr?course_id=${course_id}&section=${section}`)
        .then(res => {
            console.log(' data ', res.data)
            let arr=res.data
            console.log(arr)
         //   arr=arr.filter(item=>(item.section==section))
            console.log(arr)
            setList(arr.map((item,index)=>{
                return {registration_number:item.registration_number,record:item.record,avatar:item.avatar,id:index}
            }))
       })
       .catch(err=>{console.log('error reg.js',err)})
       .finally(()=>{setLoading(false) })

  }, []);
  console.log(list)

  const Item = ({ item }) => (
    <View style={styles.item}>
       <TouchableOpacity style={{backgroundColor:'white',margin:20,flexDirection:'row'}} 
          onPress={()=>navigation.navigate('PrintRg',{
                                record: item.record,
                                course_id: course_id,
                                section: section
        })}>
            <View>
                  <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: item.avatar,
                      }}
                      />
            </View>
            <Text style={{marginLeft:'15%'}}>{item.registration_number}</Text>
        </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item item={item}  />
   );


    return(
        <View>
            {loading?<Text>loading</Text>
                   :<FlatList
                         data={list}
                         contentContainerStyle={{paddingBottom:150}}
                         renderItem={renderItem}
                         keyExtractor={item => item.id}
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    marginRight:20
  },
  label: {
    margin: 8,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});