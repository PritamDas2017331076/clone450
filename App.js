import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, {useContext} from 'react'
import MainNavigator from './components/Navigation/MainNavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {store} from './components/store';
import Drawerout from './components/Navigation/Drawerout'
import Drawer from './components/Navigation/Drawer'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { LoginButton } from './Temp.js';
import { LogBox } from 'react-native';
 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

export default () => (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
          <MainNavigator/>
      </ApplicationProvider>
    </Provider>
);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 25,
    backgroundColor: '#fff'
},
text:{
    color: 'red',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
}
});
