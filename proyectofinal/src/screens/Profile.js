import React from "react";
import { Pressable } from "react-native";
import { View, Text } from "react-native-web";

function Profile(){
    return (
        <View>
        <Text> Formulario de Profile </Text>
        <Pressable onPress={()=> this.props.navigation.navigate('Login')}> 
        <Text>Cerrar Sesion</Text> </Pressable>
        </View>
    )
}

export default Profile;