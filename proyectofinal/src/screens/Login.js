import React, { Component } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native";
import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        user: "",
        password: "",
      };
    }
  
    onSubmit(email, password) {
      if (!email.includes('@')) {
        this.setState({ error: 'Email mal formateado' });
        return;
      }
      if (password.length < 6) {
        this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres' });
        return;
      }
      auth.signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log('Usuario logueado correctamente:', response.user.email);
          this.props.navigation.navigate('HomeMenu');
        })
        .catch(error => {
          console.log(error);
          this.setState({ error: 'Credenciales incorrectas' });
        });
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Formulario de Login</Text>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />
          <Text>Contrasena</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />
          <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
            <Text style={styles.buttonText}>Iniciar Sesion</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.buttonText}>No tengo cuenta</Text>
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
      color: '#fff',
    },
  });
  
  export default Login;