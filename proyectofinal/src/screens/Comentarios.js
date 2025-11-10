import React, { Component } from "react";
import firebase from "firebase";
import {db, auth} from '../firebase/config';
import { TextInput, View, Text, Pressable } from "react-native-web";


class Comentarios extends Component{
    constructor(props){
        super(props);
        this.state = {
          comentario: '',
        };
      }
  

    nuevoComentario(){
        db.collection('Comentarios').add({
            owner: auth.currentUser.email,
            description: this.state.comentario,
            createdAt: Date.now(),
        })
        .then(() => {
            this.setState({ comentario: "" }) 
            this.props.navigation.navigate('HomeMenu')
        })
        .catch(error => console.log(error))
    }

render(){
    return(
        <View>
           <Text>Agregue un comentario</Text>
           <TextInput placeholder="Comenta aqui..." value={this.state.comentario} onChangeText={text => this.setState({comentario: text})}></TextInput>
           <Pressable onPress={() => this.nuevoComentario()}>
            <Text>Comentar</Text>
           </Pressable>
        </View>
    );
}
}

export default Comentarios;