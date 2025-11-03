import React, { Component } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native";
import {db} from '../firebase/config'

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
                    })
                this.setState({ traido: posts })})}
                   
                )
    }
    render() {
        console.log(this.state.traido);
        
        return (
            <FlatList  data={this.state.traido}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Text>{item.data.cometario}</Text>}
            />
        );
    }}

export default Home;