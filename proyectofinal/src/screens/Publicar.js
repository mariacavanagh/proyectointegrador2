import React from "react";
import { View, Text } from "react-native-web";
import DynamicForm from "../components/DynamicForm";

function Publicar(){
    return (
        <View>
        <DynamicForm/>
        <Text> Formulario de publicar </Text>
        </View>
    )
}

export default Publicar;