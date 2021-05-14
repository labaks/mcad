import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Panel } from '../Panel';

export const Top10CountriesTable = (props) => {
    return (
        <Panel style={styles.table}>
            <Text style={styles.tableTitle}>Report for {props.reportDay}</Text>
            <View style={styles.tableContent}>
                <View style={styles.tableColumn}>
                    <Text style={styles.columnTitle}>Country</Text>
                    {props.data.map(elem => {
                        return (
                            <Text
                                key={elem.country}
                                style={styles.td}>{elem.country}</Text>
                        )
                    })}
                </View>
                <View style={styles.tableColumn}>
                    <Text style={styles.columnTitle}>Cost In / Cost Out</Text>
                    {props.data.map(elem => {
                        return (
                            <Text
                                key={elem.country}
                                style={styles.td}>{elem.tp_sum} / {elem.op_sum}</Text>
                        )
                    })}
                </View>
                <View style={styles.tableColumn}>
                    <Text style={styles.columnTitle}>Margin</Text>
                    {props.data.map(elem => {
                        return (
                            <Text
                                key={elem.country}
                                style={styles.td}>{elem.delta_price}</Text>
                        )
                    })}
                </View>
            </View>
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
        marginBottom: 15
    },
    tableContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tableColumn: {

    },
    columnTitle: {
        marginBottom: 10,
        fontFamily: 'SF'
    },
    td: {
        fontFamily: 'SF'
    }
})