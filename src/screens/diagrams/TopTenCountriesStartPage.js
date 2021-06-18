import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Petals } from '../../components/diagramComponents/Petals';
import { SummaryASRLegend } from '../../components/diagramComponents/SummaryASRLegend';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

let dropDownAlert;

export const TopTenCountriesStartPage = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [criterion, setCriterion] = useState('delta_price'); // voice - duration, sms - attempts
    const [interval, setInterval] = useState('yesterday');
    const [service, setService] = useState('voice');
    const [serviceToggle, setServiceToggle] = useState(false);
    const [intervalToggle, setIntervalToggle] = useState(false);
    const title = "Top 10 Countries";
    const unit = 'min.';

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Top Ten Countries Start Page Loaded---")
        _setReportData();
    }, []);

    const _setReportData = async () => {
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

    const switchService = () => {
        setServiceToggle(previousState => !previousState);
        setService(serviceToggle ? "sms" : "voice");
        console.log("service:", service);
        _setReportData();
    };

    const switchInterval = () => {
        setIntervalToggle(previousState => !previousState);
        setInterval(intervalToggle ? "today" : "yesterday");
        console.log("interval:", interval);
        _setReportData();
    };

    return (
        <View style={styles.container}>
            {loading ?
                <Loader loading={loading} />
                :
                <View>
                    <View style={styles.switcherWrapper}>
                        <Text style={[styles.switcherLabel, !intervalToggle && styles.chosenSwithcerLabel]}>Yesterday</Text>
                        <Switch
                            style={styles.switcher}
                            trackColor={{ false: '#4A6E49', true: '#4A6E49' }}
                            thumbColor={intervalToggle ? "#edf2dc" : "#edf2dc"}
                            ios_backgroundColor="#4A6E49"
                            onValueChange={switchInterval}
                            value={intervalToggle} />
                        <Text style={[styles.switcherLabel, intervalToggle && styles.chosenSwithcerLabel]}>Today</Text>
                    </View>
                    <View style={styles.switcherWrapper}>
                        <Text style={[styles.switcherLabel, !serviceToggle && styles.chosenSwithcerLabel]}>Voice</Text>
                        <Switch
                            style={styles.switcher}
                            trackColor={{ false: '#4A6E49', true: '#4A6E49' }}
                            thumbColor={serviceToggle ? "#edf2dc" : "#edf2dc"}
                            ios_backgroundColor="#4A6E49"
                            onValueChange={switchService}
                            value={serviceToggle} />
                        <Text style={[styles.switcherLabel, serviceToggle && styles.chosenSwithcerLabel]}>SMS</Text>
                    </View>
                    <SummaryASRLegend />
                    <View style={styles.canvasWrapper}>
                        <Petals
                            data={data}
                            title={title}
                            unit={unit}
                            height={300}
                            width={300}
                            service={1} />
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
    switcherWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    switcher: {
        marginHorizontal: 10
    },
    switcherLabel: {
        fontSize: 15,
        fontFamily: 'SF',
        color: '#999'
    },
    chosenSwithcerLabel: {
        fontFamily: 'SFBold',
        color: 'black'
    }
})