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

export const Content = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log("======================");
    console.log("---Content Screen Loaded---")
    console.log("-params received: ", route.params);

    const hadleGetUsersPress = () => {
        console.log("--UsersGet pressed");
        setLoading(true);
        let dataToSend = {
            "session_id": token,
            "data": {
                "sort_by": [{ "name": "" }],
                "fields": ["name"]
            }
        }
        console.log("-DataToSend: ", dataToSend);
        fetch('https://mcapp.mcore.solutions/api/users_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': url
            },
        }).then((response) => response.json()
        ).then((json) => {
            console.log("-fetch response (first elem): ", json.data[0])
            dropDownAlert.alertWithType('success', 'Get Users success', "Received " + json.data.length + " users");
            // setResponseData(json);
        }
        ).catch((error) => console.error("fetch catch error: ", error)
        ).finally(() => setLoading(false));
    }

    const hadleLogout = () => {
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