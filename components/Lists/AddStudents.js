import axios from 'axios'
import { Button, View,StyleSheet, TouchableOpacity, Pressable, TextInput, SafeAreaView, StatusBar, FlatList, Image } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { Form, FormItem, Picker } from 'react-native-form-component';
import React, {useState, useEffect} from 'react'
import {ip} from '../ip'
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {
    selectEmail,
    selectName,
    selectToken,
    selectPost,
    selectUniversity,
    selectDepartment,
    selectId,
    selectAvatar
    } from '../Loginslice';

    const AddStudents = ({route, navigation}) => {
      const {course_id, section} = route.params
      const [session, setSession]=useState('')
      const [students, setStudents]=useState([])
      const [studentInCourse, setStudentInCourse]=useState([])
      const [dist, setDist]=useState([])
      const uni=useSelector(selectUniversity)
      const [filt, setFilt]=useState('')
      const dept=useSelector(selectDepartment)
      const [loading,setLoading] = useState(true)
      const [came, setCame]=useState('')
      const effect = async()=>{
        try{
            const res1=await axios.get(`${ip}/course/${course_id}`)
            const res2 = await axios.get(`${ip}/student?university=${uni}&department=${dept}`)
            // console.log(res1.data.session,uni,dept)
            //console.log("HELLO WORLD",res2.data,'iooo')
             setSession(res1.data.session)
             setCame(res1.data.name)
             let stuInCourse=res1.data.student
             let ct=1
             let ao=[]
             for(let x of stuInCourse){
              ao.push(x.registration_number)
              ct=ct+1
             }
             ao.sort()
             console.log(ao)
             let studentAra = res2.data.map((item,index)=>{
                // console.log("items ",item,index)
                return {registration_number:item.registration_number, name: item.name, session:item.session,avatar:item.avatar,id:item._id}
             })
             let tmp=studentAra

        //   setStudentInCourse(res1.data.student.map((item,index)=>{
        //     return {registration_number:item.registration_number,avatar:item.avatar,id:index}
        //  }))
        //  console.log(studentInCourse,'donewithitornotnjcjjjjf')
        //      console.log(res2.data,'done')
            
        //      console.log('ara',studentAra,'ara');
        //      setStudents([])
        //      studentAra.forEach(ele=>{setStudents(stu=>[...stu,ele]) })
        //      console.log('students',students,'students')
        //     console.log('student in course ',studentInCourse);
        //     console.log('student in res2 ',res2.data);
        //     console.log("res.data ",res2.data)
        //    console.log(students,ip)
        //      let tmp=students
            //  console.log('tmppp',tmp,'tmppp')
             tmp=tmp.filter((ele)=>ele.session==session)
            //  console.log(tmp,'tmp')
            //  setStudents(tmp)
            //  console.log(students,'studentsarehere')
            let arr=[]
            tmp.forEach((ele)=>{
                let news=stuInCourse
                let tpp= news.filter(stu=>(stu.registration_number==ele.registration_number))
                if(tpp.length==0) arr.push(ele)
            })
            arr.sort(function(a,b){
                if(a.registration_number<b.registration_number) return -1
                else return 0
              })
        //    console.log(arr,'arrrrr')
             tmp=arr
             setStudents(tmp)
            //  console.log(students,'student list on')
             setDist(tmp)
             setLoading(false)
              // console.log('students',dist.length)
            //  console.log("loading -> ",loading)
            }catch(e){
              console.log("khaise mara",e)
        }
      }
      
      useEffect(()=>{
        navigation.setOptions({ title: "Add Students"})
        effect()
        console.log("useEffect ",students)
    },[loading])
    //const Array = async()
    let ct=0

    const Accept = async(id)=>{
      const res=await axios.get(`${ip}/student/${id}`)
      const use=res.data

      const chk = {
          section: section,
          registration_number: use.registration_number,
          course_id: course_id,
          course_name: came,
          avatar: use.avatar,
          university: uni,
          department: dept,
          record: []
      }
     // console.log('chk',chk)
      try{
          const res=await axios.post(`${ip}/byreg/add`,chk)
        //  console.log('data added in studentlist ','whole list')
          console.log('data added in byreg ',res.data,'byregdata')
          ct=ct+1
      }catch(error){
          console.log('error in printac accept course',error,'in byreg')
      }
  }
  const GET = async(id)=>{
    const res=await axios.get(`${ip}/student/${id}`)
      return res.data

  }

    const Submit = async(e)=>{
      let arr=[]
      dist.forEach((ele)=>{
        const chg = {
          registration_number: ele.registration_number,
          id: ele.id, 
          section: section,
          avatar: ele.avatar,
          session: ele.session,
          name: ele.name
        }
        arr.push(chg)
      })

      try{
        console.log(arr,'arr means all data we need to push in courses')
        const res1=await axios.patch(`${ip}/course/studentarr/${course_id}`,arr)
        console.log('course student section upated')
      }catch(e){
        console.log('error while adding courses',e.message,'in course student data')
      }
      dist.forEach(ele=>{
        const chg = {
          registration_number: ele.registration_number,
          id: ele.id, 
          section: section,
          avatar: ele.avatar,
          session: ele.session,
          name: ele.name
        }
         Accept(ele.id)

        // console.log('ok',ele.registration_number)
      })
     // console.log(ct,'stuents inserted in byreg')
       navigation.goBack()


    }


    const Item = ({ item }) => (
        <View>
          <View style={{flexDirection: 'row'}} >
              {/* <Pressable
                 style={[styles.checkboxBase, item.status && styles.checkboxChecked]}
                 onPress={()=>setVal(item.id)}>
                 {item.status && <Ionicons name="checkmark" size={24} color="white" /> } 
              </Pressable> */}
              <Card footer={
                  <Text>{item.registration_number}</Text>
              } style={{marginBottom:20}}>
                  <Image
                      style={styles.tinyLogo}
                      source={{
                          uri: item.avatar,
                      }}
                  />
              </Card>
          </View>
        </View>
      );
    
      const renderItem = ({ item }) => (
        <Item item={item}  />
       );
    
       // console.log("students global ",students)
    return (
        <View style={{marginHorizontal:10}}>
          {loading?<Spinner
                      visible={true}
                      textContent={'Loading...'}
                      textStyle={styles.spinnerTextStyle}
                    />
                   :
            <View>
              <FlatList style={{backgroundColor:'white',padding:'5%'}}
                data={dist}
                contentContainerStyle={{paddingBottom:150}}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={(dist.length>0)?<Button onPress={Submit} title="Submit" />:null}
                ListHeaderComponent={
                    <Picker
                    items={[
                        {value:'All', label:'All'},
                        {value:'Even', label:'Even'},
                        {value:'Odd', label:'Odd'},
                    ]}
                    label="Pick a filter parameter"
                    // style={styles.box}
                    selectedValue={filt}
                    onSelection={(item) => {
                        setFilt(item.value)
                        if(item.value=='All') setDist(students)
                        else if(item.value=='Even') setDist(students.filter(ele=>((ele.registration_number*1)%2==0)))
                        else setDist(students.filter(ele=>((ele.registration_number*1)%2==1)))
                    }}
                    />
                }
              />
              {/* <Button style={{marginBottom:-100}}  onPress={Submit} title="Submit" /> */}
            </View>
            }
        </View>
    )
}

export default AddStudents

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        justifyContent:'space-between',
        flexDirection:'row'
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: 'center',
      },
      checkbox: {
        // alignSelf: "center",
        // marginRight:20
      },
      label: {
        margin: 8,
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
      checkboxBase: {
        width: 40,
        height: 40,
        // padding:10,
        marginLeft:170,
        marginTop:-20,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'coral',
        backgroundColor: 'transparent',
      },
    
      checkboxChecked: {
        backgroundColor: 'coral',
      },
    
      appContainer: {
        flex: 1,
        alignItems: 'center',
      },
    
      appTitle: {
        marginVertical: 16,
        fontWeight: 'bold',
        fontSize: 24,
      },
      checkboxLabel: {
        marginLeft: 8,
        fontWeight: 5,
        fontSize: 18,
      },
      tinyLogo: {
        width: 250,
        height: 250,
      }
})