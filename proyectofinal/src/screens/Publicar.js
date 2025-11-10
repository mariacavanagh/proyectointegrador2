import React from "react";
import { View } from "react-native";
import DynamicForm from "../components/DynamicForm";

function Publicar(props){
    return (
        <View>
         <DynamicForm navigation = {props.navigation}/>
        </View>
    )
}



export default Publicar;