import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Petals3 } from '../../components/diagramComponents/Petals3';
import { SummaryASRLegend } from '../../components/diagramComponents/SummaryASRLegend';
import { Top10CountriesTable } from '../../components/diagramComponents/Top10CountriesTable';

import { Loader } from '../../components/Loader';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

let dropDownAlert;

export const TopTenCountries = (props) => {
    const backButtonHandler = BackButtonHandler();
    const [reportDay, setReportDay] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const title = "Top 10 Countries";
    const unit = 'min.';

    const mock = {
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
        console.log(`---Top Ten Countries ${props.direction} Loaded---`)
        _setReportData();
    }, [props.direction])

    const _setReportData = async () => {
        setLoading(true);
        let response = await McData._getTopTenCountries(props.token, props.url, props.companyId, props.direction);
        // let response = mock;
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation);
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
            setLoading(false);
            setReportDay(response.report_day);
        }
    };

    return (
        <View style={styles.container}>
            {loading ?
                <Loader loading={loading} />
                :
                <View style={styles.contentWrapper}>
                    <Top10CountriesTable
                        reportDay={reportDay}
                        data={data} />
                    <SummaryASRLegend />
                    <View style={styles.canvasWrapper}>
                        <Petals3
                            data={data}
                            title={title}
                            unit={unit}
                            height={300}
                            width={300} />
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
    contentWrapper: {
    },
    canvasWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})