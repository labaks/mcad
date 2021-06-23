import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { Loader } from '../../components/Loader';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { McData } from '../../helpers/McData';

import { ServiceSwithcer } from '../../components/diagramComponents/ServiceSwitcher';
import { LinearGradient } from 'expo-linear-gradient';

let dropDownAlert;

export const TopTenTargets = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [interval, setInterval] = useState('yesterday');
    const [service, setService] = useState('voice');

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Top 10 Targets---`);
        // _setReportData();
    }, []);

    useEffect(() => {
        _setReportData(interval, service);
    }, [interval, service]);

    const _setReportData = async () => {
        setLoading(true);
        const response = await McData._getTopTenTargets(props.token, props.url, interval, service);
        if (response.status != 200) {
            ErrorHandler.handle(dropDownAlert, response, props.url, props.navigation)
            setLoading(false);
        } else {
            setData(McData.defineData(response.data, response.fields));
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <ServiceSwithcer
                    interval={interval}
                    service={service}
                    setInterval={setInterval}
                    setService={setService}
                />
                {loading ?
                    <Loader loading={loading} />
                    :
                    <View style={styles.routesWrapper}>
                        {data.map((elem, index) => {
                            let mins = elem.acd % 60 < 10 ? '0' + elem.acd % 60 : elem.acd % 60;
                            let acdString = ~~(elem.acd / 60) + ':' + mins;
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.spc_box,
                                        styles.spc_color_asrRate
                                    ]}>
                                    <LinearGradient
                                        colors={['#F6F7F4', '#cacdc8']}
                                        style={styles.spc_text}>
                                        <Text
                                            numberOfLines={1}
                                            style={styles.spc_country}>{elem.country}</Text>
                                        <Text style={styles.spc_asr}>{elem.asr}%</Text>
                                        <Text style={styles.spc_acd}>{acdString} min</Text>
                                    </LinearGradient>
                                    <View style={styles.spc_line_box}>
                                        <View style={styles.spc_line}>
                                            <LinearGradient
                                                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,.7)', 'rgba(255,255,255,0)']}
                                                locations={[0, 0.5, 1]}
                                                style={styles.spc_line_grad}></LinearGradient>
                                            <Text>{elem.targetPrice}</Text>
                                        </View>
                                        <View style={styles.spc_styling}>
                                            <LinearGradient
                                                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,.7)', 'rgba(255,255,255,0)']}
                                                locations={[0, 0.5, 1]}
                                                style={styles.spc_styling_before}
                                            ></LinearGradient>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                }
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    routesWrapper: {
        marginTop: 15,
        width: '100%'
    },
    spc_box: {
        position: 'relative',
        marginBottom: 15,
        fontWeight: 'bold',
        flexDirection: 'column',
        borderColor: 'pink',
        borderWidth: 1
    },
    spc_text: {
        width: '40%',
        height: 26,
        backgroundColor: 'white',
        marginLeft: 10,
        paddingLeft: 18,
        zIndex: 2,
        lineHeight: 26,
        position: 'relative'
    },
    spc_country: {
        height: 30,
        width: '100%',
        paddingRight: 9
    },
    spc_asr: {
        position: 'absolute',
        width: 40,
        height: 36,
        backgroundColor: '#9ea29b',
        borderRadius: 20,
        top: -5,
        right: -32,
        paddingVertical: 11,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        zIndex: 3,
        lineHeight: 12
    },
    spc_acd: {
        position: 'absolute',
        width: 40,
        height: 36,
        backgroundColor: '#9ea29b',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        top: -5,
        right: -75,
        paddingVertical: 7,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        zIndex: 3,
        lineHeight: 12
    },
    spc_line_box: {
        height: 26,
        borderColor: 'blue',
        borderWidth: 1
    },
    spc_line: {
        height: 26,
        paddingLeft: 80,
        position: 'absolute',
        zIndex: 1
    },
    spc_line_grad: {
        height: 26,
        width: '100%',
        position: 'absolute',
        left: 0
    },
    spc_styling: {
        transform: [
            { rotateZ: '225deg' }
        ],
        position: 'absolute',
        width: 18.4,
        height: 18.4,
        top: 4,
        right: -9,
        borderColor: 'green',
        borderWidth: 1
    },
    spc_styling_before: {
        width: 18.4,
        height: 18.4,
        position: 'absolute',
        borderColor: 'red',
        borderWidth: 1
    }
})