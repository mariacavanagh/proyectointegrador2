import React, { Component } from "react";
import firebase from "firebase";
import {db, auth} from '../firebase/config';
import { TextInput, View, Text, Pressable, FlatList, StyleSheet} from "react-native-web";


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
        .doc(this.props.route.params.postId)
        .onSnapshot(doc => {
            console.log(doc);
            if (doc) {
                const data = doc.data();
                this.setState({ comentariosTraidos: data.comentarios });
            }
        });
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
        this.setState({ comentario: '' });
        console.log("Comentario agregado");
        })
        .catch(e => console.log(e));}

render() {
    console.log(this.props);
    console.log(this.state.comentariosTraidos);
    
    
    return(
        <View style={styles.container}>
            <Text  style={styles.titulo}>Comentarios</Text>

            <FlatList
            data={this.state.comentariosTraidos}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.comentarioCard}>
              <Text style={styles.usuario}>{item.usuario}</Text>
              <Text style={styles.texto}>{item.texto}</Text>
            </View>
            )}
            />


           <Text style={styles.subtitulo}>Agregue un comentario</Text>
           <TextInput style={styles.input} placeholder="Comenta aqui..." value={this.state.comentarios} onChangeText={text => this.setState({comentario: text})}></TextInput>
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
    comentarioCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB", 
    },
    input: {
      height: 48,
      borderWidth: 1,
      borderColor: "#D0D5DD",
      borderRadius: 10,
      paddingHorizontal: 12,
      marginBottom: 14,
      backgroundColor: "#FFFFFF",
      fontSize: 16,
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
      textAlign: 'center',
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
      color: "black",
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