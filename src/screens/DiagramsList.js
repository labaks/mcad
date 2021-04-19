import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Tab, TabHeading, Tabs } from 'native-base';
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import CheckboxList from 'rn-checkbox-list';

import { DiagramsHeader } from '../components/DiagramsHeader';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';
import { Panel } from '../components/Panel';

import { BackButtonHandler } from '../helpers/BackButtonHandler';

let dropDownAlert;

export const DiagramsList = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const companyId = route.params.companyId;
    const [loading, setLoading] = useState(false);
    let selectedDiagramsIds = [];
    let itemsArray = [];
    const diagramsListData = [
        { id: 0, name: 'Top 10 Regions In' },
        { id: 1, name: 'Top 10 Regions Out' },
        { id: 2, name: 'Top 10 Regions In, $' },
        { id: 3, name: 'Top 10 Regions Out, $' },
        { id: 4, name: 'Top 10 Countries In' },
        { id: 5, name: 'Top 10 Countries Out' },
        { id: 6, name: 'Traffic Share In' },
        { id: 7, name: 'Traffic Share Out' },
        { id: 8, name: 'Financial Reports Today' },
        { id: 9, name: 'Financial Reports Yesterday' }
    ];

    useEffect(() => {
        console.log("======================");
        console.log("---Diagrams List Screen Loaded---")
        console.log("-params received: ", route.params);
    }, [])

    const selectDiagrams = () => {
        console.log("--Diagrams selected: ", selectedDiagramsIds);
        switch (selectedDiagramsIds[0]) {
            case 0: {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'TopTenRegionsIn',
                        params: { url: url, token: token, companyId: companyId }
                    }]
                })
                break;
            }
            default: break;
        }
    }

    const checkListChanged = ({ ids, items }) => {
        selectedDiagramsIds = ids;
        itemsArray = items;
        console.log("--Selected Diagrams Array: ", selectedDiagramsIds);
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
                    <CheckboxList
                        listItems={diagramsListData}
                        checkboxProp={
                            Platform.select({
                                ios: {
                                    boxType: 'circle',
                                    tintColor: '#e4e4e4',
                                    onTintColor: '#4A6E49',
                                    onCheckColor: '#fff',
                                    onFillColor: '#4A6E49'
                                },
                                android: {
                                    tintColors: { true: '#4A6E49', false: '#e4e4e4' }
                                }
                            })}
                        listItemStyle={styles.listItemStyle}
                        onChange={checkListChanged}
                    />
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 30,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    wrapper: {
        flex: 1,
        alignSelf: 'stretch'

    },
    listItemStyle: {
        borderBottomWidth: 1,
        borderColor: '#e4e4e4'
    }
})