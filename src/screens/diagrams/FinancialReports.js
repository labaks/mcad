import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { FinancialReportsTable } from '../../components/diagramComponents/FinancialReportsTable';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

let dropDownAlert;

export const FinancialReports = (props) => {
    const backButtonHandler = BackButtonHandler();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [inbound, setInbound] = useState([]);
    const [outbound, setOutbound] = useState([]);

    const mock = {
        "data": [
            [false, "H_in", 735396, 735396, 559118, 3828, "0.68%", 192, "2.5",
                "27.22%", "490.26382", "429.00555", "61.25827", "14.28%", "H_From", "inbound", ""
            ],
            [false, "point21", 735396, 735396, 559118, 3828, "0.68%", 192,
                "2.5", "27.22%", "490.26382", "429.00555", "61.25827",
                "14.28%", "H_From", "inbound", "Total"]
        ],
        "fields": [
            "company", //company
            "direction", //Inbound/outbound
            "point_name", //point name
            "country", //country
            "duration", //duration
            "calc_duration", //calculated
            "attempts", //attempts
            "sa", //S. Attempts
            "op_sum", //Cost IN
            "tp_sum", //Cost OUT
            "delta_price", //Margin
            "delta_profit", //Profit
            "manager", //Account manager
        ],
        "message": "OK",
        "agg_last_time": "2021-05-19 08:00:00",
        "status": 200,
        "time_elapsed": 0.166204
    }

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Financial Reports ${props.period} Loaded---`)
        _setReportData();
    }, []);

    useEffect(() => {
        if (data.length) {
            devideData(data);
            setLoading(false);
        }
    }, [data]);

    const _setReportData = async () => {
        let response = await McData._getFinSummary(props.token, props.url, props.companyId, props.period);
        // let response = mock;
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation);
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
        }
    };

    const devideData = (arr) => {
        let inbound = [];
        let outbound = [];
        for (var i in arr) {
            if (arr[i].direction == 1) {
                inbound.push(arr[i])
            } else if (arr[i].direction == 2) {
                outbound.push(arr[i]);
            }
        }
        setOutbound(outbound);
        setInbound(inbound);
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                {!loading ?
                    <FinancialReportsTable data={inbound} />
                    :
                    <Loader loading={loading} />
                }
            </View>
            <DropdownAlert
                ref={(ref) => { dropDownAlert = ref }}
                closeInterval={3000}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});