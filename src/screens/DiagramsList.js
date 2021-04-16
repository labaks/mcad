import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { DiagramsHeader } from '../components/DiagramsHeader';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';
import { Panel } from '../components/Panel';

import { BackButtonHandler } from '../helpers/BackButtonHandler';
import { McData } from '../helpers/McData';

let dropDownAlert;

export const DiagramsList = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const [loading, setLoading] = useState(false);
    const [selectedDiagrams, setSelectedDiagrams] = useState([]);

    useEffect(() => {
        console.log("======================");
        console.log("---Diagrams List Screen Loaded---")
        console.log("-params received: ", route.params);
    }, [])

    const selectDiagrams = () => {
        console.log("--Diagrams selected: ", selectedDiagrams);
    }

    const handleError = (error) => {
        setLoading(false);
        if (error.message == "Unauthorized") {
            console.log("--Force logout");
            AsyncStorage.setItem('logged_in', 'false').then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'Login',
                        params: { url: url, message: error.details }
                    }]
                })
            })
        } else {
            console.log("--Error: ", error.details ? error.details : error.message);
            dropDownAlert.alertWithType(
                'error',
                '',
                error.details ? error.details : error.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <DiagramsHeader title='' />
                <Panel>
                </Panel>
                <MainBtn
                    text="Select"
                    onPress={selectDiagrams}
                />
            </View>
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
        backgroundColor: 'white'
    },
    contentWrapper: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 40,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
})