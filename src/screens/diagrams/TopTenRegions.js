import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

import { BarChartPanelDuration } from '../../components/diagramComponents/BarChartPanelDuration';
import { BarChartPanelProfit } from '../../components/diagramComponents/BarChartPanelProfit';

export const TopTenRegions = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Top 10 Regions ${props.direction} Loaded, Profit = ${props.profit}---`);
        _setReportData();
    }, [props.profit, props.direction]);

    const _setReportData = async () => {
        setLoading(true);
        const response = await McData._getTopTenRegions(props.token, props.url, props.companyId, props.direction, props.profit, props.service);
        if (response.status != 200) {
            ErrorHandler.handle(props.dropDownAlert, response, props.url, props.navigation)
            setLoading(false);
        } else {
            setData(cutData(McData.defineData(response.data, response.fields), props.profit));
            setLoading(false);
        }
    };

    const cutData = (data, profit) => {
        let cutedData = []
        for (let i in data) {
            if (profit) {
                if (data[i].today_profit > 0 || data[i].yesterday_profit > 0) {
                    cutedData.push(data[i]);
                }
            } else {
                if (data[i].today_duration > 0 || data[i].yesterday_duration > 0) {
                    cutedData.push(data[i]);
                }
            }
        }
        return cutedData;
    };

    return (
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
    )
}

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})