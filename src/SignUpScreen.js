import { StatusBar } from 'expo-status-bar';
import { CheckBox } from 'native-base';
import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { InputView } from './components/InputView';
import { Logo } from './components/Logo';
import { MainBtn } from './components/MainBtn';
import { PasswordField } from './components/PasswordField';
import { TitleText } from './components/TitleText';
import { FormData } from './helpers/FormData';

export const SignUpScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [agryWithPrivacy, setAgryWithPrivacy] = useState(false);
    const privacyPolicyUrl = "https://speedflow.com/privacy-policy/";
    const [formValues, handleFormValueChange, setFormValues] = FormData({
        url: '',
        login: '',
        password: ''
    });
    const isValid = formValues.login.length > 0 && formValues.password.length > 0 && formValues.url.length > 0 && agryWithPrivacy;

    const openPrivacy = useCallback(async () => {
        const supported = await Linking.canOpenURL(privacyPolicyUrl);

        if (supported) {
            await Linking.openURL(privacyPolicyUrl);
        } else {
            Alert.alert(`Something wrong with URl-opener: ${privacyPolicyUrl}`);
        }
    }, [privacyPolicyUrl]);

    const handleSignUpPress = () => {
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
                'Host': formValues.url.toString()
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("response", json);
                if (json.status == 200) {
                    navigation.navigate('Content', { token: json.session_id });
                } else {
                    showMessage({
                        message: "Error",
                        description: json.details,
                        type: 'danger',
                        duration: 3000,
                        position: 'top'
                    })
                }

            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

    }

    return (
        <View style={styles.signUpScreenContainer}>
            <ImageBackground
                source={require('./../assets/signUpBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <Logo />
                    <View style={styles.mainText}>
                        <TitleText text='Hello!' />
                        <Text style={styles.fontFamilySF}>Create an account to continue</Text>
                    </View>
                    <InputView
                        label='URL'
                        formKey='url'
                        textInputProps={{ autoCapitalize: 'none' }}
                        handleFormValueChange={handleFormValueChange} />
                    <InputView
                        label='Login'
                        formKey='login'
                        textInputProps={{ autoCapitalize: 'none' }}
                        handleFormValueChange={handleFormValueChange} />
                    <PasswordField
                        formKey='password'
                        textInputProps={{ autoCapitalize: 'none' }}
                        handleFormValueChange={handleFormValueChange} />
                    <View style={styles.privacyBlock}>
                        <CheckBox
                            style={styles.privacyChk}
                            checked={agryWithPrivacy}
                            onPress={() => setAgryWithPrivacy(!agryWithPrivacy)}
                            color="#4B4B52" />
                        <View style={styles.privacyText}>
                            <Text>I agree with </Text>
                            <TouchableOpacity
                                onPress={openPrivacy}>
                                <Text style={styles.privacyLink}>Privacy policy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <MainBtn
                        text='Sign Up'
                        disabled={!isValid}
                        onPress={handleSignUpPress} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.fontFamilySF}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <StatusBar style="auto" />
            <FlashMessage />
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
    mainText: {
        marginBottom: 30,
        alignSelf: 'flex-start'
    },
    privacyBlock: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 15
    },
    privacyChk: {
        marginStart: -10,
        marginEnd: 20
    },
    privacyText: {
        flex: 1,
        flexDirection: 'row',
    },
    privacyLink: {
        color: '#63abca'
    },
    fontFamilySF: {
        fontFamily: 'SF'
    }
})