import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";
import { Entypo, Feather } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react';
import '../config.js'
import firebaseApp from "../db/FireDatabase.js";
import myDefaultImage from "../../assets/defaultUser.png"

export default function Perfil({ navigation, route }) {
    const [userImage, setUserImage] = useState(route.params.usuario.image)
    const [show, setShow] = useState(false)
    const [data, setData] = useState(global.config.references)

    return (
        <View style={styles.container}>
            {
                userImage != "" ?
                    <TouchableOpacity>
                        <Image source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/gps-project-5e6e1.appspot.com/o/usersPerfilImages%2F' + userImage + '?alt=media',

                        }} style={styles.UserImage}></Image>
                    </TouchableOpacity>
                    :
                    <Image source={myDefaultImage} style={styles.UserImage}></Image>
            }
            <Text style={styles.UserName}>{route.params.usuario.nome}</Text>
            <TouchableOpacity onPress={() => (global.config.user = [], navigation.navigate('Login'))}>
                <View style={styles.inLine}><Text style={styles.myInlineText}>Sair</Text><Feather name='log-out' size={24} color={'black'}></Feather></View>
            </TouchableOpacity>

            <View style={styles.myrowBar}>
                <View style={styles.myDisplay}>
                    <TouchableOpacity onPress={() => show ? setShow(false) : setShow(true)}>
                        <View style={styles.myButton}>
                            <Feather name={((!show) ? "more-vertical" : "x")} color="white" size={48}></Feather>
                        </View>
                    </TouchableOpacity>
                    {
                        show?
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
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden",
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
        backgroundColor: "red",
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
        backgroundColor: "red",
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
    }
})