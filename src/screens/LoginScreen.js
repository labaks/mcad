import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import publicIP from 'react-native-public-ip';
import { InputView } from '../components/InputView';
import { Loader } from '../components/Loader';
import { Logo } from '../components/Logo';
import { MainBtn } from '../components/MainBtn';
import { PasswordField } from '../components/PasswordField';
import { TitleText } from '../components/TitleText';

import { FormData } from '../helpers/FormData';

export const LoginScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [formValues, handleFormValueChange, setFormValues] = FormData({
        login: '',
        password: ''
    });
    const isValid = formValues.login.length > 0 && formValues.password.length > 0;

    let url = '';
    if (route.params) {
        url = route.params.url;
    } else {
        url = null;
    }

    console.log("======================");
    console.log("---LoginScreen loaded---");
    console.log("-params received: ", route.params);

    const handleLoginPress = () => {
        console.log("--Login button pressed");
        console.log("-url: ", url);
        if (url === null) {
            console.log("-Error: url == null");
            showMessage({
                message: "Error",
                description: "You have no URL, please go to Sign Up page",
                type: 'danger',
                duration: 3000,
                position: 'top'
            })
        } else {
            setLoading(true);
            publicIP().then(ip => {
                console.log("-publicIP() response: ", ip);
                let dataToSend = {
                    "login": formValues.login,
                    "password": formValues.password,
                    "ip": ip
                }
                console.log("-dataToSend: ", dataToSend);
                fetch('https://mcapp.mcore.solutions/api/login/', {
                    method: 'POST',
                    body: JSON.stringify(dataToSend),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Host': url.toString()
                    },
                }).then((response) => response.json()
                ).then((json) => {
                    setLoading(false);
                    console.log("-fetch response: ", json);
                    if (json.status == 200) {
                        console.log("login ok");
                        navigation.navigate('Content', {
                            token: json.session_id,
                            url: url
                        });
                        // navigation.dispatch(
                        //     StackActions.replace('DrawerNavigationRoutes', { token: json.session_id })
                        // );
                    } else {
                        console.log("login false. Error: ", json.details ? json.details : json.message);
                        showMessage({
                            message: "Error",
                            description: json.details ? json.details : json.message,
                            type: 'danger',
                            duration: 3000,
                            position: 'top'
                        })
                    }
                }).catch((error) => console.error("fetch catch error: ", error)
                ).finally(() => setLoading(false));
            }).catch(error => {
                setLoading(false);
                console.log("-publicIP() catch error:", error);
                showMessage({
                    message: "Error",
                    description: error,
                    type: 'danger',
                    duration: 3000,
                    position: 'bottom'
                });
            });
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/loginBg.png')}
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
                        disabled={!isValid}
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
            <Loader loading={loading} />
            <StatusBar style="auto" />
            <FlashMessage />
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