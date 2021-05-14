import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

let dropDownAlert;

export const FinancialReports = (props) => {
    const backButtonHandler = BackButtonHandler();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Financial Reports ${props.period} Loaded---`)
        _setReportData();
    }, []);

    const _setReportData = async () => {
        let response = await McData._getFinSummary(props.token, props.url, props.companyId, props.period);
        setLoading(false);
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation)
        } else {
            setData(McData.defineData(response.data, response.fields));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <Text>{data}</Text>
            </View>
            <Loader loading={loading} />
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
        justifyContent: 'center',
        alignItems: 'center'
    },
})