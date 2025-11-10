import React, { Component } from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native-web";
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
        <Text style={styles.titulo}>Tu Perfil</Text>
        <View style={styles.cajaUsuario}>
          <Text style={styles.textoCaja}> {this.state.username}</Text>
          <Text style={styles.textoCaja}> {this.state.email}</Text>
        </View>
        <Text style={styles.subtitulo}>Tus posteos: </Text>
        <Pressable style={styles.logoutButton} onPress={()=> this.logout('Login')}> 
        <Text style={styles.logoutButtonText}>Cerrar Sesion</Text> </Pressable>
        </View>
    )}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F7', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black', 
    marginBottom: 10,
  },
  cajaUsuario: {
    backgroundColor: '#C4E3CB', 
    padding: 15,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textoCaja: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  
  logoutButton: {
    backgroundColor: '#c63623ff', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default Profile;