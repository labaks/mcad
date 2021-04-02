import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { Loader } from '../components/Loader';
import { Logo } from '../components/Logo';
import { MainBtn } from '../components/MainBtn';

import { BackButtonHandler } from '../helpers/BackButtonHandler';

let dropDownAlert;

export const SecondScreen = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const [loading, setLoading] = useState(false);

    console.log("======================");
    console.log("---Second Page Screen Loaded---")
    console.log("-params received: ", route.params);

    const message = () => {
        dropDownAlert.alertWithType('warn', 'Warning title', 'warning body');
    }

    const clearStorage = () => {
        console.log("--Clear storage pressed");
        AsyncStorage.clear().then(() => {
            console.log("-Storage cleared. Navigating to SignUp screen");
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'SignUp'
                }]
            })
        })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/signUpBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <Logo />
                    <MainBtn
                        text="Clear credentials"
                        onPress={clearStorage} />
                    <MainBtn
                        text="Warning"
                        onPress={message} />
                </View>
            </ImageBackground>
            <Loader loading={loading} />
            <StatusBar style="auto" />
            <DropdownAlert
                ref={(ref) => { dropDownAlert = ref }}
                closeInterval={3000}
            />
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
})