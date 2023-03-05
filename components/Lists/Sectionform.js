import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView} from 'react-native'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux';
import {ip} from '../ip'
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
  selectAvatar
  } from '../Loginslice'

export default function Sectionform({route, navigation}){
    const [registration_number, setRG] = useState('')
    const [name, setName] = useState('')
    const [came, setCame] = useState('')
    const [dd, setdd]= useState('')
    const [id, setId] = useState('')
    const [idd,setIdd]=useState('')
    const [list, setList] = useState([])
    const [dist, setDist] = useState('')
    const [teacher, setTeacher] = useState('')
    const university = useSelector(selectUniversity)
    const avatar = useSelector(selectAvatar)
    const post = useSelector(selectPost)
    const token = useSelector(selectToken)
    const {course_id} = route.params
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [loading3, setLoading3] = useState(true)


    const effect=async()=>{
      console.log(avatar)
      let f1=1,f2=1,f3=1
      try{
        const res=await axios.get(`${ip}/course/${course_id}`)
        console.log(' data ', res.data)
        setList(res.data.section.map( (s) => {
            return {value:s._id, label:s.section}
        }))
        setTeacher(res.data.teacher_id)
        setCame(res.data.name)
        setLoading1(false)
      }catch(error){
        console.log('error in sectionformjs try1',error)
      }
      // axios.get(`${ip}/course/${course_id}`)
      //   .then(res => {
      //       console.log(' data ', res.data)
      //       setList(res.data.section.map( (s) => {
      //           return {value:s._id, label:s.section}
      //       }))
      //       setTeacher(res.data.teacher_id)
      //       setCame(res.data.name)
      //    })
      //    .catch((error) => console.error(error))
      //    .finally(() => {
      //          setLoading1(false)
      //          f1=0 ;
      //     });

      try{
        const res=await axios.get(`${ip}/${post}/me`,{
          headers:{ 'Authorization': token }
        })
        setName(res.data.name)
        setId(res.data._id)
        setRG(res.data.registration_number)
        console.log('student info',name,id,registration_number)
        setLoading2(false)
      }catch(error){
        console.log('error in try2',error)
      }

      //  axios.get(`${ip}/${post}/me`,{
      //     headers:{ 'Authorization': token }
      //   })
      //   .then(res=>{
      //       //console.log('logged in person ',res.data)
      //       setName(res.data.name)
      //       setId(res.data._id)
      //       setRG(res.data.registration_number)
      //       console.log('student info',name,id,registration_number)
      //   })
      //   .catch((error) => console.error(error))
      //   .finally(() => {
      //          setLoading2(false)
      //          f2=0 ;
      //     });

    }

    useEffect(() => {
      navigation.setOptions({ title: "Select Section"})
      effect()
      // console.log(avatar)
      // let f1=1,f2=1,f3=1
      // try{
      //   const res=await axios.get(`${ip}/course/${course_id}`)
      //   console.log(' data ', res.data)
      //   setList(res.data.section.map( (s) => {
      //       return {value:s._id, label:s.section}
      //   }))
      //   setTeacher(res.data.teacher_id)
      //   setCame(res.data.name)
      //   setLoading1(false)
      // }catch(error){
      //   console.log('error in sectionformjs try1',error)
      // }
      // // axios.get(`${ip}/course/${course_id}`)
      // //   .then(res => {
      // //       console.log(' data ', res.data)
      // //       setList(res.data.section.map( (s) => {
      // //           return {value:s._id, label:s.section}
      // //       }))
      // //       setTeacher(res.data.teacher_id)
      // //       setCame(res.data.name)
      // //    })
      // //    .catch((error) => console.error(error))
      // //    .finally(() => {
      // //          setLoading1(false)
      // //          f1=0 ;
      // //     });

      // try{
      //   const res=await axios.get(`${ip}/${post}/me`,{
      //     headers:{ 'Authorization': token }
      //   })
      //   setName(res.data.name)
      //   setId(res.data._id)
      //   setRG(res.data.registration_number)
      //   console.log('student info',name,id,registration_number)
      //   setLoading2(false)
      // }catch(error){
      //   console.log('error in try2',error)
      // }

      // //  axios.get(`${ip}/${post}/me`,{
      // //     headers:{ 'Authorization': token }
      // //   })
      // //   .then(res=>{
      // //       //console.log('logged in person ',res.data)
      // //       setName(res.data.name)
      // //       setId(res.data._id)
      // //       setRG(res.data.registration_number)
      // //       console.log('student info',name,id,registration_number)
      // //   })
      // //   .catch((error) => console.error(error))
      // //   .finally(() => {
      // //          setLoading2(false)
      // //          f2=0 ;
      // //     });

    }, []);

    
    const onSubmit = async(e) => {
        //e.preventDefault()

        if(!dist){
            alert('Please enter section')
            return
        }

       /* axios.get(`${ip}/${post}/me`,{
          headers:{ 'Authorization': token }
        })
        .then(res=>{
            console.log('logged in person ',res.data)
            setName(res.data.name)
            setId(res.data._id)
            setRG(res.data.registration_number)
        })
        .catch((err)=>{console.log(err,'error in authentication') })

        axios.get(`${ip}/course/${course_id}`)
        .then(res=>{
            console.log('course teacher ',res.data)
            setTeacher(res.data.teacher_id)
            setCame(res.data.name)
        })
        .catch((error) => {
            console.log(error.message)
            alert('error in finding course')
          })*/

          const st=`${ip}/section/cids?course_id=${course_id}&section=${dist}`
          console.log(st)

         /* const sendGetRequest = () => {
            try {
                const resp =  axios.get(`${ip}/section/cids?course_id=${course_id}&section=${dist}`);
                console.log('teast it',resp.data);
                setIdd(resp.data._id)
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest()*/
        console.log('idd ',idd)

        const details = {
          course_id: course_id,
          section: dd,
          teacher: teacher,
          name: name, // student name
          registration_number: registration_number,
          id: id, // student id
          course_name: came,
          university: university,
          avatar: avatar,

        }
        console.log('details ',details)
        try{
          const res=await axios.post(`${ip}/access/add`,details)
          console.log(res.data)
        }catch(error){
          console.log(error.message)
          alert('error in sending request to teacher')
        }
        // axios.post(`${ip}/access/add`,details)
        // .then(res=>{
        //   console.log(res.data)

        // })
        // .catch((error) => {
        //   console.log(error.message)
        //   alert('error in sending request to teacher')
        // })

        /*axios.get(`${ip}/section/cids?course_id=${course_id}&section=${dist}`)
          .then( (res) => {
                //  console.log('res ',res)
                  console.log(JSON.stringify(res.data))
                  const idd=res.data._id
                  console.log('section id',idd)
                  const details = {
                    section_id: idd,
                    section: dist,
                    teacher: teacher,
                    name: name, // student name
                    registration_number: registration_number,
                    id: id, // student id
                    course_name: came,
                    university: university,

                  }
                  console.log('details ',details)
                  axios.post(`${ip}/access/add`,details)
                  .then(res=>{
                    console.log(res.data)

                  })
                  .catch((error) => {
                    console.log(error.message)
                    alert('error in sending request to teacher')
                  })

          })
          .catch((error) => {
            console.log(error.message)
            alert('error in getting section _id')
          })*/

        



        


        navigation.goBack()

        setDist('')
        

        
    }

    return(
        <View style={styles.container}>
            {loading1===true || loading2===true || loading3===true?<ScrollView>
            <Form onButtonPress={onSubmit}>
            <Picker
                items={list}
                label="Pick a section"
                style={styles.box}
                selectedValue={dist}
                onSelection={(item) => {
                  console.log(item)
                  setDist(item.value)
                  const bs=item
                  console.log(bs)
                  setIdd(bs.value)
                  setdd(bs.label)
                }}
                />
            </Form>
            </ScrollView>:''}
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      height: 50,
      padding: 20,
      border: '1px solid black',
      backgroundColor: '#fff',
  },
  text:{
      color: 'red',
      fontSize: 20,
      justifyContent: 'center',
      fontWeight: 'bold',
  },
  box:{
      //flex: 1,
      width: '100%',
      height: 40,
      margin: 5
  }

})