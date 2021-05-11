import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { LegendUnit } from './LegendUnit';

export const SummaryASRLegend = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Summary ASR</Text>
            <View style={styles.legendLine}>
                <View style={styles.legendColumn}>
                    <LegendUnit text='0-1%' color='#e38472' />
                    <LegendUnit text='7-10%' color='#deeaac' />
                </View>
                <View style={styles.legendColumn}>
                    <LegendUnit text='1-3%' color='#ffbcac' />
                    <LegendUnit text='10-15%' color='#c0d280' />
                </View>
                <View style={styles.legendColumn}>
                    <LegendUnit text='3-7%' color='#f9c87c' />
                    <LegendUnit text='15-100%' color='#90bc99' />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'SF'
    },
    legendLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})