import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
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
            <View style={styles.switcherWrapper}>
                <View>
                    <TouchableOpacity
                        style={[styles.btn, interval == 'yesterday' && styles.activeBtn, { borderTopLeftRadius: 10 }]}
                        activeOpacity={.5}
                        onPress={() => setInterval("yesterday")}>
                        <Text style={[styles.btnText, interval == 'yesterday' && styles.activeBtnText]}>Yesterday</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, interval == 'today' && styles.activeBtn, { borderBottomLeftRadius: 10 }]}
                        activeOpacity={.5}
                        onPress={() => setInterval("today")}>
                        <Text style={[styles.btnText, interval == 'today' && styles.activeBtnText]}>Today</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={[styles.btn, service == 'voice' && styles.activeBtn, { borderTopRightRadius: 10 }]}
                        activeOpacity={.5}
                        onPress={() => setService("voice")}>
                        <Text style={[styles.btnText, service == 'voice' && styles.activeBtnText]}>Voice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, service == 'sms' && styles.activeBtn, { borderBottomRightRadius: 10 }]}
                        activeOpacity={.5}
                        onPress={() => setService("sms")}>
                        <Text style={[styles.btnText, service == 'sms' && styles.activeBtnText]}>SMS</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    switcherWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    btn: {
        width: 150,
        borderColor: '#4A6E49',
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        margin: 1
    },
    btnText: {
        color: '#666',
        fontFamily: 'SFBold'
    },
    activeBtn: {
        backgroundColor: '#4A6E49',
    },
    activeBtnText: {
        color: 'white'
    }
})