import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Loader } from '../components/Loader';
import { Logo } from '../components/Logo';
import { MainBtn } from '../components/MainBtn';

export const Content = ({ navigation, route }) => {
    console.log("route", route)
    const token = route.params.token;
    const url = route.params.url;
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(false);

    const hadleGetUsersPress = () => {
        setLoading(true);
        let dataToSend = {
            "session_id": token,
            "data": {
                "sort_by": [{ "name": "" }],
                "fields": ["name"]
            }
        }
        console.log("DataToSend", dataToSend);
        fetch('https://mcapp.mcore.solutions/api/users_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': url
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("---users_get response", json)
                showMessage({
                    message: "Success",
                    description: json.details,
                    type: 'success',
                    duration: 3000,
                    position: 'top'
                })
                setResponseData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    const hadleLogout = () => {
        setLoading(true);
        console.log("url from logout function: ", url)
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
            console.log("---logout response", json)
            if (json.status == 200) {
                console.log("logout ok")
                AsyncStorage.setItem('logged_in', 'false').then(() => {
                    setLoading(false)
                    navigation.navigate('Login', { url: url })
                })
            } else {
                showMessage({
                    message: "Error",
                    description: json.details,
                    type: 'danger',
                    duration: 3000,
                    position: 'top'
                })
                setLoading(false)
            }
        }).catch((error) => console.error(error)
        ).finally(() => setLoading(false))
    }

    const clearStorage = () => {
        AsyncStorage.clear().then(() => {
            navigation.navigate('SignUp')
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
                        text='Get users'
                        onPress={hadleGetUsersPress} />
                    <MainBtn
                        text="Logout"
                        onPress={hadleLogout} />
                    <MainBtn
                        text="Clear credentials"
                        onPress={clearStorage} />
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
})