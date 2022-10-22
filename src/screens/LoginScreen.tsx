import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LoginScreen = () => {
    const onSignIn = () => {
        console.log("log in");

    }
    return (
        <View style={styles.page}>
            <TextInput placeholder="username" style={styles.input} />
            <TextInput placeholder="password" style={styles.input} />
            <TouchableOpacity style={styles.button} onPress={onSignIn} activeOpacity={0.7}>
                <Text style={styles.textButton}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
        background: 'gray',
        padding: 10,
        alignItems: 'stretch',
        justifyContent: 'center'

    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        fontSize: 18
    },
    button: {
        backgroundColor: '#1380CC',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})