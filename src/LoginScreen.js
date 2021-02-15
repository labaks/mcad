import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { InputView } from './components/InputView';
import { Logo } from './components/Logo';
import { MainBtn } from './components/MainBtn';
import { PasswordField } from './components/PasswordField';
import { TitleText } from './components/TitleText';

import { FormData } from './helpers/FormData';

export const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [formValues, handleFormValueChange, setFormValues] = FormData({
        login: '',
        password: ''
    })

    const handleLoginPress = () => {

        setLoading(true);
        let dataToSend = {
            "login": formValues.login,
            "password": formValues.password,
            "ip": "127.0.0.1" //TODO: get my ip
        }
        fetch('https://mcapp.mcore.solutions/api/login/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': 'testing.mcore.solutions'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                //TODO: if (no errors from api)
                navigation.navigate('Content', { token: json.session_id });
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
                    <InputView
                        label='Login'
                        formKey='login'
                        textInputProps={{ autoCapitalize: 'none' }}
                        handleFormValueChange={handleFormValueChange} />
                    <PasswordField
                        formKey='password'
                        textInputProps={{ autoCapitalize: 'none' }}
                        handleFormValueChange={handleFormValueChange} />
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