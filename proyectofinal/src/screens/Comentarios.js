import React, { Component } from "react";
import firebase from "firebase";
import {db, auth} from '../firebase/config';
import { TextInput, View, Text, Pressable, FlatList, StyleSheet} from "react-native-web";


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
        <View style={styles.container}>
            <Text  style={styles.titulo}>Comentarios</Text>

            <Text>{this.state.posteosTraidos.comentarios}</Text>

            <FlatList
            data={this.state.posteosTraidos.comentarios}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Text style={styles.usuario}>{item.data.owner}: {item.data.comentarios}</Text>}
            />


           <Text style={styles.subtitulo}>Agregue un comentario</Text>
           <TextInput placeholder="Comenta aqui..." value={this.state.comentarios} onChangeText={text => this.setState({comentario: text})}></TextInput>
           <Pressable style={styles.boton}  onPress={() => this.nuevoComentario()}>
            <Text style={styles.botonTexto}>Comentar</Text>
           </Pressable>
        </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#f8f9fa",
      flex: 1,
    },
    titulo: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
    },
    subtitulo: {
      fontSize: 18,
      marginTop: 20,
      marginBottom: 10,
      fontWeight: "600",
    },
    comentarioBox: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    usuario: {
      fontWeight: "bold",
      color: "#007bff",
    },
    texto: {
      marginTop: 4,
      fontSize: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 10,
      backgroundColor: "#fff",
    },
    boton: {
      backgroundColor: "#007bff",
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
    },
    botonTexto: {
      color: "white",
      textAlign: "center",
      fontWeight: "600",
    },
  });
  

export default Comentarios;