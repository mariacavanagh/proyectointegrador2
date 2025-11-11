import React, { Component } from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, FlatList } from "react-native-web";
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
            this.setState({ username: doc.data().user })
          })
        });

        db.collection('posts')
        .where('owner', '==', user.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
          let postsUsuario = [];
          docs.forEach(doc => {
            postsUsuario.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({ misPosts: postsUsuario });
        });
    }
    

    }
    logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('Register'))
    .catch(err=> console.log('err', err))
    }

    render(){
        return (
        <View style={styles.container}>
        <Text style={styles.titulo}>Tu Perfil</Text>
        <View style={styles.cajaUsuario}>
          <Text style={styles.textoCaja}> {this.state.username}</Text>
          <Text style={styles.textoCaja}> {this.state.email}</Text>
        </View>
        <Text style={styles.subtitulo}>Tus posteos: </Text>
        {this.state.misPosts.length === 0 ? (
          <Text style={styles.textoCaja}>Todavía no tenés posteos.</Text>
        ) : (
          <FlatList
            data={this.state.misPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.posteo}>
                <Text style={styles.textoPost}>{item.data.comentario || item.data.cometario}</Text>
              </View>
            )}
          />)}
        <Pressable style={styles.logoutButton} onPress={()=> this.logout()}> 
        <Text style={styles.logoutButtonText}>Cerrar Sesion</Text>
        </Pressable>
        </View>
    );
    }
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
    backgroundColor: '#dee4e0ff', 
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
    fontWeight: 'bold',
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