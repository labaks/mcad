import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Loader } from '../../components/Loader';
import { Panel } from '../../components/Panel';
import { NoRecords } from '../../components/NoRecords';

import { FinancialReportsTable } from '../../components/diagramComponents/FinancialReportsTable';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

export const FinancialReports = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [inbound, setInbound] = useState([]);
    const [outbound, setOutbound] = useState([]);

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Financial Reports ${props.period} Loaded---`)
        _setReportData();
    }, [props.period]);

    useEffect(() => {
        if (data.length) {
            devideData(data);
            setLoading(false);
        }
    }, [data]);

    const _setReportData = async () => {
        setLoading(true);
        const response = await McData._getFinSummary(props.token, props.url, props.companyId, props.period, props.service);
        if (response.status != 200) {
            ErrorHandler.handle(props.dropDownAlert, response, props.url, props.navigation);
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
            if (!response.data.length) setLoading(false);
        }
    };

    const devideData = (arr) => {
        let inbound = [];
        let outbound = [];
        for (let i in arr) {
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
        <View style={styles.contentWrapper}>
            {!loading ?
                data.length ?
                    <Panel>
                        <Text style={styles.subtitle}>Account Manager: {data[0].manager}</Text>
                        <Text style={styles.title}>INBOUND</Text>
                        <FinancialReportsTable
                            data={inbound}
                            service={props.service} />
                        <Text style={[styles.title, { marginTop: 20 }]}>OUTBOUND</Text>
                        <FinancialReportsTable
                            data={outbound}
                            service={props.service} />
                    </Panel>
                    :
                    <NoRecords />
                :
                <Loader loading={loading} />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'SFBold',
        marginBottom: 10
    },
    subtitle: {
        textAlign: 'center',
        fontFamily: 'SF'
    },
});