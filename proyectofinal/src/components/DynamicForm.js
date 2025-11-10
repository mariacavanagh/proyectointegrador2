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
    this.props.navigation.navigate('HomeMenu', { 
      screen: 'Home' 
    });
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
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E9EF",
    boxShadow: "0 6px 18px rgba(16, 24, 40, 0.06)",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  input: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: "top", 
  },
  button: {
    height: 44,
    backgroundColor: "#0A66C2",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});

export default DynamicForm;