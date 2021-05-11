import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Petals2 } from '../../components/diagramComponents/Petals2';
import { Petals3 } from '../../components/diagramComponents/Petals3';
import { SummaryASRLegend } from '../../components/diagramComponents/SummaryASRLegend';

import { Loader } from '../../components/Loader';
import { Panel } from '../../components/Panel';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

let dropDownAlert;

export const TopTenCountriesIn = (props) => {
    const backButtonHandler = BackButtonHandler();
    const token = props.token;
    const url = props.url;
    const companyId = props.companyId;
    const navigation = props.navigation;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [reportDay, setReportDay] = useState("");
    const [tableData, setTableData] = useState([]);
    const mock = [
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 4, 6.67, ~~(175 / 60) + ':' + 175 % 60],
        ["Ukraine", 6, 67, ~~(55 / 60) + ':' + 55 % 60],
        ["Ukraine", 21, 11.7, ~~(17 / 60) + ':' + 17 % 60],
        ["Ukraine", 12, 7.7, ~~(78 / 60) + ':' + 78 % 60],
        ["Ukraine", 5, 10.59, ~~(760 / 60) + ':' + 760 % 60],
        ["Ukraine", 1, 23.73, ~~(7 / 60) + ':' + 7 % 60],
        ["Ukraine", 0, 13.7, ~~(80 / 60) + ':' + 80 % 60],
        ["Ukraine", 0.6, 38.54, ~~(75 / 60) + ':' + 75 % 60]
    ];
    const title = "Top 10 Countries";
    const unit = 'min.';

    const mock2 = {
        "data": [
            [16.67, 75, "Ukraine", 5, 4, 3, 2],
            [12.3, 175, "USA", 7, 2, 12, 32],
            [2.3, 15, "Portugal", 6, 12, 412, 56]
        ],
        "fields": [
            "asr",
            "acd",
            "country",
            "delta_price",
            "tp_sum",
            "op_sum",
            "duration",
        ],
        "message": "OK",
        "report_day": "2021-05-10",
        "status": 200,
        "time_elapsed": 0.166204
    }

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Top Ten Countries In Loaded---")
        _setReportData();
    }, [])

    useEffect(() => {
        setTableData(convertData());
    }, [data])

    const _setReportData = async () => {
        // let response = await McData._getTopTenCountries(token, url, companyId, 'in');
        let response = mock2;
        setLoading(false);
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, url, navigation)
        } else {
            setData(response.data);
            setLabels(response.fields);
            setReportDay(response.report_day);
        }
    };

    const convertData = () => {
        let arr = [];
        for (var i in data) {
            let obj = {};
            for (var j in labels) {
                obj[labels[j]] = data[i][j];
            }
            arr.push(obj);
        }
        console.log("TableData: ", arr);
        return arr;
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <Panel style={styles.table}>
                    <Text style={styles.tableTitle}>Report for {reportDay}</Text>
                    <View style={styles.tableContent}>
                        <View style={styles.tableColumn}>
                            <Text style={styles.columnTitle}>Country</Text>
                        </View>
                        <View style={styles.tableColumn}>
                            <Text style={styles.columnTitle}>Cost In / Cost Out</Text>
                        </View>
                        <View style={styles.tableColumn}>
                            <Text style={styles.columnTitle}>Margin</Text>
                        </View>
                    </View>
                </Panel>
                <SummaryASRLegend />
                <View style={styles.canvasWrapper}>
                    <Petals3
                        data={mock}
                        title={title}
                        unit={unit}
                        height={300}
                        width={300} />
                </View>
            </View>
            <Loader loading={loading} />
            <StatusBar style="auto" />
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
        marginTop: 15
    },
    contentWrapper: {
    },
    canvasWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    table: {
        marginBottom: 10,
    },
    tableTitle: {
        textAlign: 'center',
        fontFamily: 'SF',
        marginBottom: 15
    },
    tableContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tableColumn: {

    },
    columnTitle: {
        marginBottom: 10
    }
})