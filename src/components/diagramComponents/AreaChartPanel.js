import { shape } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { AreaChart, Grid, YAxis } from 'react-native-svg-charts';

import { Panel } from '../Panel';

const windowWidth = Dimensions.get('window').width;

export const AreaChartPanel = (props) => {

    const sideLabel = props.service == 'voice' ? 'Calls' : 'SMS';

    return (
        <Panel style={styles.container}>
            <Text style={styles.sideLabel}>{sideLabel}</Text>
            <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                <YAxis
                    data={props.data}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    contentInset={styles.contentInset}
                    style={styles.yAxis}
                    numberOfTicks={10}
                />
                <AreaChart
                    style={styles.chart}
                    data={props.data}
                    contentInset={styles.contentInset}
                    curve={shape.curveNatural}
                    svg={{
                        fill: '#7cae52',
                        fillOpacity: 1,
                        strokeWidth: 2,
                        stroke: '#355c38'
                    }}>
                    <Grid />
                </AreaChart>
            </View>
            <Text style={styles.downLabel}>Time</Text>
        </Panel>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        position: 'relative',
        padding: 10,
        paddingTop: 20,
        overflow: 'visible'
    },
    chart: {
        width: windowWidth - 105,
        height: windowWidth - 105,
        alignSelf: 'flex-end',
    },
    yAxis: {
        overflow: 'visible'
    },
    sideLabel: {
        transform: [
            { rotateZ: '270deg' }
        ],
        position: 'absolute',
        top: '50%',
        fontFamily: 'SF'
    },
    downLabel: {
        textAlign: 'center',
        fontFamily: 'SF'
    },
    contentInset: {
        top: 10,
        bottom: 10
    }
})