import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { Petals } from '../../components/diagramComponents/Petals';
import { ServiceSwitcher } from '../../components/diagramComponents/ServiceSwitcher';
import { SummaryASRLegend } from '../../components/diagramComponents/SummaryASRLegend';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

export const TopTenCountriesStartPage = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState('yesterday');
    const [service, setService] = useState('voice');
    const [criterion, setCriterion] = useState(props.criterion);
    const title = "Top 10 Countries";
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Top Ten Countries Start Page Loaded---");
        // _setReportData(interval, service);
    }, []);

    useEffect(() => {
        _setReportData(interval, service);
    }, [interval, service, props.criterion]);

    const _setReportData = async (interval, service) => {
        setLoading(true);
        const response = await McData._getTopTenCountriesStartPage(props.token, props.url, criterion, interval, service);
        if (response.status != 200) {
            ErrorHandler.handle(props.dropDownAlert, response, props.url, props.navigation);
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ServiceSwitcher
                interval={interval}
                service={service}
                setInterval={setInterval}
                setService={setService}
            />
            {loading ?
                <Loader loading={loading} />
                :
                <View>
                    <SummaryASRLegend />
                    <View style={styles.canvasWrapper}>
                        <Petals
                            data={data}
                            title={title}
                            unit={service == 'voice' ? 'min.' : 'sms'}
                            height={windowWidth - 50}
                            width={windowWidth - 50}
                            service={service == 'voice' ? 1 : 2} />
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    canvasWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})