import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { LegendUnit } from '../../components/diagramComponents/LegendUnit';
import { Petals2 } from '../../components/diagramComponents/Petals2';
import { Petals3 } from '../../components/diagramComponents/Petals3';

import { Loader } from '../../components/Loader';

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
    const mock = [
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60],
        ["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60]
    ];
    const title = "Top 10 Countries";
    const unit = 'min.';

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Top Ten Countries In Loaded---")
        _setReportData();
    }, [])

    const _setReportData = async () => {
        let data = await McData._getTopTenCountries(token, url, companyId, 'in');
        setLoading(false);
        if (data.status) {
            ErrorHandler.handle(dropDownAlert, data, url, navigation)
        } else {
            setData(data);
            console.log("_setReportData data: ", data)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.legend}>
                    <Text>Summary ASR</Text>
                    <View style={styles.legendLine}>
                        <LegendUnit text='0-1%' color='#e38472' />
                        <LegendUnit text='1-3%' color='#ffbcac' />
                        <LegendUnit text='3-7%' color='#f9c87c' />
                    </View>
                    <View style={styles.legendLine}>
                        <LegendUnit text='7-10%' color='#deeaac' />
                        <LegendUnit text='10-15%' color='#c0d280' />
                        <LegendUnit text='15-100%' color='#90bc99' />
                    </View>
                </View>

                <View style={styles.canvasWrapper}>
                    <Petals3
                        data={mock}
                        title={title}
                        unit={unit}
                        height={280}
                        width={280} />
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
    },
    contentWrapper: {
        borderColor: 'blue',
        borderWidth: 1,
    },
    legend: {
        borderColor: 'green',
        borderWidth: 1,
    },
    legendLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    canvasWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    }
})