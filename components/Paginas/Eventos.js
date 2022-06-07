import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions, FlatList, ScrollView } from "react-native";
import { Entypo, Feather } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react';
import '../config.js'
import firebaseApp from "../db/FireDatabase.js";

export default function Eventos({ navigation, route }) {
    const [show, setShow] = useState(false)
    const [data, setData] = useState(global.config.references)
    const [Eventos, setEventos] = useState([])
    const [userEvents, setUserEvents] = useState([])
    const [showObject, setShowObject] = useState(false)
    const [myShowObject, setMyShowObject] = useState([])

    useEffect(() => {
        firebaseApp.firestore().collection("Eventos").onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
            })
            setEventos(list)
        })
    }, [])

    useEffect(() => {
        firebaseApp.firestore().collection("Agenda").onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                if(doc.data().user == global.config.dados[0].id){
                    list.push({ ...doc.data(), id: doc.id })
                }
            })
            setUserEvents(list)
        })
    }, [])

    function makePost(){
        var flag = 0
        for(let i=0; i<userEvents.length; i++){
            if(userEvents[i].itemId == Eventos[0].id){
                flag = 1;
                return;
            }
        }
        if(flag == 0){
            firebaseApp.firestore().collection("Agenda").add({
                user: global.config.dados[0].id,
                itemId: Eventos[0].id,
                descricao: Eventos[0].descricao,
                diaEncerramento: Eventos[0].diaEncerramento,
                diaInicio: Eventos[0].diaInicio,
                horaEncerramento: Eventos[0].horaEncerramento,
                horaInicio: Eventos[0].horaInicio,
                local: Eventos[0].local,
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 24, color: "white", fontWeight: "bold"}}>EVENTOS</Text>
            <ScrollView style={styles.myScrollView}>
                <FlatList
                    style={styles.events}
                    data={Eventos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => (setMyShowObject(item), setShowObject(true))}>
                                <View style={styles.mySimpleRow}>
                                    <Feather name="calendar" color="white" size={24}></Feather>
                                    <Text style={{ display: "flex", flexDirection: "row", fontSize: 24 }}>{item.descricao}</Text>
                                    <Text></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </ScrollView>
            {
                showObject ?
                <View style={{borderRadius: 10, width: ((90 * Dimensions.get('window').width) / 100), height: ((50 * Dimensions.get('window').height) / 100), position: 'absolute', left: "5%", right: "5%", bottom: "25%", backgroundColor: "white", borderWidth: 1 }}>
                    <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity onPress={() => setShowObject(false)}>
                            <Feather name="x" color="black" size={48}></Feather>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: ((80 * Dimensions.get('window').width)/100), alignSelf: 'center', backgroundColor: "white", marginTop: 20}}>
                        <Text style={{ fontSize: 24, color: "black", alignSelf: "center", marginBottom: 30}}>{myShowObject.descricao}</Text>
                        <Text style={{fontSize: 24, color: "black", marginTop: 20}}>Inicio: {myShowObject.diaInicio}, {myShowObject.horaInicio}</Text>
                        <Text style={{fontSize: 24, color: "black", marginTop: 20}}>Termino: {myShowObject.diaEncerramento}, {myShowObject.horaEncerramento}</Text>
                        <Text style={{fontSize: 24, color: "black", marginTop: 20}}>Local: {myShowObject.local}</Text>
                         
                        <TouchableOpacity onPress={() => (makePost())}>
                            <View style={{height: 50, width: ((60 * Dimensions.get('window').width)/100), alignSelf: "center", backgroundColor: "tomato", alignItems: 'center', justifyContent: "center", borderRadius: 5, marginTop: 35}}> 
                                <Text style={{fontSize: 24, color: "white"}}>Adicionar a agenda</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                :
                // <Text>Sua agenda está vazia!</Text>
                <></>
            }

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
    }
})