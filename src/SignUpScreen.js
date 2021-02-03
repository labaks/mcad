import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { InputView } from './components/InputView';
import { Logo } from './components/Logo';
import { MainBtn } from './components/MainBtn';
import { TitleText } from './components/TitleText';

export const SignUpScreen = ({ navigation }) => {
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
                    <InputView label='URL' />
                    <InputView label='Login' />
                    <InputView label='Password' secure={true} />
                    <MainBtn text='Sign Up' />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.fontFamilySF}>Log In</Text>
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
    mainText: {
        marginBottom: 30,
        alignSelf: 'flex-start'
    },
    fontFamilySF: {
        fontFamily: 'SF'
    }
})