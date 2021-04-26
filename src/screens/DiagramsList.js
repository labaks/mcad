// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Tab, TabHeading, Tabs } from 'native-base';
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
// import CheckboxList from 'rn-checkbox-list';
import { CheckboxList } from "../components/CheckboxList";

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
        { id: 0, title: 'Top 10 Regions In', active: false },
        { id: 1, title: 'Top 10 Regions Out', active: false },
        { id: 2, title: 'Top 10 Regions In, $', active: false },
        { id: 3, title: 'Top 10 Regions Out, $', active: false },
        { id: 4, title: 'Top 10 Countries In', active: false },
        { id: 5, title: 'Top 10 Countries Out', active: false },
        { id: 6, title: 'Traffic Share In', active: false },
        { id: 7, title: 'Traffic Share Out', active: false },
        { id: 8, title: 'Financial Reports Today', active: false },
        { id: 9, title: 'Financial Reports Yesterday', active: false }
    ];

    useEffect(() => {
        console.log("=====================================================");
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

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <DiagramsHeader title='' />
                <Panel>
                    <CheckboxList data={diagramsListData}/>
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