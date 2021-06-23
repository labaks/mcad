import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Petals } from '../../components/diagramComponents/Petals';
import { ServiceSwithcer } from '../../components/diagramComponents/ServiceSwitcher';
import { SummaryASRLegend } from '../../components/diagramComponents/SummaryASRLegend';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

let dropDownAlert;

export const TopTenCountriesStartPage = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState('yesterday');
    const [service, setService] = useState('voice');
    const [criterion, setCriterion] = useState(props.criterion);
    const title = "Top 10 Countries";

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
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation);
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ServiceSwithcer
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
                            height={300}
                            width={300}
                            service={service == 'voice' ? 1 : 2} />
                    </View>
                </View>
            }
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
        marginTop: 15,
    },
    canvasWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})