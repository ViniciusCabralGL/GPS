import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"

export default function Routes({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/senailogo.png')} style={{ height: "12%", width: '100%', marginBottom: '20%', marginTop: '10%' }}></Image>
            <Text style={styles.myTopText}>
                Login requisitado!
            </Text>
            <Text style={{ color: "white", marginRight: 20, marginLeft: 20, fontSize: 24, textAlign: 'justify' }}>
                Você criou uma conta a que possui certas preferrencias! Nosso Adm está verificados suas credenciais, aprovaremos seu login quando tudo for confirmado!
            </Text>
            <TouchableOpacity style={{ height: 50, width: 250, backgroundColor: 'tomato', display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: 120 }} onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: 'white', fontSize: 24 }}>
                    Entendi!
                </Text>
            </TouchableOpacity>
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
    myTopText: {
        fontSize: 48,
        color: 'white',
        marginBottom: 40,
        marginTop: 80,
    }
})