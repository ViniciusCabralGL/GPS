import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions, FlatList, ScrollView, Image } from "react-native";
import { Entypo, Feather } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react';
import '../config.js'
import firebaseApp from "../db/FireDatabase.js";
import myDefaultImage from "../../assets/defaultUser.png"

export default function Amigos({ navigation, route }) {
    const [show, setShow] = useState(false)
    const [data, setData] = useState(global.config.references)
    const [selfUser, setSelfUser] = useState(global.config.dados[0])
    const [amigos, setAmigos] = useState([])
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        firebaseApp.firestore().collection("Amigos").onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                if (doc.data().usuario1 == selfUser.id || doc.data().usuario2 == selfUser.id) {
                    list.push({ ...doc.data(), id: doc.id })
                }
            })
            setAmigos(list)
        })
    }, [])

    useEffect(() => {
        firebaseApp.firestore().collection("Usuarios").onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({ ...doc.data(), idDoc: doc.id })

                // for (let i=0; i<amigos.length; i++) {
                //     if (amigos[i].usuario1 == selfUser.id || amigos[i].usuario2 == selfUser.id) {
                //         list.push({ ...doc.data(), idDoc: doc.id })
                //         break
                //     }
                // }
            })
            setUsuarios(list)
        })
    }, [])

    function getFoto(userID) {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == userID) {
                return usuarios[i].image;
            }
        }
    }

    function getNome(userID) {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == userID) {
                return usuarios[i].nome;
            }
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>LISTA DE AMIGOS</Text>
            <ScrollView style={styles.myScrollView}>
                {
                    (amigos.length > 0) ?
                        <FlatList
                            style={styles.events}
                            data={amigos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{ width: '90%', height: 'auto', display: 'flex', flexDirection: 'row', alignSelf: "center", alignItems: "center"}}>
                                    {
                                        (getFoto((item.usuario1 ==  selfUser.id)?item.usuario2:item.usuario1) != "")?
                                        <Image style={{width: 48, height: 48, borderRadius: 100}} source={{uri: `https://firebasestorage.googleapis.com/v0/b/gps-project-5e6e1.appspot.com/o/usersPerfilImages%2F${(getFoto((item.usuario1==selfUser.id)?item.usuario2:item.usuario1))}?alt=media`}}></Image>
                                        :
                                        <Image source={myDefaultImage} style={{width: 48, height: 48, borderRadius: 100}}></Image>
                                    }
                                    <TouchableOpacity onPress={() => navigation.navigate("")}>
                                        <View style={styles.mySimpleRow}>
                                            <Text style={{ display: "flex", flexDirection: "row", fontSize: 24, color: "white", marginLeft: 20}}> { getNome((item.usuario1 == selfUser.id)?item.usuario2:item.usuario1)}</Text>
                                            <Text></Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        :
                        <></>
                }
            </ScrollView>

            <View style={styles.myrowBar}>
                <View style={styles.myDisplay}>
                    <TouchableOpacity onPress={() => show ? setShow(false) : setShow(true)}>
                        <View style={styles.myButton}>
                            <Feather name={((!show) ? "more-vertical" : "x")} color="white" size={48}></Feather>
                        </View>
                    </TouchableOpacity>
                    {
                        show
                            ?
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
    myrowBar: {
        width: "100%",
        height: "auto",
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
    },
    mySimpleRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "auto",
        width: ((90 * Dimensions.get('window').width) / 100),
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
    },
    events: {
        height: 'auto',
        width: '100%',
    },
    myScrollView: {
        marginTop: 20,
        Width: "100%",
        height: ((90 * Dimensions.get('window').height) / 100),
    },
})