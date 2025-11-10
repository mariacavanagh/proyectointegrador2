import React, { Component } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import {db} from '../firebase/config'
import firebase from "firebase";

class Home extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            traido: []
        }
    }
    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({ traido: posts });
            });
            
    }

    likearPost(id) {
        db.collection('posts')
          .doc(id)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)
          })
          .catch(e => console.log(e));
      }
    
      unlikearPost(id) {
        db.collection('posts')
          .doc(id)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
          })
          .catch(e => console.log(e));
      }

    render() {
        console.log(this.state.traido);
        return (
        <FlatList
            data={this.state.traido}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
                let likeado = false;

                if (item.data.likes.includes(firebase.auth().currentUser.email)) {
                    likeado = true;
                }

                return (
                    <View style={styles.post}>
                        <Text style={styles.tetxo}>{item.data.comentario}</Text>
                        <Text style={styles.likes}>Cantidad de likes: {item.data.likes.length}</Text>

                        <Pressable style={[
                        styles.boton,
                        likeado ? styles.botonUnlike : styles.botonLike,
                        ]}
                            onPress ={() =>{
                                if (likeado){
                                    {this.unlikearPost(item.id)}
                                }else
                                    {this.likearPost(item.id)}
                            }}
                        >
                            <Text style={styles.botonTexto}>{likeado ? "Sacar like" : "Likear"}</Text>
                        </Pressable>
                    </View>

                );
            }}
        />)

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F7",
    alignItems: "center",
    paddingVertical: 20,
  },
  post: {
    backgroundColor: "#E8EAF6", 
    padding: 15,
    marginVertical: 8,
    width: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  texto: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  likes: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  boton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  botonLike: {
    backgroundColor: "#AED581", 
  },
  botonUnlike: {
    backgroundColor: "#FFAB91", 
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;