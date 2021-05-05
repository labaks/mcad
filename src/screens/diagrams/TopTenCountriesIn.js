import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { LegendUnit } from '../../components/diagramComponents/LegendUnit';
import { Petals2 } from '../../components/diagramComponents/Petals2';

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
                
                <Text>{data}</Text>
                <View>
                    <Petals2 />
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

    }
})