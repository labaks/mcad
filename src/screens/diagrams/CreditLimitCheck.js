import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

import { ServiceSwitcher } from '../../components/diagramComponents/ServiceSwitcher';
import { RoutesReport } from '../../components/diagramComponents/RoutesReport';

let dropDownAlert;

export const CreditLimitCheck = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [interval, setInterval] = useState('yesterday');
    const [service, setService] = useState('voice');

    const maxLineWidth = 160;

    let maxBalances = [];

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Credit Limit Check---`);
        // _setReportData();
    }, []);

    useEffect(() => {
        _setReportData(interval, service);
    }, [interval, service]);

    useEffect(() => {
        maxBalances = getMaxBalances(data);
        getLineWidths(data);
    }, [data]);

    const _setReportData = async (interval, service) => {
        setLoading(true);
        const response = await McData._getCreditLimit(props.token, props.url, interval, service);
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation)
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
            setLoading(false);
        }
    };

    const getMaxBalances = (data) => {
        let maxBalance = 1;
        let maxCredit = 1
        for (let i in data) {
            if (Math.abs(data[i].credit_limit) > maxCredit) {
                maxCredit = Math.abs(data[i].credit_limit);
            }
            if (Math.abs(data[i].balance_in_default_currency) > maxBalance) {
                maxBalance = Math.abs(data[i].balance_in_default_currency);
            }
        }
        return [maxBalance, maxCredit];
    };

    const getLineWidths = (data) => {
        let tempData = data;
        for (let i in data) {
            tempData[i].lineWidth = data[i].closed ?
                maxLineWidth * Math.abs(data[i].balance_in_default_currency) / maxBalances[0]
                :
                maxLineWidth * Math.abs(data[i].credit_limit) / maxBalances[1];
            tempData[i].asrColor = getColorRate(data[i].percent);
        }
        setData(tempData);
    };

    const getColorRate = (percent) => {
        const rates = [1, 3, 7, 10, 15];
        const colors = ['#e38472', '#ffbcac', '#f9c87c', '#deeaac', '#c0d280', '#90bc99'];
        for (let i = rates.length; i > 0; i--) {
            if (percent >= rates[i - 1]) {
                return colors[i];
            }
        }
        return colors[0];
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <ServiceSwitcher
                    interval={interval}
                    service={service}
                    setInterval={setInterval}
                    setService={setService}
                />
                {loading ?
                    <Loader loading={loading} />
                    :
                    <RoutesReport
                        data={data}
                        creditLimitCheck={true}
                        pagination={true} />
                }
            </View>
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
    }
})