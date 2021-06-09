import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import Constants from 'expo-constants';

import { AccountTextView } from '../components/AccountTextView';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';

import { BackButtonHandler } from '../helpers/BackButtonHandler';
import { McData } from '../helpers/McData'
import { ErrorHandler } from '../helpers/ErrorHandler';

let dropDownAlert;

export const Account = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Account Screen Loaded---")
        console.log("-params received: ", route.params);
        _setAccountData();
    }, [])

    const _setAccountData = async () => {
        setLoading(true)
        const user = await McData._getCurrentUser(token, url);
        if (user.status) {
            ErrorHandler.handle(dropDownAlert, user, url, navigation);
            setLoading(false);
        } else {
            setCurrentUser(McData.userArrayToObj(user));
            setLoading(false);
        }
    }

    const _handleLogout = async () => {
        setLoading(true);
        console.log("--Logout pressed");
        const response = await McData._logout(token, url);
        if (response.status == 200) {
            console.log("---logout ok")
            AsyncStorage.setItem('logged_in', 'false').then(() => {
                setLoading(false)
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'Login',
                        params: { url: url }
                    }]
                })
            })
        } else {
            ErrorHandler.handle(dropDownAlert, response, url, navigation);
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/loginBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <View style={styles.topBlock}>
                        <AccountTextView
                            label="User Name"
                            value={currentUser.name} />
                        <AccountTextView
                            label="Access Level"
                            value={currentUser.role} />
                        <AccountTextView
                            label="Version"
                            value={Constants.manifest.version} />
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <MainBtn
                            text="Log Out"
                            onPress={_handleLogout} />
                    </View>
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
        flexDirection: 'column',
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBlock: {
        marginTop: 30,
        alignSelf: 'stretch'
    },
    bottomButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingBottom: 30,
    }
})