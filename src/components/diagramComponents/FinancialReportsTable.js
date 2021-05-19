import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NoRecords } from '../NoRecords';

import { Panel } from '../Panel';

export const FinancialReportsTable = (props) => {
    return (
        <Panel style={styles.table}>
            {props.data.length ?
                <View>
                    <Text style={styles.title}>{props.data[0].company}</Text>
                    <Text style={styles.subtitle}>Account Manager: {props.data[0].manager}</Text>
                    <View style={styles.scrollWrapper}>
                        <View style={styles.pointNameColumn}>
                            <Text style={styles.th}>Point name</Text>
                            {props.data.map((elem, index) => {
                                return (
                                    elem.point_name ?
                                        <Text
                                            key={index}
                                            style={styles.td}>{elem.point_name}</Text>
                                        :
                                        <Text
                                            key={index}
                                            style={styles.total}>Total</Text>
                                )
                            })}
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={styles.tableContent}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.th, styles.countryTd]}>Country</Text>
                                <Text style={[styles.th, styles.durationTd]}>Duration</Text>
                                <Text style={[styles.th, styles.calcDurationTd]}>Calculated</Text>
                                <Text style={[styles.th, styles.attemptsTd]}>Attempts</Text>
                                <Text style={[styles.th, styles.saTd]}>S. Atempts</Text>
                                <Text style={[styles.th, styles.opSumTd]}>Cost IN</Text>
                                <Text style={[styles.th, styles.tpSumTd]}>Cost OUT</Text>
                                <Text style={[styles.th, styles.deltaPriceTd]}>Margin</Text>
                                <Text style={[styles.th, styles.deltaProfitTd]}>Profit</Text>
                            </View>
                            {props.data.map((elem, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={styles.tableRow}>
                                        <Text
                                            numberOfLines={1}
                                            style={[styles.td, styles.countryTd]}>{elem.country}</Text>
                                        <Text
                                            style={[styles.td, styles.durationTd]}>{elem.duration}</Text>
                                        <Text
                                            style={[styles.td, styles.calcDurationTd]}>{elem.calc_duration}</Text>
                                        <Text
                                            style={[styles.td, styles.attemptsTd]}>{elem.attempts}</Text>
                                        <Text
                                            style={[styles.td, styles.saTd]}>{elem.sa}</Text>
                                        <Text
                                            style={[styles.td, styles.opSumTd]}>{elem.op_sum == null ? '-' : elem.op_sum}</Text>
                                        <Text
                                            style={[styles.td, styles.tpSumTd]}>{elem.tp_sum == null ? '-' : elem.tp_sum}</Text>
                                        <Text
                                            style={[styles.td, styles.deltaPriceTd]}>{elem.delta_price}</Text>
                                        <Text
                                            style={[styles.td, styles.deltaProfitTd]}>{elem.delta_profit}%</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
                :
                <NoRecords />
            }
        </Panel>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontFamily: 'SFBold',
    },
    subtitle: {
        textAlign: 'center',
        fontFamily: 'SF',
        marginBottom: 5
    },
    scrollWrapper: {
        flexDirection: 'row'
    },
    tableContent: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    pointNameColumn: {
        flexDirection: 'column',
    },
    tableRow: {
        flexDirection: 'row'
    },
    columnTitle: {
        marginBottom: 10,
        fontFamily: 'SF'
    },
    th: {
        fontFamily: 'SFBold',
        marginBottom: 5,
    },
    td: {
        fontFamily: 'SF',
        paddingVertical: 2,
        marginBottom: 3,
        backgroundColor: 'yellow',
        borderWidth: 1,
        borderColor: 'black',
    },
    total: {
        fontFamily: 'SFBold'
    },
    countryTd: {
        width: 80,
    },
    durationTd: {
        width: 80
    },
    calcDurationTd: {
        width: 80
    },
    attemptsTd: {
        width: 80
    },
    saTd: {
        width: 80
    },
    opSumTd: {
        width: 80
    },
    tpSumTd: {
        width: 80
    },
    deltaPriceTd: {
        width: 80
    },
    deltaProfitTd: {
        width: 80
    },

})