import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { InputView } from './components/InputView';
import { Logo } from './components/Logo';
import { MainBtn } from './components/MainBtn';
import { TitleText } from './components/TitleText';


export const LoginScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    let dataToSend = {
        "login": "labaks",
        "password": "123456789",
        "ip": "78.130.215.103"
    }
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    const handleLoginPress = () => {
        fetch('https://194.28.165.32', {
            method: 'POST',
            // body: formBody,
            body: dataToSend,
            headers: {
                //Header Defination
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                navigation.navigate('Content', { data: data });
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./../assets/loginBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <Logo />
                    <View style={styles.mainText}>
                        <TitleText text='Welcome back,' />
                        <Text style={styles.fontFamilySF}>Sign in to continue</Text>
                    </View>
                    <InputView label='Login' />
                    <InputView label='Password' secure={true} />
                    <MainBtn
                        text='Log in'
                        onPress={handleLoginPress} />
                    <TouchableOpacity
                        style={styles.signUpLink}
                        onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.fontFamilySF}>New user?</Text>
                        <Text style={[styles.signUpColored, styles.fontFamilySF]}>Sign up</Text>
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
        marginBottom: 30,
        alignSelf: 'flex-start'
    },
    signUpLink: {
        flexDirection: 'row'
    },
    signUpColored: {
        marginLeft: 5,
        color: '#4A6E49'
    },
    fontFamilySF: {
        fontFamily: 'SF'
    }
});