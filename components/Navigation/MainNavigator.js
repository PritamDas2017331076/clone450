import React, { useContext, useEffect, useState } from 'react';
import Drawer from './Drawer'
import { ip } from '../ip'
import Drawerout from './Drawerout'
import Drawer_U from './Drawer_U'
import Drawer_H from './Drawer_H'
import Drawer_T from './Drawer_T'
import Drawer_S from './Drawer_S'
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
    selectDepartment
} from '../Loginslice'
const MainNavigator = () => {

    console.log('am i here', ip)


    const post = useSelector(selectPost)

    console.log('MN post ',post)

   // return isLog ? < Drawer / > : < Drawerout / >
   if(post=='admin') return <Drawer/>
   else if(post=='university_admin') return <Drawer_U/>
   else if(post=='department_head') return <Drawer_H/>
   else if(post=='teacher') return <Drawer_T/>
   if(post=='student') return <Drawer_S/>
   else return <Drawerout/>
    
}

export default MainNavigator

