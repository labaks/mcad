import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

import { BarChartPanel } from '../../components/diagramComponents/BarChartPanel';

let dropDownAlert;

export const TopTenRegions = (props) => {
    const backButtonHandler = BackButtonHandler();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const mock = {
        "data": [
            [15, "Ukraine", 3],
            [12, "USA", 30],
            [3, "Portugal", 6]
        ],
        "fields": [
            "yesterday_duration",
            "region",
            "today_duration",
        ],
        "message": "OK",
        "status": 200,
        "time_elapsed": 0.166204
    }

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Top 10 Regions ${props.direction} Loaded, Profit = ${props.profit}---`);
        _setReportData();
    }, []);

    const _setReportData = async () => {
        let response = await McData._getTopTenRegions(props.token, props.url, props.companyId, props.direction, props.profit);
        // let response = mock;
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation)
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                {loading ?
                    <Loader loading={loading} />
                    :
                    <BarChartPanel data={data} />
                }
            </View>
            <StatusBar style="auto" />
            <DropdownAlert
                ref={(ref) => { dropDownAlert = ref }}
                closeInterval={3000}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})