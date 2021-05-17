import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

import { Panel } from '../Panel'
import { LegendUnit } from './LegendUnit'

export const BarChartPanel = (props) => {

    const todayColor = '#75c374';
    const yesterdayColor = '#0090d0';
    const dataXAxis = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];
    const data = props.data;

    let todayData, yesterdayData;

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Bar chart loaded---`);
        console.log("props", props);
    }, [props]);

    todayData = data.map((obj) => ({ value: obj.today_duration }));
    yesterdayData = data.map((obj) => ({ value: obj.yesterday_duration }));

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
                        spacing={.2}
                        gridMin={0}
                        numberOfTicks={7}
                    >
                        <Grid direction={Grid.Direction.VERTICAL} />
                    </BarChart>
                    <XAxis
                        style={styles.xAxis}
                        contentInset={styles.xAxisContentInset}
                        data={dataXAxis}
                        scale={scale.scaleBand}
                        formatLabel={(value, index) => dataXAxis[index]}
                        svg={{ fill: 'black' }}
                    />
                </View>
            </View>
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
        left: 10,
        right: 10
    },
    barContentInset: {
        top: 5,
        bottom: 5,
        right: 5
    }
})
