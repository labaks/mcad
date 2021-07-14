import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { Petals } from '../../components/diagramComponents/Petals';
import { SummaryASRLegend } from '../../components/diagramComponents/SummaryASRLegend';
import { Top10CountriesTable } from '../../components/diagramComponents/Top10CountriesTable';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

export const TopTenCountries = (props) => {
    const [reportDay, setReportDay] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const title = "Top 10 Countries";
    const unit = props.service == 1 ? 'min.' : 'sms';
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Top Ten Countries ${props.direction} Loaded---`)
        _setReportData();
    }, [props.direction]);

    const _setReportData = async () => {
        setLoading(true);
        const response = await McData._getTopTenCountries(props.token, props.url, props.companyId, props.direction, props.service);
        if (response.status != 200) {
            ErrorHandler.handle(props.dropDownAlert, response, props.url, props.navigation);
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
                <View>
                    <Top10CountriesTable
                        reportDay={reportDay}
                        data={data} />
                    <SummaryASRLegend />
                    <View style={styles.canvasWrapper}>
                        <Petals
                            data={data}
                            title={title}
                            unit={unit}
                            height={windowWidth - 50}
                            width={windowWidth - 50}
                            service={props.service} />
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    canvasWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})