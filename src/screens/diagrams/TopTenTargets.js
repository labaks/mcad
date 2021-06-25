import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

import { ServiceSwitcher } from '../../components/diagramComponents/ServiceSwitcher';
import { RoutesReport } from '../../components/diagramComponents/RoutesReport';

let dropDownAlert;

export const TopTenTargets = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [interval, setInterval] = useState('yesterday');
    const [service, setService] = useState('voice');

    const target = props.target;
    const maxLineWidth = 130;

    let maxAttempts = 0;

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Top 10 ${target}---`);
        // _setReportData();
    }, []);

    useEffect(() => {
        _setReportData(interval, service);
    }, [interval, service, target]);

    useEffect(() => {
        maxAttempts = getMaxAttempts(data);
        getLineWidths(data);
    }, [data]);

    const _setReportData = async (interval, service) => {
        setLoading(true);
        const response = await McData._getTopTenTargets(props.token, props.url, interval, service, target);
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation)
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
            setLoading(false);
        }
    };

    const getMaxAttempts = (data) => {
        let max = 0;
        for (let i in data) {
            if (parseInt(data[i].attempts) > max) {
                max = data[i].attempts;
            }
        }
        return max;
    };

    const getLineWidths = (data) => {
        let tempData = data;
        for (let i in data) {
            tempData[i].lineWidth = maxLineWidth * data[i].attempts / maxAttempts;
            tempData[i].asrColor = getAsrRate(data[i].asr);
        }
        setData(tempData);
    };

    const getAsrRate = (asr) => {
        const rates = [1, 3, 7, 10, 15];
        const colors = ['#e38472', '#ffbcac', '#f9c87c', '#deeaac', '#c0d280', '#90bc99'];
        for (let i = rates.length; i > 0; i--) {
            if (asr >= rates[i - 1]) {
                return colors[i];
            }
        }
        return 0;
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
                    <RoutesReport data={data} />
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