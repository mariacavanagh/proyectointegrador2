import React, { Component } from "react";
import { Pressable } from "react-native";
import { View, Text } from "react-native-web";
import { auth, db } from '../firebase/config';

class Profile extends Component{
    constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      misPosts: [],
    }}

    componentDidMount(){
    const user = auth.currentUser;
    if(user){
      this.setState({ email: user.email });

      db.collection('users')
        .where('owner', '==', user.email)
        .onSnapshot((docs) => {
          docs.forEach(doc => {
            this.setState({ username: doc.data().username })
          })
        })
    }
    

    }
    logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('Registro'))
    .catch(err=> console.log('err', err))
    }

    render(){
        return (
        <View>
        <Text>Tu Perfil</Text>
        <View>
          <Text>Usuario: {this.state.username}</Text>
          <Text>Email: {this.state.email}</Text>
        </View>
        <Text>Tus posteos: </Text>
        <Pressable onPress={()=> this.logout('Login')}> 
        <Text>Cerrar Sesion</Text> </Pressable>
        </View>
    )}
}

export default Profile;