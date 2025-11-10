import React, { Component } from "react";
import { Pressable, Text, View } from "react-native";
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
                    <View>
                        <Text>{item.data.comentario}</Text>
                        <Text>Cantidad de likes: {item.data.likes.length}</Text>

                        <Pressable
                            onPress={() =>{
                                if (likeado){
                                    {this.unlikearPost(item.id)}
                                }else
                                    {this.likearPost(item.id)}
                            }}
                        >
                            <Text>{likeado ? "Sacar like" : "Likear"}</Text>
                        </Pressable>
                    </View>

                );
            }}
        />)

    }
}
export default Home;