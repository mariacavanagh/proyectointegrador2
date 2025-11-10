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
          posteosTraidos: []
        };
      }

      componentDidMount(){

        db.collection('posts')
        .onSnapshot(docs => {
            console.log(docs);
            
            let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data().comentarios
                    });
                });
            this.setState({ posteosTraidos: posteos
            });
            });

            this.state.posteosTraidos.map(post => {
                console.log(post.id);
                console.log(this.props.route.params.postId);
                
                
              if (post.id === this.props.route.params.postId) {
                this.setState({ posteosTraidos: post });
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
    console.log(this.state.posteosTraidos);
    
    
    return(
        <View>
            <Text>Comentarios</Text>

            <Text>{this.state.posteosTraidos.comentarios}</Text>

            <FlatList
            data={this.state.posteosTraidos.comentarios}
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