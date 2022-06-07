import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions, ImageBackground, Image, Alert } from "react-native";
import React, { useState } from 'react';
import '../config.js'
import { Entypo } from "@expo/vector-icons";

export default function Bar() {
    const [data, setData] = useState([
        {
            locate: "Login",
            icon: "teste"
        },
        {
            locate: "Login",
            icon: "teste"
        },
    ])


    const [show, setShow] = useState(false)
    return (
        <View style={styles.myDisplay}>
            <TouchableOpacity onPress={() => setShow(show ? false : true)}>
                <View style={styles.myButton}>
                    <Entypo name="plus" color="white" size={64}></Entypo>
                </View>
            </TouchableOpacity>
            {
                show
                    ?
                    <View>
                        {
                            data.map((item) => (<View style={styles.myItem}><TouchableOpacity onPress={navigation.navigate(item.locate)}></TouchableOpacity></View>))
                        }
                    </View>
                    :
                    <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    myDisplay: {
        backgroundColor: "red",
        borderRadius: 100,
        width: 65,
        height: 65,
    },
    myItem: {

    },
    myButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})