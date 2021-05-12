import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

import { Panel } from '../Panel';
import { LegendUnit } from './LegendUnit';

export const PiePanel = (props) => {

    const pieData = () => {
        return [
            {
                key: 'client',
                value: props.data.client_value,
                svg: { fill: '#75c374' },
            },
            {
                key: 'other',
                value: props.data.total_value - props.data.client_value == props.data.client_value ? 1 : props.data.total_value - props.data.client_value,
                svg: { fill: '#0090d0' }
            }
        ]
    };

    const mock = pieData();

    const titlelize = (str) => {
        let arr = str.split('_');
        let title = '';
        for (var i in arr) {
            title += arr[i].charAt(0).toUpperCase() + arr[i].slice(1) + ' ';
        }
        return title
    };

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={24}
                    stroke={'black'}
                    strokeWidth={0.2}
                >{mock.value}</Text>
            )
        })
    };

    return (
        <Panel
            key={props.data.interval}
            style={{ marginBottom: 10 }}>
            <Text style={styles.title}>{titlelize(props.data.interval)}</Text>
            <Text style={[styles.title, { marginBottom: 10 }]}> {props.data.start_date} {props.data.start_date == props.data.end_date ? '' : `- ${props.data.end_date}`}</Text>
            <LegendUnit
                color="#75c374"
                text={props.companyId + ' - ' + props.data.client_value + ' min.'} />
            <LegendUnit
                color="#0090d0"
                text={'Other - ' + (props.data.total_value - props.data.client_value) + ' min.'} />
            <Text style={styles.total}>Total - {props.data.total_value} min.</Text>
            <View style={styles.pieWrapper}>
                <PieChart
                    style={{ height: 200, width: 200 }}
                    outerRadius={100}
                    valueAccessor={({ item }) => item.value}
                    innerRadius={0}
                    data={mock}>
                    <Labels />
                </PieChart>
            </View>
        </Panel>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        textAlign: 'center',
    },
    total: {
        marginLeft: 25
    },
    pieWrapper: {
        alignItems: 'center',
        paddingVertical: 15
    }
})