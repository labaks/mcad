import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

import { Panel } from '../Panel';
import { LegendUnit } from './LegendUnit';
import { PieLabels } from './PieLabels';

export const PiePanel = (props) => {

    const clientColor = props.direction == 'in' ? '#75c374' : '#bac1c6';
    const otherColor = props.direction == 'in' ? '#0090d0' : '#f19dc4';
    const unit = props.service == 1 ? 'min.' : 'sms';

    const pieData = () => {
        const clientValue = parseFloat((props.data.client_value * 100 / props.data.total_value).toFixed(2));
        return [
            {
                key: 'client',
                value: clientValue,
                svg: { fill: clientColor },
            },
            {
                key: 'other',
                value: props.data.total_value == 0 ? 100 : (100 - clientValue).toFixed(2),
                svg: { fill: otherColor }
            }
        ]
    };

    const titlelize = (str) => {
        let arr = str.split('_');
        let title = '';
        for (var i in arr) {
            title += arr[i].charAt(0).toUpperCase() + arr[i].slice(1) + ' ';
        }
        return title
    };

    return (
        <Panel style={styles.container}>
            <Text style={styles.title}>{titlelize(props.data.interval)}</Text>
            <Text style={[styles.title, { marginBottom: 10 }]}> {props.data.start_date} {props.data.start_date == props.data.end_date ? '' : `- ${props.data.end_date}`}</Text>
            <LegendUnit
                color={clientColor}
                text={`${props.company} - ${props.data.client_value} ${unit}`} />
            <LegendUnit
                color={otherColor}
                text={`Other - ${props.data.total_value - props.data.client_value} ${unit}`} />
            <Text style={styles.total}>Total - {props.data.total_value} {unit}</Text>
            <View style={styles.pieWrapper}>
                <PieChart
                    style={styles.chart}
                    outerRadius={100}
                    innerRadius={0}
                    padAngle={0}
                    data={pieData()}>
                    <PieLabels />
                </PieChart>
            </View>
        </Panel>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        fontFamily: 'SFBold'
    },
    total: {
        marginLeft: 25,
        fontFamily: 'SF'
    },
    pieWrapper: {
        alignItems: 'center',
        paddingVertical: 15
    },
    chart: {
        width: 200,
        height: 200
    }
})