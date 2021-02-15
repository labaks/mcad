import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Logo } from './components/Logo';
import { MainBtn } from './components/MainBtn';

export const Content = (props) => {
    const token = props.route.params.token;
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(false);

    const hadleGetUsersPress = () => {
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
                'Host': 'testing.mcore.solutions'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("---users_get response", json)
                setResponseData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./../assets/signUpBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <Logo />
                    <MainBtn
                        text='Get users'
                        onPress={hadleGetUsersPress} />
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
})