import React, { Component } from "react";
import firebase from "firebase";
import {db, auth} from '../firebase/config';
import { TextInput, View, Text, Pressable } from "react-native-web";
import { FlatList } from "react-native";


class Comentarios extends Component{
    constructor(props){
        super(props);
        this.state = {
          comentario: '',
          comentariosTraidos: []
        };
      }

      componentDidMount(){

        db.collection('posts')
        .onSnapshot(docs => {
            console.log(docs);
            
            let comentarios = [];
                docs.forEach(doc => {
                    comentarios.push({
                        id: doc.id,
                        data: doc.data().comentarios
                    });
                });
            this.setState({ comentariosTraidos: comentarios
            });
            });

            this.state.comentariosTraidos.map(post => {
              if (post.id === this.props.route.params.postId) {
                this.setState({ comentariosTraidos: post });
              }})

        }
          

    nuevoComentario(){
        db.collection('posts')
       .doc(this.props.route.params.postId)
        .update({
          comentarios: firebase.firestore.FieldValue.arrayUnion({
            usuario: firebase.auth().currentUser.email,
            texto: this.state.comentario,
          })
    })
        .then((res) => {
          console.log("Comentario agregado");
        })
        .catch(e => console.log(e));}

render() {
    console.log(this.props);
    console.log(this.state.comentariosTraidos);
    
    
    return(
        <View>
            <Text>Comentarios</Text>

            <Text>{this.state.comentariosTraidos.comentarios}</Text>

            <FlatList
            data={this.state.comentariosTraidos.comentarios}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Text>{item.data.owner}: {item.data.comentarios}</Text>}
            />


           <Text>Agregue un comentario</Text>
           <TextInput placeholder="Comenta aqui..." value={this.state.comentarios} onChangeText={text => this.setState({comentario: text})}></TextInput>
           <Pressable onPress={() => this.nuevoComentario()}>
            <Text>Comentar</Text>
           </Pressable>
        </View>
    );
}
}



export default Comentarios;