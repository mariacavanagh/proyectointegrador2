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
  componentDidMount() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate("HomeMenu");
        }});
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
          <Text style={styles.subtitulos}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />
          <Text style={styles.subtitulos}>Contraseña</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />
          <Pressable style={styles.buttonPrimero} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
            <Text style={styles.buttonText}>Iniciar Sesion</Text>
          </Pressable>
          <Pressable style={styles.buttonSegundo} onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.buttonTextSegundo}>No tengo cuenta</Text>
          </Pressable>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F7FA",
      justifyContent: "center",
      padding: 24,
    },
    subtitulos: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
    },
    title: {
      fontSize: 26,
      fontWeight: "800",
      marginBottom: 20,
      color: "#0F172A",
      textAlign: "center",
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
    buttonPrimero: {
      backgroundColor: "#0A66C2",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 8,
      boxShadow: "0 3px 8px rgba(10,102,194,0.2)",
    },
    buttonSegundo: {
      backgroundColor: "#E9F2FF",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 8,
      borderWidth: 1,
      borderColor: "#BBD6FF",
    },
    buttonText: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 16,
      letterSpacing: 0.3,
    },
    buttonTextSegundo: {
      color: "#0A66C2",
      fontWeight: "700",
      fontSize: 16,
      letterSpacing: 0.3,
    },
  });
  
  export default Login;