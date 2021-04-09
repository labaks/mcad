import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import Constants from 'expo-constants';

import { AccountTextView } from '../components/AccountTextView';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';

import { BackButtonHandler } from '../helpers/BackButtonHandler';

let dropDownAlert;

export const Account = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);

    console.log("======================");
    console.log("---Account Screen Loaded---")
    console.log("-params received: ", route.params);

    useEffect(() => {
        _setAccountData();
    }, [])

    const _setAccountData = async () => {
        setLoading(true)
        _getUsers(token, url)
            .then((json) => {
                console.log("-fetch response: ", json.data)
                setCurrentUser(userArrayToObj(json.data[0]));
                console.log("-current User: ", currentUser);
            })
            .catch((error) => console.error("fetch catch error: ", error))
            .finally(() => setLoading(false));
    }

    const _getUsers = async (token = '', host = '') => {
        let dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["login", "name", "rl_name"]
            }
        }
        const response = await fetch('https://mcapp.mcore.solutions/api/users_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        });
        return await response.json();
    }

    const userArrayToObj = (array) => {
        return {
            login: array[0],
            name: array[1],
            role: array[2]
        }
    }

    const handleLogout = () => {
        setLoading(true);
        console.log("--Logout pressed");
        console.log("-url: ", url)
        fetch('https://mcapp.mcore.solutions/api/logout/', {
            method: 'POST',
            body: JSON.stringify({ 'session_id': token, 'data': {} }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': url
            },
        }).then((response) => response.json()
        ).then((json) => {
            console.log("-fetch response: ", json)
            if (json.status == 200) {
                console.log("logout ok")
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
                setLoading(false)
                console.log("logout false. Error: ", json.details ? json.details : json.message);
                dropDownAlert.alertWithType(
                    'error',
                    '',
                    json.details ? json.details : json.message);
            }
        }).catch((error) => console.error("fetch catch error: ", error)
        ).finally(() => setLoading(false));
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
                            text="Log out"
                            onPress={handleLogout} />
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