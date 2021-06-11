import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NoRecords } from '../NoRecords';

import { Panel } from '../Panel';

export const Top10CountriesTable = (props) => {
    return (
        <Panel style={styles.table}>
            <Text style={styles.tableTitle}>Report for {props.reportDay}</Text>
            {props.data.length ?
                <View style={styles.tableContent}>
                    <View style={[styles.tableColumn, { width: '33%' }]}>
                        <Text style={[styles.columnTitle, { borderTopLeftRadius: 10 }]}>Country</Text>
                        {props.data.map(elem => {
                            return (
                                <Text
                                    key={elem.country}
                                    numberOfLines={1}
                                    style={styles.td}>{elem.country}</Text>
                            )
                        })}
                    </View>
                    <View style={[styles.tableColumn, { width: '40%' }]}>
                        <Text style={styles.columnTitle}>Cost In / Cost Out</Text>
                        {props.data.map(elem => {
                            return (
                                <Text
                                    key={elem.country}
                                    numberOfLines={1}
                                    style={styles.td}>{elem.op_sum} / {elem.tp_sum}</Text>
                            )
                        })}
                    </View>
                    <View style={[styles.tableColumn, { width: '26%' }]}>
                        <Text style={[styles.columnTitle, { borderTopRightRadius: 10 }]}>Margin</Text>
                        {props.data.map(elem => {
                            return (
                                <Text
                                    key={elem.country}
                                    numberOfLines={1}
                                    style={styles.td}>{elem.delta_price}</Text>
                            )
                        })}
                    </View>
                </View>
                :
                <NoRecords />
            }
        </Panel>
    )
}

const styles = StyleSheet.create({
    table: {
        marginBottom: 20,
    },
    tableTitle: {
        textAlign: 'center',
        fontFamily: 'SFBold',
        marginBottom: 10
    },
    tableContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tableColumn: {
    },
    columnTitle: {
        fontFamily: 'SF',
        backgroundColor: '#edf2dc',
        padding: 3
    },
    td: {
        fontFamily: 'SF',
        paddingHorizontal: 3
    }
})