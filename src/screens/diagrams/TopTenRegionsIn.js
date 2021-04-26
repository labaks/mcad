import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

let dropDownAlert;

export const TopTenRegionsIn = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const companyId = route.params.companyId;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Top 10 Regions In Loaded---")
        console.log("-params received: ", route.params);
        _setReportData();
    }, [])

    const _setReportData = async () => {
        let data = await McData._getTopTenRegionsIn(token, url, companyId);
        setLoading(false);
        if (data.status) {
            ErrorHandler.handle(dropDownAlert, data, url, navigation)
        } else {
            setData(data);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <Text>{data}</Text>
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
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})