import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

import { ServiceSwitcher } from '../../components/diagramComponents/ServiceSwitcher';
import { AreaChartPanel } from '../../components/diagramComponents/AreaChartPanel';

let dropDownAlert;

export const CallCharts = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [interval, setInterval] = useState('yesterday');
    const [service, setService] = useState('voice');

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Call Charts---`);
        _setReportData(interval, service);
    }, [interval, service]);

    const _setReportData = async (interval, service) => {
        setLoading(true);
        const response = await McData._getCallCharts(props.token, props.url, interval, service);
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation)
            setLoading(false);
        } else {
            setData(removeNulls(response.data));
            setLoading(false);
        }
    };

    const removeNulls = (data) => {
        return data.filter(e => !!e);
    };

    const findMax = (data) => {
        let max = 0;
        for (let i in data) {
            if (data[i] > max) max = data[i];
        }
        return max;
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
                    <AreaChartPanel
                        data={data}
                        service={service}
                        max={findMax(data)} />
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