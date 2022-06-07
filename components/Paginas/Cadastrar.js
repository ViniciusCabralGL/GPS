import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions, ImageBackground, Image, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import MyInput from "../StyledComponents/MyInput";
import { Ionicons } from "@expo/vector-icons";
import firebaseApp from "../db/FireDatabase";
import '../config.js'

export default function Cadastrar({ navigation }) {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [visiblePass, setVisiblePass] = useState(true)
    const [visiblePass2, setVisiblePass2] = useState(true)
    const [erro, setErro] = useState("")

    const [value, setValue] = useState(1);

    function setMyErro(text) {
        setErro(text)
        setTimeout(() => {
            setErro("")
        }, 5000)
    }

    function createLogin() {
        if (user == "" || email == "" || pass == "" || pass2 == "" || user == undefined || email == undefined || pass == undefined || pass2 == undefined) {
            setMyErro("Preencha todos os campos!")
            return
        }

        if(pass != pass2){
            setMyErro("Senhas divergentes!")
            return
        }
        
        if(pass.length <6){
            setMyErro("A senha deve ter ao menos 6 digitos!")
            return
        }

        if (value === 1) {
            firebaseApp.auth().createUserWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    firebaseApp.firestore().collection("Usuarios").add({
                        id: userCredential.user.uid,
                        nome: user,
                        image: "",
                        nivel: 1,
                    })
                    navigation.navigate("Login")
                })
                .catch((error) => {
                    
                });
        } else if (value === 2) {
            firebaseApp.firestore().collection("Aguardando").add({
                nome: user,
                senha: pass,
                email: email,
                image: "",
                nivel: 2
            }).then(()=> navigation.navigate("Aguarde"))
        } else if (value === 3) {
            firebaseApp.firestore().collection("Aguardando").add({
                nome: user,
                senha: pass,
                email: email,
                image: "",
                nivel: 3
            }).then(() => navigation.navigate("Aguarde"))
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container2}>
                <Image source={require('../../assets/senailogo.png')} style={{ height: "12%", width: '100%', marginBottom: '5%', marginTop: '5%' }}></Image>
                <View><Text style={{ fontSize: 48, color: 'white' }}>Login</Text></View>
                <View style={styles.scrow}>
                    <View style={styles.spaced}>
                        <MyInput onChangeText={newText => setUser(newText)} value={user} placeholder="Usuario" placeholderTextColor="black" ></MyInput>
                    </View>

                    <View style={styles.spaced3}>
                        <MyInput style={{ width: (74 * Dimensions.get('window').width) / 100 }} value={pass} secureTextEntry={visiblePass} onChangeText={newText => (setPass(newText))} placeholder="Senha" placeholderTextColor="black" ></MyInput>
                        <TouchableOpacity onPress={() => setVisiblePass(visiblePass ? false : true)}>
                            <Ionicons name={visiblePass ? 'eye' : 'eye-off'} color="white" size={(6 * Dimensions.get('window').width) / 100}></Ionicons>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.spaced3}>
                        <MyInput style={{ width: (74 * Dimensions.get('window').width) / 100 }} value={pass2} secureTextEntry={visiblePass2} onChangeText={newText => (setPass2(newText))} placeholder="Confirmar senha" placeholderTextColor="black" ></MyInput>
                        <TouchableOpacity onPress={() => setVisiblePass2(visiblePass2 ? false : true)}>
                            <Ionicons name={visiblePass2 ? 'eye' : 'eye-off'} color="white" size={(6 * Dimensions.get('window').width) / 100}></Ionicons> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.spaced}>
                        <MyInput onChangeText={newText => setEmail(newText)} value={email} placeholder="Email" placeholderTextColor="black" ></MyInput>
                    </View>

                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                        {
                            value == 1 ?
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => setValue(1)}>
                                    <View style={{ backgroundColor: 'black', height: Dimensions.get('window').width / (20), width: Dimensions.get('window').width / (20), backgroundColor: 'black', borderRadius: 100 }}></View>
                                    <Text style={{ color: 'white' }}> Usuario comum</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => setValue(1)}>
                                    <View style={{ backgroundColor: 'black', height: Dimensions.get('window').width / (20), width: Dimensions.get('window').width / (20), backgroundColor: 'none', borderRadius: 100, borderWidth: 1 }}></View>
                                    <Text style={{ color: 'white' }}> Usuario comum</Text>
                                </TouchableOpacity>
                        }
                        {
                            value == 2 ?
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => setValue(2)}>
                                    <View style={{ backgroundColor: 'black', height: Dimensions.get('window').width / (20), width: Dimensions.get('window').width / (20), backgroundColor: 'black', borderRadius: 100 }}></View>
                                    <Text style={{ color: 'white' }}> Empresa</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => setValue(2)}>
                                    <View style={{ backgroundColor: 'black', height: Dimensions.get('window').width / (20), width: Dimensions.get('window').width / (20), backgroundColor: 'none', borderRadius: 100, borderWidth: 1 }}></View>
                                    <Text style={{ color: 'white' }}> Empresa</Text>
                                </TouchableOpacity>
                        }
                        {
                            value == 3 ?
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => setValue(3)}>
                                    <View style={{ backgroundColor: 'black', height: Dimensions.get('window').width / (20), width: Dimensions.get('window').width / (20), backgroundColor: 'black', borderRadius: 100 }}></View>
                                    <Text style={{ color: 'white' }}> Administrador</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => setValue(3)}>
                                    <View style={{ backgroundColor: 'black', height: Dimensions.get('window').width / (20), width: Dimensions.get('window').width / (20), backgroundColor: 'none', borderRadius: 100, borderWidth: 1 }}></View>
                                    <Text style={{ color: 'white' }}> Administrador</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center', height: 50 }}><Text style={{ color: 'white', fontSize: 24 }}>{erro}</Text></View>
                    <View style={styles.spaced2}>
                        <TouchableOpacity style={styles.send} onPress={() => createLogin()}>
                            <Text style={styles.sendText}>
                                Cadastrar
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", width: '100%' }}>
                        <Text style={{ fontSize: 17, color: 'white' }}>
                            Já possui conta?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontSize: 17, color: 'white' }}>Entrar</Text>
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