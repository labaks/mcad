import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NoRecords } from '../NoRecords';

export const FinancialReportsTable = (props) => {
    return (
        <View>
            {props.data.length ?
                <View style={styles.scrollWrapper}>
                    <View style={styles.pointNameColumn}>
                        <Text style={styles.th}>Point name</Text>
                        {props.data.map((elem, index) => {
                            return (
                                elem.point_name ?
                                    <Text
                                        key={index}
                                        style={[styles.td, styles.highlightedColumn]}>{elem.point_name}</Text>
                                    :
                                    <View
                                        key={index}
                                        style={[styles.totalRow]}>
                                        <Text
                                            style={[styles.td, styles.total]}>Total</Text>
                                    </View>
                            )
                        })}
                    </View>
                    <ScrollView
                        horizontal
                        contentContainerStyle={styles.tableContent}>
                        <View style={[styles.tableRow, styles.stickyHeader]}>
                            <Text style={[styles.th, styles.countryTd]}>Country</Text>
                            {props.service == 1 ?
                                <Text style={[styles.th, styles.durationTd]}>Duration</Text>
                                :
                                <Text></Text>
                            }
                            {props.service == 1 ?
                                <Text style={[styles.th, styles.calcDurationTd]}>Calculated</Text>
                                :
                                <Text></Text>
                            }
                            <Text style={[styles.th, styles.attemptsTd]}>Attempts</Text>
                            <Text style={[styles.th, styles.saTd]}>S. Atempts</Text>
                            <Text style={[styles.th, styles.opSumTd]}>Cost IN</Text>
                            <Text style={[styles.th, styles.tpSumTd]}>Cost OUT</Text>
                            <Text style={[styles.th, styles.deltaPriceTd]}>Margin</Text>
                            <Text style={[styles.th, styles.deltaProfitTd]}>Profit</Text>
                        </View>
                        {props.data.map((elem, index) => {
                            const op_sum = elem.op_sum == null ? '-' : parseFloat(elem.op_sum).toFixed(2);
                            const tp_sum = elem.tp_sum == null ? '-' : parseFloat(elem.tp_sum).toFixed(2);
                            const delta_price = parseFloat(elem.delta_price).toFixed(2);
                            return (
                                <View
                                    key={index}
                                    style={[styles.tableRow, !elem.point_name && styles.totalRow]}>
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.td, styles.countryTd]}>{elem.country}</Text>
                                    {props.service == 1 ?
                                        <Text
                                            style={[styles.td, styles.durationTd, !elem.point_name && styles.total]}>{elem.duration}</Text>
                                        :
                                        <Text></Text>
                                    }
                                    {props.service == 1 ?
                                        <Text
                                            style={[styles.td, styles.calcDurationTd, !elem.point_name && styles.total]}>{elem.calc_duration}</Text>
                                        :
                                        <Text></Text>
                                    }
                                    <Text
                                        style={[styles.td, styles.attemptsTd, !elem.point_name && styles.total]}>{elem.attempts}</Text>
                                    <Text
                                        style={[styles.td, styles.saTd, !elem.point_name && styles.total]}>{elem.sa}</Text>
                                    <Text
                                        style={[styles.td, styles.opSumTd, !elem.point_name && styles.total]}>{op_sum}</Text>
                                    <Text
                                        style={[styles.td, styles.tpSumTd, !elem.point_name && styles.total]}>{tp_sum}</Text>
                                    <Text
                                        style={[styles.td, styles.deltaPriceTd, !elem.point_name && styles.total]}>{delta_price}</Text>
                                    <Text
                                        style={[styles.td, styles.deltaProfitTd, !elem.point_name && styles.total]}>{elem.delta_profit}%</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                :
                <NoRecords />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    scrollWrapper: {
        flexDirection: 'row'
    },
    tableContent: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    pointNameColumn: {
        flexDirection: 'column',
        marginRight: 2
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
        marginRight: 1,
        backgroundColor: '#edf2dc'
    },
    stickyHeader: {
    },
    highlightedColumn: {
        backgroundColor: '#edf2dc'
    },
    td: {
        fontFamily: 'SF',
        paddingVertical: 2,
        marginBottom: 3,
        marginRight: 1
    },
    total: {
        fontFamily: 'SFBold',
    },
    totalRow: {
        borderColor: '#edf2dc',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    countryTd: {
        width: 80,
    },
    durationTd: {
        width: 65
    },
    calcDurationTd: {
        width: 75
    },
    attemptsTd: {
        width: 70
    },
    saTd: {
        width: 75
    },
    opSumTd: {
        width: 55
    },
    tpSumTd: {
        width: 70
    },
    deltaPriceTd: {
        width: 55
    },
    deltaProfitTd: {
        width: 65
    },

})