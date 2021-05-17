import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

import { Panel } from '../Panel'
import { LegendUnit } from './LegendUnit'

export const BarChartPanel = (props) => {

    const todayColor = '#75c374';
    const yesterdayColor = '#0090d0';
    const data = props.data;
    const numberOfTicks = 5;

    let todayData, yesterdayData, xAxisData;

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Bar chart loaded---`);
        console.log("props", props);
    }, [props]);

    todayData = data.map((obj) => ({ value: obj.today_duration }));
    yesterdayData = data.map((obj) => ({ value: obj.yesterday_duration }));


    const findMaxX = () => {
        let max = 0;
        for (var i in data) {
            if (data[i].today_duration > data[i].yesterday_duration) {
                if (data[i].today_duration > max) max = data[i].today_duration;
            } else {
                if (data[i].yesterday_duration > max) max = data[i].yesterday_duration;
            }
        }
        return max;
    };

    const createXAxisData = () => {
        let xAxisData = [];
        let max = findMaxX();
        let tick = ~~(max / numberOfTicks);
        for (var i = 0; i < numberOfTicks + 1; i++) {
            xAxisData.push(tick * i);
        }
        return xAxisData;
    };

    xAxisData = createXAxisData();

    const barData = [
        {
            data: todayData,
            svg: {
                fill: todayColor,
            },
        },
        {
            data: yesterdayData,
            svg: {
                fill: yesterdayColor,
            },
        },
    ];

    return (
        <Panel>
            {data.length ?
                <View>
                    <View style={styles.legend}>
                        <LegendUnit
                            color={todayColor}
                            text={'Today'} />
                        <LegendUnit
                            color={yesterdayColor}
                            text={'Yesterday'} />
                    </View>
                    <View style={styles.barWrapper}>
                        <YAxis
                            data={data}
                            style={styles.yAxis}
                            contentInset={styles.yAxisContentInset}
                            yAccessor={({ item }) => item.region}
                            scale={scale.scaleBand}
                            svg={{ fill: 'black' }}
                            formatLabel={(value, index) => data[index].region}
                        />
                        <View style={{ flex: 1 }}>
                            <BarChart
                                style={{ flex: 1 }}
                                data={barData}
                                horizontal={true}
                                yAccessor={({ item }) => item.value}
                                contentInset={styles.barContentInset}
                                gridMin={0}
                                numberOfTicks={numberOfTicks}
                            >
                                <Grid direction={Grid.Direction.VERTICAL} />
                            </BarChart>
                            <XAxis
                                style={styles.xAxis}
                                contentInset={styles.xAxisContentInset}
                                data={xAxisData}
                                scale={scale.scaleBand}
                                formatLabel={(value, index) => xAxisData[index]}
                                svg={{ fill: 'black' }}
                            />
                        </View>
                    </View>
                </View>
                :
                <Text style={styles.noRecords}>No records found</Text>
            }
        </Panel>
    )
}

const styles = StyleSheet.create({
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    barWrapper: {
        flexDirection: 'row',
        height: 200,
        padding: 5
    },
    yAxis: {
        marginBottom: 25
    },
    xAxis: {
        marginHorizontal: -10,
        height: 20,
        marginTop: 5
    },
    yAxisContentInset: {
        top: 5,
        bottom: 5
    },
    xAxisContentInset: {
        left: -15,
        right: -10
    },
    barContentInset: {
        top: 5,
        bottom: 5,
        right: 5
    },
    noRecords: {
        color: 'red',
        fontFamily: 'SFBold',
        textAlign: 'center',
        padding: 20
    }
})
