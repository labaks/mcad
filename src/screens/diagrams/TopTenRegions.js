import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

import { BarChartPanelDuration } from '../../components/diagramComponents/BarChartPanelDuration';
import { BarChartPanelProfit } from '../../components/diagramComponents/BarChartPanelProfit';

let dropDownAlert;

export const TopTenRegions = (props) => {
    const backButtonHandler = BackButtonHandler();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

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
        console.log("data", data)
    }, [props.profit, props.direction]);

    const _setReportData = async () => {
        setLoading(true);
        const response = await McData._getTopTenRegions(props.token, props.url, props.companyId, props.direction, props.profit);
        // const response = mock;
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation)
            setLoading(false);
        } else {
            setData(cutData(McData.defineData(response.data, response.fields), props.profit));
            setLoading(false);
        }
    };

    const cutData = (data, profit) => {
        let data1 = []
        for (let i in data) {
            if (profit) {
                if (data[i].today_profit > 0 && data[i].yesterday_profit > 0) {
                    data1.push(data[i]);
                }
            } else {
                if (data[i].today_duration > 0 && data[i].yesterday_duration > 0) {
                    data1.push(data[i]);
                }
            }
        }
        return data1;
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                {loading ?
                    <Loader loading={loading} />
                    :
                    props.profit ?
                        <BarChartPanelProfit data={data} />
                        :
                        <BarChartPanelDuration data={data} />
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