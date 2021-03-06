import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import publicIP from 'react-native-public-ip';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Logo } from '../components/Logo';
import { Loader } from '../components/Loader';

import { McData } from '../helpers/McData';
import { UserData } from '../helpers/UserData';

var dropDownAlert;

export const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [userData, updateUserData, setUserData] = UserData({
        url: '',
        login: '',
        password: '',
        logged_in: false
    });

    useEffect(() => {
        console.log("=====================================================");
        console.log("---SplashScreen loaded---");
        (async () => {
            const storageResponse = await AsyncStorage.multiGet(['logged_in', 'url', 'login', 'password']);
            userData.logged_in = storageResponse[0][1] === "true";
            userData.url = storageResponse[1][1];
            userData.login = storageResponse[2][1];
            userData.password = storageResponse[3][1];
            console.log("---userData: ", userData);
            if (userData.logged_in) {
                const ip = await publicIP()
                    .catch(error => {
                        setLoading(false);
                        console.log("--publicIP() catch error:", error);
                        dropDownAlert.alertWithType(
                            'error',
                            '',
                            error);
                    });
                console.log("--publicIP() response: ", ip);
                const loginResponse = await McData._login(
                    userData.url,
                    userData.login,
                    userData.password,
                    ip
                );
                setLoading(false);
                if (loginResponse.status == 200) {
                    console.log("---login ok");
                    console.log("---SplashScreen will navigate to Start Page. token: ", loginResponse.session_id);
                    navigation.navigate('NavChooseCompany', {
                        token: loginResponse.session_id,
                        url: userData.url
                    })
                } else {
                    console.log("---login false. error: ", loginResponse.details ? loginResponse.details : loginResponse.message);
                    dropDownAlert.alertWithType(
                        'error',
                        '',
                        loginResponse.details ? loginResponse.details : loginResponse.message
                    );
                    console.log("---SplashScreen will navigate to SignUpScreen");
                    navigation.navigate('SignUp');
                }
            } else {
                setLoading(false);
                if (userData.url === null) {
                    console.log("---SplashScreen will navigate to SignUpScreen");
                    navigation.navigate('SignUp');
                } else {
                    console.log("---SplashScreen will navigate to LoginScreen. url: ", userData.url);
                    navigation.navigate('Login', { url: userData.url });
                }
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Logo />
            <View>
                <Loader loading={loading} />
            </View>
            <DropdownAlert
                ref={(ref) => { dropDownAlert = ref }}
                closeInterval={3000} />
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
