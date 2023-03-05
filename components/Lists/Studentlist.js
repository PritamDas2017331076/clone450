import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {View,StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectId, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';
import {Card,Button,Text} from '@ui-kitten/components';


export default function StudentlistL({route, navigation}){
  const [list, setList] = useState([])
  const [cur, setCur] = useState([])
    const { course_id, section } = route.params
    const [col, setCol]=useState([])
    const [stu, setStu]=useState([])
    const [tid, setTid] = useState()
    const [date, setDate]=useState(new Date())
    const [courseName, setCourseName]=useState('')
    let record=[]
    let dist=[]
    let arr=[]
    const id=useSelector(selectId)
    const post = useSelector(selectPost)
    let f=0

    const spread = async(course_id, section)=>{
      try{
        const res1 = await axios.get(`${ip}/course/${course_id}`)
        console.log(res1.data)
        record=res1.data.record
        //setRecord(res1.data.record)
        console.log('record',record,'recordddd')
      }catch(e){
        console.log('error while retriving course record',e)

      }
      try{
        const res2 = await axios.get(`${ip}/byreg/srr?course_id=${course_id}&section=${section}`)
        dist=res2.data
        console.log('dist',dist,'disttttt')
        arr=dist
        arr.sort(function(a,b){
          if(a.registration_number<b.registration_number) return -1
          else return 0
        })
        
        let obj='0000'
        if(arr.length>0) obj=arr[arr.length-1].registration_number.substring(0,4)
        console.log('till here')
        let brr=[]
        let crr=[]
        arr.forEach((a)=>{
          if(a.registration_number.substring(0,4)==obj)brr.push(a)
          else crr.push(a)
        })
        brr=brr.concat(crr)
      //  console.log(brr,'thennn',crr)
        arr=brr
     //   console.log('arr',arr,'arr')

      }catch(e){
        console.log('error in byreg section of spred',e)
      }
      let need=[]
      let tpp=record.filter((eee)=>eee.section=section)
   //   console.log('tpp',tpp)
      let tr=[]
      tr.push('')
      tpp.forEach(ele=>{
        const dat=new Date(ele.date)
        let da=dat.getDate(),mo=dat.getMonth()+1,ye=dat.getFullYear()
        let stt=''
        if(da<10) stt+='0'
        stt+=da
        stt+='/'
        if(mo<10) stt+='0'
        stt+=mo
        stt+='/'
        stt+=ye
        tr.push(stt)
      })
      tr.push('total classes')
      tr.push('present classes')
      tr.push('percentage')
      need.push(tr)
      arr.forEach((ele)=>{
        let pr=[]
        pr.push(ele.registration_number)
        let rec=ele.record
        let i=0,j=0
        for(; i < tpp.length && j < rec.length ; ){
          if(tpp[i].date==rec[j].date){i++ ; j++; pr.push(true) }
          else {i++ ; pr.push(false) }
        }
        let k=tpp.length*1-i*1
        while(k){pr.push(false) ; k--; }
        let x=tpp.length,y=rec.length
        pr.push(x)
        pr.push(y)
        if(x==0) pr.push(0)
        else pr.push((y*100.0)/(x*1.0))

        need.push(pr)

        // tpp.forEach(eee=>{
        //   let tcc=rec.filter(ef=>ef.date==eee.date)
        //   if(tcc.length>0) pr.push(true)
        //   else pr.push(false)
        // })
      })
      console.log('need',need)


    }
    const effect = async()=>{
      try{
        const res=await axios.get(`${ip}/course/${course_id}`)
        console.log(' data ', res.data.student,'tid',res.data.teacher_id)
        // setCol(res.data.collaborator)
        // setStu(res.data.student)
        setTid(res.data.teacher_id)
        setCourseName(res.data.name)
        let arr=res.data.student
        //console.log('arr',arr)
        arr=arr.filter(item=>(item.section==section))
        arr.sort(function(a,b){
          if(a.registration_number<b.registration_number) return -1
          else return 0
        })
        //   console.log('all',arr)
        let obj=arr[arr.length-1].registration_number.substring(0,4)
        let brr=[]
        let crr=[]
        arr.forEach((a)=>{
          if(a.registration_number.substring(0,4)==obj)brr.push(a)
          else crr.push(a)
        })
        brr=brr.concat(crr)
        //console.log(brr,'thennn',crr)
        arr=brr
        setCol(res.data.collaborator)
        setStu(res.data.student)
       // setTid(res.data.teacher_id)
       setList(arr.map((item,index)=>{
            return {registration_number:item.registration_number,status:false,avatar:item.avatar,id:index}
          }))
        }catch(error){
        console.log('error in studentlist',error)
      }
    }
    
    useEffect(() => {
      //   console.log('section',section)
      navigation.setOptions({ title: "Navigation"})
      effect()
      // axios.get(`${ip}/course/${course_id}`)
      //   .then(res => {
        //       console.log(' data ', res.data.student)
        //       let arr=res.data.student
    //       console.log('arr',arr)
    //       arr=arr.filter(item=>(item.section==section))
    //       arr.sort(function(a,b){
    //         if(a.registration_number<b.registration_number) return -1
    //         else return 0
    //       })
    //       console.log('all',arr)
    //       let obj=arr[arr.length-1].registration_number.substring(0,4)
    //       let brr=[]
    //       let crr=[]
    //       arr.forEach((a)=>{
    //         if(a.registration_number.substring(0,4)==obj)brr.push(a)
    //         else crr.push(a)
    //       })
    //       brr=brr.concat(crr)
    //       console.log(brr,'thennn',crr)
    //       arr=brr
    //       setCol(res.data.collaborator)
    //       setStu(res.data.student)
    //       setTid(res.data.teacher_id)
    //       setList(arr.map((item,index)=>{
    //           return {registration_number:item.registration_number,status:false,avatar:item.avatar,id:index}
    //       }))
    //  }) ;
  }, []);

   //console.log('check it out ',f,list)

    return(
      <View>
            <Text style = {{margin:20}}><Text style = {{fontWeight:'bold'}}>Course Name:</Text> {courseName}</Text>
            <View style={{flexDirection:'row',justifyContent:'flex-start',flexWrap:'wrap',marginHorizontal:'5%',marginVertical:'5%'}}>
                {post=='teacher' ?
                // <Button onPress={()=>navigation.navigate('Take',{
                //     course_id: course_id,
                //     list: list, // student list
                //     section: section
                // })} title=" take attendence" />:null
                  <Card style = {styles.child}
                  onPress={()=>navigation.navigate('Take',{
                    course_id: course_id,
                    list: list, // student list
                    section: section
                  })}
                    >
                      <Text style={{textAlign:'center'}}>Take Attendance</Text>
                  </Card>:null
                }
                {/* <Button onPress={()=>navigation.navigate('Date',{
                    course_id: course_id,
                    section: section
                })} title="show dates" /> */}


                  <Card style={styles.child}
                    onPress={()=>navigation.navigate('Date',{
                      course_id: course_id,
                      section: section
                  })}
                    >
                      <Text style={{textAlign:'center'}}>Attendance list</Text>
                  </Card>
                {/* <Button onPress={()=>navigation.navigate('Reg',{
                    course_id: course_id,
                    section: section
                })} title="show registration numbers" /> */}


                <Card style={styles.child}
                   onPress={()=>navigation.navigate('Reg',{
                    course_id: course_id,
                    section: section
                })} 
                    >
                      <Text style={{textAlign:'center'}}>Student list</Text>
                  </Card>
                {
                    (id===tid)?
                    // <View>
                    //     <Button onPress={()=>navigation.navigate('Collaborator List',{
                    //        course_id: course_id,
                    //        section: section
                    //     })} title="collaborator list" />
                    //     <Button onPress={()=>navigation.navigate('Students List',{
                    //        course_id: course_id,
                    //        section: section
                    //      })} title="student list" />
                    // </View>:null
                    <Card style={styles.child}
                    onPress={()=>navigation.navigate('Collaborator List',{
                      course_id: course_id,
                      section: section
                   })} 
                     >
                       <Text style={{textAlign:'center'}}>Collaborators</Text>
                   </Card>:null
                }
                {
                    (id==tid)?
                    <Card style={styles.child}
                    onPress={()=>navigation.navigate('Add Students',{
                      course_id: course_id,
                      section: section
                   })} 
                     >
                       <Text style={{textAlign:'center'}}>Add student</Text>
                   </Card>:null
                }
                {
                    (id==tid)?
                    <Card style={styles.child}
                    onPress={()=>navigation.navigate('Students List',{
                      course_id: course_id,
                      section: section
                   })} 
                     >
                       <Text style={{textAlign:'center'}}>Delete student</Text>
                   </Card>:null
                }
                {
                    (id==tid)?
                    <Card style={styles.child}
                    onPress={()=>spread(course_id, section)}
                     >
                       <Text style={{textAlign:'center'}}>Create Summary</Text>
                   </Card>:null
                }
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
    child:{
      width:155,
      height:80,
      marginHorizontal:'2%',
      marginVertical:'3%',
      borderRadius:12,
    }
  });