import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions, ImageBackground, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import MyInput from "../StyledComponents/MyInput";
import { Ionicons } from "@expo/vector-icons";
import firebaseApp from "../db/FireDatabase";
import '../config.js'

export default function Login({ navigation }) {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [visiblePass, setVisiblePass] = useState(true)
    const [erro, setErro] = useState(false)

    function changeVisibilit() {
        if (visiblePass) {
            setVisiblePass(false)
        } else {
            setVisiblePass(true)
        }
    }
    
    function makeLogin() {
        firebaseApp.auth().signInWithEmailAndPassword(user, pass)
            .then((userCredential) => {
                setUser("")
                setPass("")
                global.config.user.push(userCredential);
               
                firebaseApp.firestore().collection("Usuarios").onSnapshot((query) => {
                    query.forEach((doc) => {
                        if(doc.data().id == userCredential.user.uid){
                            global.config.dados.push(doc.data())
                            navigation.navigate('Perfil', {usuario: doc.data()})
                        }
                    })
                })
            })
            .catch((error) => {
                setErro(true)
                setTimeout(() => {
                    setErro(false)
                }, 5000)
            }
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container2}>
                <Image source={require('../../assets/senailogo.png')} style={{ height: "12%", width: '100%', marginBottom: '20%', marginTop: '20%' }}></Image>
                <View><Text style={{ fontSize: 48, color: 'white' }}>Login</Text></View>
                <View style={styles.scrow}>
                    
                    <View style={styles.spaced}>
                        <MyInput onChangeText={newText => setUser(newText)} value={user} placeholder="Usuario" placeholderTextColor="black" ></MyInput>
                    </View>

                    <View style={styles.spaced3}>
                        <MyInput style={{ width: (74 * Dimensions.get('window').width) / 100 }} value={pass} secureTextEntry={visiblePass} onChangeText={newText => (setPass(newText))} placeholder="Senha" placeholderTextColor="black" ></MyInput>
                        <TouchableOpacity onPress={() => changeVisibilit()}>
                            <Ionicons name={visiblePass ? 'eye' : 'eye-off'} color="white" size={(6 * Dimensions.get('window').width) / 100}></Ionicons>
                        </TouchableOpacity>
                    </View>

                    {
                        erro?<View style={{width: '100%', height: 'auto',display: 'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}><Text style={{color: 'white'}}>Email e/ou senha incorretos</Text></View>:<View></View>
                    }
                    <View style={styles.spaced2}>
                        <TouchableOpacity style={styles.send} onPress={() => makeLogin()}>
                            <Text style={styles.sendText}>
                                Entrar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", width: '100%' }}>
                        <Text style={{ fontSize: 17, color: 'white' }}>
                            Não tem conta?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
                            <Text style={{ fontSize: 17, color: 'white' }}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flex: 1,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        width: '100%',
    },
    inputText: {
        backgroundColor: "white",
        width: Dimensions.get('window').width / (2),
        height: Dimensions.get('window').height / 20,
        borderTopColor: "white",
        borderLeftColor: "white",
        borderRightColor: "white",
        borderWidth: Dimensions.get('window').width / 300,
    },
    titleText: {
        fontSize: Dimensions.get('window').width / 15,
    },
    send: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 14,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: 'tomato',
    },
    sendText: {
        color: 'white',
        fontSize: Dimensions.get('window').width / 15,
    },
    spaced: {
        marginTop: Dimensions.get('window').height / 40,
        marginBottom: Dimensions.get('window').height / 40,
        display: 'flex',
        flexDirection: 'row',
    },
    spaced2: {
        marginTop: Dimensions.get('window').height / 40,
        marginBottom: Dimensions.get('window').height / 40,
        paddingTop: '10%',
    },
    spaced3: {
        marginTop: Dimensions.get('window').height / 40,
        marginBottom: Dimensions.get('window').height / 40,
        display: 'flex',
        flexDirection: 'row',
    },
    form: {
        backgroundColor: "white",
        borderColor: 'black',
        borderWidth: 1,
        height: 'auto',
        width: Dimensions.get('window').width / (1.5),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    scrow: {
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})