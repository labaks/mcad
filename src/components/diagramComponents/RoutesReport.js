import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'native-base';

import { NoRecords } from '../NoRecords';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const RoutesReport = (props) => {

    const [data, setData] = useState(props.data);
    const [page, setPage] = useState(0);

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Routes Report---`);
        if (props.pagination) {
            initPagination(data);
        };
    }, []);

    const initPagination = (data) => {
        setData(data.slice(0, 10));
    };

    const pagiBack = () => {
        setData(props.data.slice((page - 1) * 10, page * 10));
        setPage(page - 1);
    };

    const pagiForward = () => {
        setData(props.data.slice((page + 1) * 10, (page + 2) * 10));
        setPage(page + 1);
    };

    return (
        <View style={{ alignSelf: 'stretch' }}>
            {data.length ?
                <View style={styles.routesWrapper}>
                    {data.map((elem, index) => {
                        let acdString = null;
                        if (!props.creditLimitCheck) {
                            let mins = elem.acd % 60 < 10 ? '0' + elem.acd % 60 : elem.acd % 60;
                            acdString = elem.acd ? ~~(elem.acd / 60) + ':' + mins : null;
                        }
                        return (
                            <View
                                key={index}
                                style={styles.spc_box}>
                                <LinearGradient
                                    colors={['#F6F7F4', '#cacdc8']}
                                    style={[
                                        styles.spc_text,
                                        {
                                            width: acdString != null ? '35%' : '45%'
                                        }
                                    ]}>
                                    <View style={[styles.spc_text_before, { backgroundColor: elem.asrColor }]}>
                                        <View style={styles.spc_text_before_blink}></View>
                                    </View>
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.spc_country, elem.closed && styles.closed]}>
                                        {props.creditLimitCheck ?
                                            elem.client_name
                                            :
                                            elem.country}
                                    </Text>
                                    {props.creditLimitCheck ?
                                        <View></View>
                                        :
                                        <Text style={[styles.spc_asr, { borderColor: elem.asrColor }]}>{elem.asr}%</Text>
                                    }
                                    {acdString != null ?
                                        <View style={[styles.spc_acd, { borderColor: elem.asrColor }]}>
                                            <Text style={styles.spc_acd_text}>{acdString}</Text>
                                            <Text style={styles.spc_acd_text}>min</Text>
                                        </View>
                                        :
                                        <View></View>
                                    }
                                    <Text style={[
                                        styles.spc_target_price,
                                        {
                                            left: acdString != null ? 200 : (props.creditLimitCheck ? 160 : 190)
                                        }
                                    ]}>{props.creditLimitCheck ?
                                        elem.balance + ' ' + elem.currency_name
                                        :
                                        elem.target_price}</Text>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,.7)', 'rgba(255,255,255,0)']}
                                    locations={[0, 0.5, 1]}
                                    style={[
                                        styles.spc_line_box,
                                        {
                                            backgroundColor: elem.asrColor,
                                            paddingLeft: acdString != null ? 72 : (props.creditLimitCheck ? 10 : 30)
                                        }
                                    ]}>
                                    <View style={[styles.spc_line, { width: elem.lineWidth }]}></View>
                                    <View style={[styles.spc_styling, { backgroundColor: elem.asrColor }]}>
                                        <LinearGradient
                                            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,.7)', 'rgba(255,255,255,0)']}
                                            locations={[0, 0.5, 1]}
                                            start={[0, 0]}
                                            end={[1, 1]}
                                            style={styles.spc_styling_before}
                                        ></LinearGradient>
                                    </View>
                                </LinearGradient>
                            </View>
                        )
                    })}
                    {props.pagination ?
                        <View style={styles.pagination}>
                            <TouchableOpacity
                                style={[styles.pagiButton, page == 0 && styles.pagiDisabled]}
                                disabled={page == 0}
                                onPress={pagiBack}>
                                <Icon
                                    style={styles.pagiButtonIcon}
                                    name={'chevron-back-outline'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.pagiButton, (page + 1) * 10 > props.data.length && styles.pagiDisabled]}
                                disabled={(page + 1) * 10 > props.data.length}
                                onPress={pagiForward}>
                                <Icon
                                    style={styles.pagiButtonIcon}
                                    name={'chevron-forward-outline'} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View></View>
                    }
                </View>
                :
                <NoRecords />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    routesWrapper: {
        marginTop: 15,
        width: '100%',
        alignSelf: 'stretch'
    },
    spc_box: {
        position: 'relative',
        marginBottom: 15,
        fontWeight: 'bold',
        flexDirection: 'row',
    },
    spc_text_before: {
        width: 26,
        height: 26,
        borderRadius: 26,
        position: 'absolute',
        left: -13,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    spc_text_before_blink: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        opacity: 1.4,
        shadowColor: 'white',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    spc_text: {
        width: '45%',
        height: 26,
        backgroundColor: 'white',
        marginLeft: 10,
        paddingLeft: 18,
        zIndex: 2,
        lineHeight: 26,
        position: 'relative',
        overflow: 'visible'
    },
    spc_country: {
        height: 26,
        width: '100%',
        paddingRight: 9,
        fontFamily: 'SFBold',
        textAlignVertical: 'center',
        lineHeight: 26,
    },
    spc_asr: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: '#F6F7F4',
        borderRadius: 20,
        top: -7,
        right: -31,
        paddingVertical: 11,
        textAlign: 'center',
        zIndex: 3,
        fontSize: 12,
        fontFamily: "SFBold",
        textAlignVertical: 'center',
        borderWidth: 1,
        overflow: 'hidden'
    },
    spc_acd: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: '#F6F7F4',
        borderRadius: 20,
        top: -7,
        right: -72,
        paddingVertical: 7,
        zIndex: 3,
        borderWidth: 1,
        overflow: 'hidden'
    },
    spc_acd_text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        lineHeight: 13,
        fontFamily: "SFBold",
    },
    spc_line_box: {
        height: 26,
        overflow: 'visible',
    },
    spc_line: {
        height: 26,
        zIndex: 1,
    },
    spc_target_price: {
        fontFamily: 'SFBold',
        fontSize: 12,
        position: 'absolute',
        height: 26,
        textAlignVertical: 'center',
        lineHeight: 25,
    },
    spc_styling: {
        transform: [
            { rotateZ: '225deg' }
        ],
        position: 'absolute',
        width: 18.4,
        height: 18.4,
        top: 3.65,
        right: -9.5,
    },
    spc_styling_before: {
        width: 18.4,
        height: 18.4,
        position: 'absolute',
    },
    closed: {
        color: 'red'
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pagiButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: '#4B4B52',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pagiDisabled: {
        backgroundColor: '#4B4B5280',
        borderColor: '#80808080',
    },
    pagiButtonIcon: {
        color: 'white',
    }
})