import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { NoRecords } from '../NoRecords';

export const Routes = (props) => {

    const data = props.data;

    return (
        <View>
            {data.length ?
                <View style={styles.routesWrapper}>
                    {data.map((elem, index) => {
                        let mins = elem.acd % 60 < 10 ? '0' + elem.acd % 60 : elem.acd % 60;
                        let acdString = ~~(elem.acd / 60) + ':' + mins;
                        return (
                            <View
                                key={index}
                                style={styles.spc_box}>
                                <LinearGradient
                                    colors={['#F6F7F4', '#cacdc8']}
                                    style={styles.spc_text}>
                                    <View style={[styles.spc_text_before, { backgroundColor: elem.asrColor }]}>
                                        <View style={styles.spc_text_before_blink}></View>
                                    </View>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.spc_country}>{elem.country}</Text>
                                    <Text style={[styles.spc_asr, { borderColor: elem.asrColor }]}>{elem.asr}%</Text>
                                    <Text style={[styles.spc_acd, { borderColor: elem.asrColor }]}>{acdString} min</Text>
                                    <Text style={styles.spc_target_price}>{elem.target_price}</Text>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,.7)', 'rgba(255,255,255,0)']}
                                    locations={[0, 0.5, 1]}
                                    style={[styles.spc_line_box, { backgroundColor: elem.asrColor }]}>
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
        width: '100%'
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
        width: '40%',
        height: 26,
        backgroundColor: 'white',
        marginLeft: 10,
        paddingLeft: 18,
        zIndex: 2,
        lineHeight: 26,
        position: 'relative',
    },
    spc_country: {
        height: 26,
        width: '100%',
        paddingRight: 9,
        fontFamily: 'SFBold',
        textAlignVertical: 'center',
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
    },
    spc_acd: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: '#F6F7F4',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        top: -7,
        right: -72,
        paddingVertical: 7,
        textAlign: 'center',
        textAlignVertical: 'center',
        zIndex: 3,
        fontSize: 12,
        lineHeight: 13,
        fontFamily: "SFBold",
        borderWidth: 1,
    },
    spc_line_box: {
        height: 26,
        paddingLeft: 72,
    },
    spc_line: {
        height: 26,
        zIndex: 1,
    },
    spc_target_price: {
        fontFamily: 'SFBold',
        fontSize: 12,
        position: 'absolute',
        right: -125,
        height: 26,
        textAlignVertical: 'center',
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
})