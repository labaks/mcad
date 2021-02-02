import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import { Logo } from './components/logo';

export const SignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.signUpScreenContainer}>
            <ImageBackground
                source={require('./../assets/signUpBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <Logo />
                    <View>
                        <Text>Hello!</Text>
                        <Text>Create an account to continue</Text>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputLabel}>URL</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="URL..."
                            placeholderTextColor="#003f5c" />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputLabel}>Login</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Login..."
                            placeholderTextColor="#003f5c" />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password..."
                            placeholderTextColor="#003f5c" />
                    </View>
                    <TouchableOpacity style={styles.mainBtn}>
                        <Text style={styles.mainBtnText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    signUpScreenContainer: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        width: '100%'
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputView: {
        width: '100%',
        marginBottom: 10
    },
    inputLabel: {
        color: '#999'
    },
    inputText: {
        fontSize: 16,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10
    },
    mainBtn: {
        width: "100%",
        backgroundColor: '#282C34',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10
    },
    mainBtnText: {
        color: 'white',
        fontSize: 16
    },
})