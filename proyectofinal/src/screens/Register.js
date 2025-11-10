import React, { Component } from 'react';
import { Pressable, Text, View} from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import { auth } from '../firebase/config';
import { db } from '../firebase/config';


class Register extends Component{
    constructor(props) {
        super(props)
        this.state={
            email:"",
            user: "",
            password:"",

        }
    }

    onSubmit(email, pass) {
        auth.createUserWithEmailAndPassword(email, pass)
        .then ( response => {
            this.setState({registered: true});
            db.collection('users').add({
              owner: auth.currentUser.email,
              user: this.state.user,
              createdAt: Date.now(),
            })
            this.props.navigation.navigate('Login');
            
        })
        .catch(error => {
            this.setState({error: 'Fallo en el registro'})
        })
        
      }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Formulario de register </Text>
                <Text>Email</Text>
                <TextInput style={styles.input}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={ text => this.setState({email:text})}
                    value={this.state.email}/>
                <Text>Nombre de Usuario</Text>    
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="usuario"
                    onChangeText={ text => this.setState({user:text})}
                    value={this.state.user}/>
                <Text>Contraseña</Text>    
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({password:text})}
                    value={this.state.password}/>
                <Pressable style={styles.button} onPress={()=> this.onSubmit(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}> Registrarse </Text>

                </Pressable>
                <Pressable style={styles.button} onPress={ () => this.props.navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>Ya tengo cuenta</Text>
                </Pressable>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F7FA",
      justifyContent: "center",
      padding: 24,
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
    button: {
      backgroundColor: "#0A66C2",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 8,
      boxShadow: "0 3px 8px rgba(10, 102, 194, 0.2)", 
    },
    buttonText: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 16,
      letterSpacing: 0.3,
    },
  });

export default Register;