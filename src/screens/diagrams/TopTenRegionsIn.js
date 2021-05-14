import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { BackButtonHandler } from '../../helpers/BackButtonHandler';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';
import { Dimensions } from 'react-native';
import BarChartEx from '../../components/diagramComponents/BarChartExample';

let dropDownAlert;

export const TopTenRegionsIn = (props) => {
    const backButtonHandler = BackButtonHandler();
    const token = props.token;
    const url = props.url;
    const companyId = props.companyId;
    const navigation = props.navigation;
    const screenWidth = Dimensions.get('window').width;
    const fill = 'rgb(134, 65, 244)';
    const [loading, setLoading] = useState(true);
    // const [data, setData] = useState();

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Top 10 Regions In Loaded---");

        _setReportData();
    }, [])

    const _setReportData = async () => {
        let response = await McData._getTopTenRegions(token, url, companyId, "in");
        setLoading(false);
        if (response.status) {
            ErrorHandler.handle(dropDownAlert, response, url, navigation)
        } else {
            // setData(parseData(response));
        }
    };

    const parseData = (response) => {
        let data = {
            labels: ['label 1'],
            datasets: [{
                data: [0, 2]
            }]
        }
        return data;
    };

    

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <BarChartEx />
            </View>
            <Loader loading={loading} />
            <StatusBar style="auto" />
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
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
    },
})