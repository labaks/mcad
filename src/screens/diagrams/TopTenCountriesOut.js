import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

let dropDownAlert;

export const TopTenCountriesOut = (props) => {
    const backButtonHandler = BackButtonHandler();
    const token = props.token;
    const url = props.url;
    const companyId = props.companyId;
    const navigation = props.navigation;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Top Ten Countries Out Loaded---")
        _setReportData();
    }, [])

    const _setReportData = async () => {
        let data = await McData._getTopTenCountries(token, url, companyId, 'out');
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
                <Text>Top Ten Countries Out</Text>
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