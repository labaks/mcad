// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import publicIP from 'react-native-public-ip';
import { InputView } from '../components/InputView';
import { Loader } from '../components/Loader';
import { Logo } from '../components/Logo';
import { MainBtn } from '../components/MainBtn';
import { PasswordField } from '../components/PasswordField';
import { TitleText } from '../components/TitleText';

import { FormData } from '../helpers/FormData';
import { BackButtonHandler } from '../helpers/BackButtonHandler';
import { McData } from '../helpers/McData';

let dropDownAlert;

export const LoginScreen = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
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

    useEffect(() => {
        console.log("=====================================================");
        console.log("---LoginScreen loaded---");
        console.log("-params received: ", route.params);
        if (route.params.message) {
            dropDownAlert.alertWithType(
                'error',
                '',
                route.params.message);
        }
    }, [route.params])

    const handleLoginPress = async () => {
        console.log("--Login button pressed");
        console.log("-url: ", url);
        if (url === null) {
            console.log("-Error: url == null");
            dropDownAlert.alertWithType(
                'error',
                '',
                "You have no URL, please go to Sign Up page");
        } else {
            setLoading(true);
            let ip = await publicIP()
                .catch(error => {
                    setLoading(false);
                    console.log("-publicIP() catch error:", error);
                    dropDownAlert.alertWithType(
                        'error',
                        '',
                        error);
                });
            console.log("--LoginPage publicIP() response: ", ip);
            let loginResponse = await McData._login(url, formValues.login, formValues.password, ip);
            if (loginResponse.status == 200) {
                console.log("login ok");
                AsyncStorage.setItem('logged_in', 'true').then(() => {
                    console.log("Storage setItem() ok");
                    setLoading(false);
                    navigation.navigate('NavChooseCompany', {
                        token: loginResponse.session_id,
                        url: url
                    });
                })
            } else {
                setLoading(false);
                console.log("login false. Error: ", loginResponse.details ? loginResponse.details : loginResponse.message);
                dropDownAlert.alertWithType(
                    'error',
                    '',
                    loginResponse.details ? loginResponse.details : loginResponse.message);
            }
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
            <DropdownAlert
                ref={(ref) => { dropDownAlert = ref }}
                closeInterval={3000} />
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