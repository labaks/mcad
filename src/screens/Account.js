import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { AccountTextView } from '../components/AccountTextView';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';

import { BackButtonHandler } from '../helpers/BackButtonHandler';

let dropDownAlert;

export const Account = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const [usersResponseData, setUsersResponseData] = useState([]);
    const [login, setLogin] = useState('');
    const [loading, setLoading] = useState(false);

    console.log("======================");
    console.log("---Account Screen Loaded---")
    console.log("-params received: ", route.params);

    _setAccountData = async () => {
        // GetUsers();
        setLogin(await AsyncStorage.getItem('login'));
        // let currenUser = usersResponseData.find(item => item[0] == login);
        console.log("-login: ", login)
        // console.log("-current User: ", currenUser);
    }

    _setAccountData();

    const GetUsers = () => {
        console.log("--UsersGet pressed");
        setLoading(true);
        let dataToSend = {
            "session_id": token,
            "data": {
                "sort_by": [{ "name": "" }],
                "fields": ["login", "name", "rl_name"]
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
            console.log("-fetch response: ", json.data)
            setUsersResponseData(json);
        }
        ).catch((error) => console.error("fetch catch error: ", error)
        ).finally(() => setLoading(false));
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
                            value={login} />
                        <AccountTextView
                            label="Access Level"
                            value="Some" />
                        <AccountTextView
                            label="Version"
                            value="Some" />
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
        borderColor: 'red',
        // borderWidth: 1
    }
})