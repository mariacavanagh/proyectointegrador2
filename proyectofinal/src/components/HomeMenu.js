import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Publicar from '../screens/Publicar';

const Tab = createBottomTabNavigator();


function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen name="Home" component={Home} options={ 
        {tabBarIcon: ()=> <AntDesign name="home" size={24} color="black" />}} />
      <Tab.Screen name="Profile" component={Profile} options={ 
        {tabBarIcon: ()=><Ionicons name="person" size={24} color="black" />} } />
     <Tab.Screen name="Publicar" component={Publicar} options={ 
        {tabBarIcon: ()=><Ionicons name="add-circle" size={24} color="black" />} } />
    </Tab.Navigator>
  );
}

export default HomeMenu;