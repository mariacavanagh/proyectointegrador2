import React, { Component } from "react";
import { Text } from "react-native";
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
            likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth.currentUser.email)
          })
          .catch(e => console.log(e));
      }
    
      unlikearPost(id) {
        db.collection('posts')
          .doc(id)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(firebase.auth.currentUser.email)
          })
          .catch(e => console.log(e));
      }

    render() {
        console.log(this.state.traido);
        
        return (
            <FlatList  data={this.state.traido}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Text>{item.data.cometario}</Text>}
                //falta renderizar los likes pero me tengo que ir//
                
                
            />
        );
    }}

export default Home;