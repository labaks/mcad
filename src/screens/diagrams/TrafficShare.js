import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { PiePanel } from '../../components/diagramComponents/PiePanel';
import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

var dropDownAlert;

export const TrafficShare = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Traffic Share ${props.direction} Loaded---`)
        _setReportData();
    }, [props.direction])

    const _setReportData = async () => {
        setLoading(true)
        const response = await McData._getTrafficShare(props.token, props.url, props.companyId, props.direction, props.service);
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
            <View style={styles.contentWrapper}>
                {loading ?
                    <Loader loading={loading} />
                    :
                    data.map(elem => {
                        return (
                            <PiePanel
                                key={elem.interval}
                                data={elem}
                                company={props.companyName}
                                direction={props.direction}
                                service={props.service}
                            />
                        )
                    })
                }
            </View>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})