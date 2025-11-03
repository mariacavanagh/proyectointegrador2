import React, { Component } from 'react';
import { Pressable, Text, View} from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import { auth } from '../firebase/config';

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
                <TextInput style={styles.input}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={ text => this.setState({email:text})}
                    value={this.state.email}/>
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="user"
                    onChangeText={ text => this.setState({user:text})}
                    value={this.state.user}/>
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
                    <Text style={styles.buttonText}>Ir a Login</Text>
                </Pressable>
                
            </View>
        )
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

export default Register;