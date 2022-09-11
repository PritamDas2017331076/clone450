import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from 'react-navigation'
import Homestack from "./Homestack";
import Loginstudent from './Loginstudent'
import Loginteacher from './Loginteacher'

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Homestack
    },
    Loginstudent: {
        screen: Loginstudent

    },
    Loginteacher: {
        screen: Loginteacher
    }

})

export default createAppContainer(RootDrawerNavigator)