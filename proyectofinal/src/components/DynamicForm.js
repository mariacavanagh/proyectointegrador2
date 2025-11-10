import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import {db, auth} from '../firebase/config'

class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: ""
    };
  }

  onSubmit() {
   db.collection('posts').add({
    owner:auth.currentUser.email,
    comentario: this.state.comentario,
    likes: [],
    comentarios: [],
    createdAt: Date.now(),
   })
   .then(() => {
    console.log("Post subido correctamente");
    this.setState({ comentario: "" }); 
    this.props.navigation.navigate('Home'); //FALTAAAAAAAAA
  })
   .catch( error => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Posteos</Text>

        <TextInput
          style={styles.input}
          placeholder="Postea lo que desees..."
          value={this.state.comentario}
          onChangeText={(text) => this.setState({ comentario: text })}
        />

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20,
  
      },
      title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#000",
        textAlign: "center",
      },
      button: {
          backgroundColor: '#28a745',
          paddingHorizontal: 10,
          paddingVertical: 6,
          alignItems: 'center',
          borderRadius: 4,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#28a745',
          marginTop: 5,
        
      },
      input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderStyle: 'solid',
      marginVertical: 10,
        },
  
      buttonText: {
          color: '#fff'
      }
        },
      
  
  );

export default DynamicForm;