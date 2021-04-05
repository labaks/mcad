import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';
import { SelectableList } from '../components/SelectableList';
import { TitleText } from '../components/TitleText';

import { BackButtonHandler } from '../helpers/BackButtonHandler';

let dropDownAlert;

export const Reports = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const [loading, setLoading] = useState(false);

    console.log("======================");
    console.log("---Reports Screen Loaded---")
    console.log("-params received: ", route.params);

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.titleWrapper}>
                    <TitleText text="Choose the company" />
                </View>
                <SelectableList
                    label="Company"
                />
                <MainBtn text="Select" />
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
    },
    titleWrapper: {
        alignSelf: 'stretch'
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})