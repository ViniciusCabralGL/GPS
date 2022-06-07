import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";
import { Entypo, Feather } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react';
import '../config.js'
import firebaseApp from "../db/FireDatabase.js";
import MapView from "react-native-maps";

export default function Perfil({ navigation, route }) {
    const [show, setShow] = useState(false)
    const [data, setData] = useState(global.config.references)

    return (
        <View style={styles.container}>
            <MapView 
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0992,
                    longitudeDelta: 0.0421,
                }}
                style={{flex: 1}}
            />
            <View style={styles.myrowBar}>
                <View style={styles.myDisplay}>
                    <TouchableOpacity onPress={() => show ? setShow(false) : setShow(true)}>
                        <View style={styles.myButton}>
                            <Feather name={((!show) ? "more-vertical" : "x")} color="white" size={48}></Feather>
                        </View>
                    </TouchableOpacity>
                    {
                        show ?
                            data.map((item) => (
                                <TouchableOpacity key={item.locate} onPress={() => navigation.navigate(item.locate, route.params)}>
                                    <View style={styles.myItem}>
                                        <Feather name={item.icon} color="white" size={24}></Feather>
                                    </View>
                                </TouchableOpacity>
                            ))
                            :
                            <></>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden",
        backgroundColor: "red",
    },
    inLine: {
        marginTop: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myInlineText: {
        marginRight: 4,
        fontSize: 24,
    },
    UserName: {
        fontSize: 24,
        marginBottom: 24,
    },
    UserImage: {
        borderRadius: 30,
        width: 200,
        height: 200,
    },
    myrowBar: {
        width: "100%",
        height: "auto",
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
    },
    myDisplay: {
        borderRadius: 100,
        width: 65,
        height: 65,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10
    },
    myItem: {
        marginLeft: 10,
        borderRadius: 100,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        borderRadius: 100
    },
    myButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        borderRadius: 100
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})