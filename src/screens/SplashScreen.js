import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import publicIP from 'react-native-public-ip';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

import AsyncStorage from '@react-native-community/async-storage';
import { Logo } from '../components/Logo';
import { Loader } from '../components/Loader';

export const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    console.log("======================");
    console.log("---SplashScreen loaded---");

    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.multiGet(['logged_in', 'url', 'login', 'password']).then((response) => {
                console.log("-Storage multiget() response: ", response);
                let logged_in = response[0][1],
                    url = response[1][1],
                    login = response[2][1],
                    password = response[3][1];
                console.log("-logged_in: ", logged_in);
                if (logged_in === "true") {
                    publicIP().then(ip => {
                        console.log("-publicIP() response: ", ip);
                        let dataToSend = {
                            "login": login,
                            "password": password,
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
                                console.log("login ok")
                                navigation.navigate('Content', {
                                    token: json.session_id,
                                    url: url
                                });
                            } else {
                                console.log("login false. error: ", json.details ? json.details : json.message);
                                showMessage({
                                    message: "Error",
                                    description: json.details ? json.details : json.message,
                                    type: 'danger',
                                    duration: 3000,
                                    position: 'top'
                                })
                            }
                        }).catch((error) => console.error("fetch catch error: ", error)
                        ).finally(() => {
                            setLoading(false);
                        })
                    }).catch(error => {
                        setLoading(false);
                        console.log("-publicIP() catch error:", error);
                        showMessage({
                            message: "Error",
                            description: error,
                            type: 'danger',
                            duration: 3000,
                            position: 'top'
                        })
                    })
                } else {
                    if (url === null) {
                        console.log("SplashScreen will navigate to SignUpScreen");
                        navigation.navigate('SignUp');
                    } else {
                        console.log("SplashScreen will navigate to LoginScreen. url: ", url);
                        navigation.navigate('Login', { url: url });
                    }
                }
            });
        }, 5000);
        return
    }, []);

    return (
        <View style={styles.container}>
            <Logo />
            <View>
                <Loader loading={loading} />
            </View>
            <FlashMessage />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});