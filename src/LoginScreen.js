import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Logo } from './components/Logo';


export const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./../assets/loginBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <Logo />
                    <View style={styles.mainText}>
                        <Text style={styles.welcomeBackText}>Welcome back,</Text>
                        <Text>Sign in to continue</Text>
                    </View>
                    <View style={styles.inputView} >
                        <Text style={styles.inputLabel}>Login</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email..."
                            placeholderTextColor="#003f5c" />
                    </View>
                    <View style={styles.inputView} >
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password..."
                            placeholderTextColor="#003f5c"/>
                    </View>
                    <TouchableOpacity style={styles.mainBtn}>
                        <Text style={styles.mainBtnText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.signUpLink}
                        onPress={() => navigation.navigate('SignUp')}>
                        <Text>New user?</Text>
                        <Text style={styles.signUpColored}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        width: '100%',
        // height: '100%',
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainText: {
        width: '100%',
        marginBottom: 30
    },
    welcomeBackText: {
        fontSize: 26,
        color: 'green',
        // fontFamily: 'Dessau'
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
    signUpLink: {
        flexDirection: 'row'
    },
    signUpColored: {
        marginLeft: 5,
        color: 'green'
    }
});